import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Loader2 } from 'lucide-react';
import { format } from 'date-fns';

interface Order {
  id: string;
  user_id: string;
  total_amount: number;
  status: string;
  shipping_address: string;
  phone: string;
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500';
      case 'pending':
        return 'bg-yellow-500';
      case 'cancelled':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
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
                {order.status}
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
