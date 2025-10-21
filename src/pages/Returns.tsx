import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RefreshCw, XCircle, CheckCircle, Clock, Package, AlertTriangle } from "lucide-react";

const Returns = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-16">
        <div className="container px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold mb-4">Returns & Exchanges</h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                We want you to love your Caliber Shoes! We're here to help if something isn't quite right.
              </p>
            </div>

            <div className="space-y-8">
              {/* Return Policy Overview */}
              <Card className="p-8">
                <CardContent className="space-y-6">
                  <div className="flex items-center gap-3 mb-6">
                    <RefreshCw className="h-8 w-8 text-primary" />
                    <h2 className="text-2xl font-semibold">Return Policy Overview</h2>
                  </div>

                  <div className="bg-green-50 p-6 rounded-lg border border-green-200">
                    <div className="flex items-center gap-3 mb-4">
                      <CheckCircle className="h-6 w-6 text-green-600" />
                      <h3 className="text-xl font-semibold text-green-800">7-Day Return Window</h3>
                    </div>
                    <p className="text-green-700">
                      If the fit isn't right or you received the wrong product, you can return or exchange it within <span className="font-bold">7 days</span> of delivery.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Return Conditions */}
              <Card className="p-8">
                <CardContent className="space-y-6">
                  <div className="flex items-center gap-3 mb-6">
                    <CheckCircle className="h-8 w-8 text-primary" />
                    <h2 className="text-2xl font-semibold">Return Conditions</h2>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-green-700">What's Eligible</h3>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          Wrong size or fit
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          Wrong product delivered
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          Manufacturing defects
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          Damaged during shipping
                        </li>
                      </ul>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-red-700">What's Not Eligible</h3>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-center gap-2">
                          <XCircle className="h-4 w-4 text-red-600" />
                          Worn or used shoes
                        </li>
                        <li className="flex items-center gap-2">
                          <XCircle className="h-4 w-4 text-red-600" />
                          Beyond 7-day window
                        </li>
                        <li className="flex items-center gap-2">
                          <XCircle className="h-4 w-4 text-red-600" />
                          No original packaging
                        </li>
                        <li className="flex items-center gap-2">
                          <XCircle className="h-4 w-4 text-red-600" />
                          Missing proof of purchase
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* How to Return */}
              <Card className="p-8">
                <CardContent className="space-y-6">
                  <h2 className="text-2xl font-semibold mb-6">How to Return or Exchange</h2>

                  <div className="space-y-6">
                    <div className="flex gap-4">
                      <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center font-semibold text-sm">
                        1
                      </div>
                      <div>
                        <h3 className="font-semibold">Contact Our Support Team</h3>
                        <p className="text-muted-foreground mb-2">Email us at <span className="font-semibold">returns@calibershoes.com</span> or call <span className="font-semibold">+977-9800000000</span></p>
                        <p className="text-sm text-muted-foreground">Include your order number and reason for return</p>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center font-semibold text-sm">
                        2
                      </div>
                      <div>
                        <h3 className="font-semibold">Get Return Authorization</h3>
                        <p className="text-muted-foreground mb-2">We'll provide you with a return authorization number (RMA)</p>
                        <p className="text-sm text-muted-foreground">This number is required for processing your return</p>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center font-semibold text-sm">
                        3
                      </div>
                      <div>
                        <h3 className="font-semibold">Package Your Return</h3>
                        <p className="text-muted-foreground mb-2">Pack the shoes in their original packaging with all accessories</p>
                        <p className="text-sm text-muted-foreground">Include your invoice and return authorization number</p>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center font-semibold text-sm">
                        4
                      </div>
                      <div>
                        <h3 className="font-semibold">Ship or Drop Off</h3>
                        <p className="text-muted-foreground mb-2">Ship the package to our returns address or drop it off at our store</p>
                        <p className="text-sm text-muted-foreground">We'll provide the return shipping address once authorized</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Processing Time */}
              <Card className="p-8">
                <CardContent className="space-y-6">
                  <div className="flex items-center gap-3 mb-6">
                    <Clock className="h-8 w-8 text-primary" />
                    <h2 className="text-2xl font-semibold">Processing Time</h2>
                  </div>

                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <h3 className="font-semibold mb-2">Return Approval</h3>
                      <p className="text-2xl font-bold text-blue-600">1-2 Days</p>
                      <p className="text-sm text-muted-foreground">After receiving your return</p>
                    </div>

                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <h3 className="font-semibold mb-2">Refund Processing</h3>
                      <p className="text-2xl font-bold text-green-600">3-5 Days</p>
                      <p className="text-sm text-muted-foreground">After approval</p>
                    </div>

                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                      <h3 className="font-semibold mb-2">Exchange Shipping</h3>
                      <p className="text-2xl font-bold text-purple-600">2-3 Days</p>
                      <p className="text-sm text-muted-foreground">For approved exchanges</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Refund Information */}
              <Card className="p-8">
                <CardContent className="space-y-6">
                  <h2 className="text-2xl font-semibold mb-6">Refund Information</h2>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Refund Methods</h3>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 bg-primary rounded-full"></div>
                          <span>Original payment method (2-3 business days)</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 bg-primary rounded-full"></div>
                          <span>Bank transfer (1-2 business days)</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 bg-primary rounded-full"></div>
                          <span>Store credit (immediate)</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">What's Refunded</h3>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          <span>Product cost</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          <span>Original shipping charges (if applicable)</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <XCircle className="h-4 w-4 text-red-600" />
                          <span>Return shipping costs (customer responsibility)</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Contact Support */}
              <Card className="p-8 bg-primary/5">
                <CardContent className="text-center space-y-4">
                  <div className="flex justify-center mb-4">
                    <AlertTriangle className="h-12 w-12 text-primary" />
                  </div>
                  <h2 className="text-2xl font-semibold">Need Help with Returns?</h2>
                  <p className="text-muted-foreground mb-6">
                    Our customer service team is here to help you through the return process.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Button asChild>
                      <a href="mailto:returns@calibershoes.com">
                        Email Support
                      </a>
                    </Button>
                    <Button variant="outline" asChild>
                      <a href="tel:+9779800000000">
                        Call Us
                      </a>
                    </Button>
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

export default Returns;
