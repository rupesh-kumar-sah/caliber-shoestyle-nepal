import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Truck, Clock, MapPin, Package, CheckCircle } from "lucide-react";

const Shipping = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-16">
        <div className="container px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold mb-4">Shipping Information</h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Fast, reliable delivery across Nepal. We ensure your Caliber Shoes reach you safely and on time.
              </p>
            </div>

            <div className="space-y-8">
              {/* Delivery Timeline */}
              <Card className="p-8">
                <CardContent className="space-y-6">
                  <div className="flex items-center gap-3 mb-6">
                    <Truck className="h-8 w-8 text-primary" />
                    <h2 className="text-2xl font-semibold">Delivery Timeline</h2>
                  </div>

                  <div className="bg-primary/5 p-6 rounded-lg">
                    <div className="flex items-center gap-3 mb-4">
                      <Clock className="h-6 w-6 text-primary" />
                      <h3 className="text-xl font-semibold">Standard Delivery</h3>
                    </div>
                    <p className="text-lg mb-4">
                      We deliver across Nepal within <span className="font-semibold text-primary">3–7 business days</span>.
                    </p>
                    <p className="text-muted-foreground">
                      All orders are carefully packed and shipped with trusted courier partners.
                      Once your order ships, you'll receive an email and SMS with tracking information.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Shipping Rates */}
              <Card className="p-8">
                <CardContent className="space-y-6">
                  <div className="flex items-center gap-3 mb-6">
                    <Package className="h-8 w-8 text-primary" />
                    <h2 className="text-2xl font-semibold">Shipping Rates</h2>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-green-50 p-6 rounded-lg border border-green-200">
                      <div className="flex items-center gap-2 mb-3">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <h3 className="text-lg font-semibold text-green-800">Free Shipping</h3>
                      </div>
                      <p className="text-green-700 mb-2">Orders above <span className="font-bold">Rs. 3,000</span></p>
                      <p className="text-sm text-green-600">Enjoy free delivery on all qualifying orders</p>
                    </div>

                    <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                      <div className="flex items-center gap-2 mb-3">
                        <Truck className="h-5 w-5 text-blue-600" />
                        <h3 className="text-lg font-semibold text-blue-800">Standard Shipping</h3>
                      </div>
                      <p className="text-blue-700 mb-2"><span className="font-bold">Rs. 150</span> flat rate</p>
                      <p className="text-sm text-blue-600">For orders below Rs. 3,000</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Coverage Areas */}
              <Card className="p-8">
                <CardContent className="space-y-6">
                  <div className="flex items-center gap-3 mb-6">
                    <MapPin className="h-8 w-8 text-primary" />
                    <h2 className="text-2xl font-semibold">Coverage Areas</h2>
                  </div>

                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <h3 className="font-semibold mb-2">Major Cities</h3>
                      <p className="text-sm text-muted-foreground">
                        Kathmandu, Lalitpur, Bhaktapur, Pokhara, Biratnagar, Birgunj
                      </p>
                    </div>

                    <div className="text-center">
                      <h3 className="font-semibold mb-2">Regional Areas</h3>
                      <p className="text-sm text-muted-foreground">
                        All major towns and cities across Nepal
                      </p>
                    </div>

                    <div className="text-center">
                      <h3 className="font-semibold mb-2">Remote Areas</h3>
                      <p className="text-sm text-muted-foreground">
                        Extended delivery time may apply
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Shipping Process */}
              <Card className="p-8">
                <CardContent className="space-y-6">
                  <h2 className="text-2xl font-semibold mb-6">How Shipping Works</h2>

                  <div className="space-y-4">
                    <div className="flex gap-4">
                      <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center font-semibold text-sm">
                        1
                      </div>
                      <div>
                        <h3 className="font-semibold">Order Processing</h3>
                        <p className="text-muted-foreground">We process and verify your order within 1-2 business hours</p>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center font-semibold text-sm">
                        2
                      </div>
                      <div>
                        <h3 className="font-semibold">Careful Packaging</h3>
                        <p className="text-muted-foreground">Your shoes are carefully packaged to prevent any damage during transit</p>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center font-semibold text-sm">
                        3
                      </div>
                      <div>
                        <h3 className="font-semibold">Shipping & Tracking</h3>
                        <p className="text-muted-foreground">Your order is shipped with tracking information sent via email and SMS</p>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center font-semibold text-sm">
                        4
                      </div>
                      <div>
                        <h3 className="font-semibold">Safe Delivery</h3>
                        <p className="text-muted-foreground">Your Caliber Shoes are delivered safely to your doorstep</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Important Notes */}
              <Card className="p-8 bg-amber-50 border-amber-200">
                <CardContent className="space-y-4">
                  <h2 className="text-2xl font-semibold text-amber-800">Important Notes</h2>

                  <div className="space-y-3 text-amber-700">
                    <p>• Orders placed after 4:00 PM may be processed the next business day</p>
                    <p>• Delivery times may vary during festivals and public holidays</p>
                    <p>• Please ensure someone is available at the delivery address</p>
                    <p>• We require a valid phone number for delivery coordination</p>
                    <p>• Cash on Delivery (COD) is available for eligible orders</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Shipping;
