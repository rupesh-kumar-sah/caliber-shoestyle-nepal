import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Loader2, Check, X, Ban } from 'lucide-react';
import { format } from 'date-fns';
import { toast } from 'sonner';

interface Order {
  id: string;
  user_id: string;
  total_amount: number;
  status: string;
  shipping_address: string;
  phone: string;
  transaction_id: string | null;
  created_at: string;
  profiles?: {
    full_name: string;
  };
  order_items?: Array<{
    quantity: number;
    price: number;
    products?: {
      name: string;
    };
  }>;
}

const OrdersManager = () => {
  const queryClient = useQueryClient();
  
  const { data: orders, isLoading } = useQuery({
    queryKey: ['admin-orders'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('orders')
        .select(`
          *,
          order_items(
            quantity,
            price,
            products(name)
          )
        `)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      // Manually fetch profiles for each order
      const ordersWithProfiles = await Promise.all(
        (data || []).map(async (order) => {
          const { data: profile } = await supabase
            .from('profiles')
            .select('full_name')
            .eq('id', order.user_id)
            .single();
          
          return {
            ...order,
            profiles: profile
          };
        })
      );
      
      return ordersWithProfiles as Order[];
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  const updateOrderStatus = useMutation({
    mutationFn: async ({ orderId, status }: { orderId: string; status: string }) => {
      const { error } = await supabase
        .from('orders')
        .update({ status })
        .eq('id', orderId);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-orders'] });
      toast.success('Order status updated successfully');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to update order status');
    },
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
      case 'accepted':
        return 'bg-green-500';
      case 'payment_confirmed':
        return 'bg-blue-500';
      case 'pending':
        return 'bg-yellow-500';
      case 'rejected':
      case 'cancelled':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getStatusLabel = (status: string) => {
    return status.replace('_', ' ').toUpperCase();
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Orders</h2>
      
      <div className="space-y-4">
        {orders?.map((order) => (
          <Card key={order.id} className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-semibold text-lg">Order #{order.id.slice(0, 8)}</h3>
                <p className="text-sm text-muted-foreground">
                  {format(new Date(order.created_at), 'PPpp')}
                </p>
              </div>
              <Badge className={getStatusColor(order.status)}>
                {getStatusLabel(order.status)}
              </Badge>
            </div>
            
            <div className="grid gap-4 md:grid-cols-2 mb-4">
              <div>
                <p className="text-sm font-medium">Customer</p>
                <p className="text-sm text-muted-foreground">{order.profiles?.full_name || 'N/A'}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Phone</p>
                <p className="text-sm text-muted-foreground">{order.phone}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Transaction ID</p>
                <p className="text-sm text-muted-foreground">{order.transaction_id || 'Not provided'}</p>
              </div>
              <div className="md:col-span-2">
                <p className="text-sm font-medium">Shipping Address</p>
                <p className="text-sm text-muted-foreground">{order.shipping_address}</p>
              </div>
            </div>
            
            <div className="border-t pt-4">
              <p className="text-sm font-medium mb-2">Items</p>
              <div className="space-y-2">
                {order.order_items?.map((item, index) => (
                  <div key={index} className="flex justify-between text-sm">
                    <span>{item.products?.name} x {item.quantity}</span>
                    <span>रू {(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="border-t mt-2 pt-2 flex justify-between font-bold">
                <span>Total</span>
                <span>रू {order.total_amount.toFixed(2)}</span>
              </div>
            </div>

            {/* Admin Actions */}
            <div className="border-t pt-4 mt-4">
              <p className="text-sm font-medium mb-3">Admin Actions</p>
              <div className="flex flex-wrap gap-2">
                {order.status === 'pending' && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => updateOrderStatus.mutate({ orderId: order.id, status: 'payment_confirmed' })}
                    disabled={updateOrderStatus.isPending}
                  >
                    <Check className="h-4 w-4 mr-1" />
                    Confirm Payment
                  </Button>
                )}
                {order.status === 'payment_confirmed' && (
                  <>
                    <Button
                      size="sm"
                      variant="default"
                      onClick={() => updateOrderStatus.mutate({ orderId: order.id, status: 'accepted' })}
                      disabled={updateOrderStatus.isPending}
                    >
                      <Check className="h-4 w-4 mr-1" />
                      Accept Order
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => updateOrderStatus.mutate({ orderId: order.id, status: 'rejected' })}
                      disabled={updateOrderStatus.isPending}
                    >
                      <X className="h-4 w-4 mr-1" />
                      Reject Order
                    </Button>
                  </>
                )}
                {(order.status === 'pending' || order.status === 'payment_confirmed' || order.status === 'accepted') && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => updateOrderStatus.mutate({ orderId: order.id, status: 'cancelled' })}
                    disabled={updateOrderStatus.isPending}
                  >
                    <Ban className="h-4 w-4 mr-1" />
                    Cancel Order
                  </Button>
                )}
                {order.status === 'accepted' && (
                  <Button
                    size="sm"
                    variant="default"
                    onClick={() => updateOrderStatus.mutate({ orderId: order.id, status: 'completed' })}
                    disabled={updateOrderStatus.isPending}
                  >
                    <Check className="h-4 w-4 mr-1" />
                    Mark Completed
                  </Button>
                )}
              </div>
            </div>
          </Card>
        ))}
        
        {orders?.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No orders yet</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersManager;
