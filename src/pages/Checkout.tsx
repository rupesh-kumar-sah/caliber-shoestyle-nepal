import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useCart, useClearCart } from '@/hooks/useCart';
import { useAuth } from '@/hooks/useAuth';
import { useSiteSettings } from '@/hooks/useSiteSettings';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Loader2, QrCode, CheckCircle } from 'lucide-react';

interface EsewaSettings {
  enabled: boolean;
  image_url: string;
  merchant_id: string;
}

const Checkout = () => {
  const { data: cartItems } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const clearCart = useClearCart();
  const { data: esewaQr } = useSiteSettings('esewa_qr');
  const esewaSettings = esewaQr as unknown as EsewaSettings;
  const [loading, setLoading] = useState(false);
  const [showQr, setShowQr] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    address: '',
    city: '',
  });

  const subtotal = cartItems?.reduce((sum, item) => 
    sum + (item.product?.price || 0) * item.quantity, 0
  ) || 0;
  const shipping = 50;
  const total = subtotal + shipping;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user || !cartItems?.length) {
      toast.error('Cart is empty');
      return;
    }

    setLoading(true);
    try {
      // Create order
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert([{
          user_id: user.id,
          total_amount: total,
          status: 'pending',
          shipping_address: `${formData.address}, ${formData.city}`,
          phone: formData.phone,
        }])
        .select()
        .single();

      if (orderError) throw orderError;

      if (!order) {
        throw new Error('Failed to create order');
      }

      // Create order items
      const orderItems = cartItems.map(item => ({
        order_id: order.id,
        product_id: item.product_id,
        quantity: item.quantity,
        price: item.product?.price || 0,
        size: item.size,
        color: item.color,
      }));

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems);

      if (itemsError) throw itemsError;

      // Show QR code for payment
      setOrderId(order.id);
      setShowQr(true);
      toast.success('Order created! Please scan the QR code to complete payment.');
      
    } catch (error: any) {
      toast.error(error.message || 'Failed to place order');
    } finally {
      setLoading(false);
    }
  };

  const handlePaymentComplete = async () => {
    if (!orderId) return;
    
    try {
      // Clear cart after payment
      await clearCart.mutateAsync();
      toast.success('Payment confirmed! Order placed successfully.');
      navigate('/');
    } catch (error: any) {
      toast.error(error.message || 'Failed to complete order');
    }
  };

  if (!cartItems?.length) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
            <Button onClick={() => navigate('/products')}>Continue Shopping</Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (showQr && esewaSettings?.enabled && esewaSettings?.image_url) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 py-12">
          <div className="container px-4 max-w-2xl mx-auto">
            <Card>
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-accent/10">
                  <QrCode className="h-8 w-8 text-accent" />
                </div>
                <CardTitle className="text-2xl">Scan eSewa QR Code</CardTitle>
                <CardDescription>
                  Scan the QR code below using your eSewa app to complete the payment of रू {total.toFixed(2)}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-col items-center gap-4 p-6 border rounded-lg bg-muted/50">
                  <img 
                    src={esewaSettings.image_url} 
                    alt="eSewa QR Code" 
                    className="w-80 h-80 object-contain border-2 border-border rounded"
                  />
                  <div className="text-center">
                    <p className="text-2xl font-bold text-accent">रू {total.toFixed(2)}</p>
                    <p className="text-sm text-muted-foreground mt-1">Order ID: {orderId?.slice(0, 8)}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start gap-3 p-4 bg-primary/5 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div className="text-sm">
                      <p className="font-medium mb-1">Payment Instructions:</p>
                      <ol className="list-decimal list-inside space-y-1 text-muted-foreground">
                        <li>Open your eSewa mobile app</li>
                        <li>Scan this QR code</li>
                        <li>Verify the amount (रू {total.toFixed(2)})</li>
                        <li>Complete the payment</li>
                        <li>Click "I've Paid" below after payment</li>
                      </ol>
                    </div>
                  </div>

                  <Button 
                    onClick={handlePaymentComplete}
                    className="w-full"
                    size="lg"
                    variant="hero"
                  >
                    I've Completed Payment
                  </Button>
                  
                  <Button 
                    onClick={() => setShowQr(false)}
                    variant="outline"
                    className="w-full"
                  >
                    Go Back
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-12">
        <div className="container px-4">
          <h1 className="text-3xl font-bold mb-8">Checkout</h1>
          
          <div className="grid gap-8 lg:grid-cols-2">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-6">Shipping Information</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  />
                </div>
                
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
                
                <div>
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  />
                </div>
                
                <div>
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  />
                </div>

                <Button type="submit" className="w-full" disabled={loading || !esewaSettings?.enabled} size="lg" variant="hero">
                  {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {esewaSettings?.enabled ? 'Proceed to eSewa Payment' : 'Payment Method Not Available'}
                </Button>
                {!esewaSettings?.enabled && (
                  <p className="text-sm text-muted-foreground text-center">
                    eSewa payment is currently disabled. Please contact support.
                  </p>
                )}
              </form>
            </Card>

            <Card className="p-6 h-fit">
              <h2 className="text-xl font-semibold mb-6">Order Summary</h2>
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span>{item.product?.name} x {item.quantity}</span>
                    <span>रू {((item.product?.price || 0) * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
                
                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>रू {subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>रू {shipping.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg border-t pt-2">
                    <span>Total</span>
                    <span>रू {total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Checkout;
