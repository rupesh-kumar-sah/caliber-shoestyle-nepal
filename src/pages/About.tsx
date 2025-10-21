import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { Loader2 } from "lucide-react";

const About = () => {
  const { data: aboutContent, isLoading } = useSiteSettings('about');

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-16">
        <div className="container px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="p-8">
              <CardContent className="prose prose-lg max-w-none">
                <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
                  🥿 About Us — Caliber Shoes
                </h2>

                <p className="text-lg mb-6">
                  At Caliber Shoes, we believe every step you take should blend comfort, confidence, and class.
                  Founded with a passion for craftsmanship and design, Caliber Shoes combines premium materials, modern aesthetics, and advanced technology to create footwear that fits every occasion — from daily wear to special moments.
                </p>

                <div className="bg-muted/30 p-6 rounded-lg mb-6">
                  <h3 className="text-xl font-semibold mb-3">Our mission is simple:</h3>
                  <p className="text-lg italic">To empower people to walk boldly with style and comfort that lasts all day.</p>
                </div>

                <p className="mb-6">
                  Whether it's classic formals, trendy sneakers, or casual comfort shoes, each Caliber pair is made with precision, durability, and care.
                </p>

                <div className="bg-primary/10 p-6 rounded-lg text-center">
                  <p className="text-xl font-semibold text-primary">Step Up Your Style — Step Into Caliber.</p>
                </div>

                <div className="mt-8 p-6 bg-blue-50 rounded-lg">
                  <h3 className="text-xl font-semibold mb-4 text-blue-800">Need More Information?</h3>
                  <p className="text-blue-700 mb-4">
                    For detailed information about our services, policies, and support, please visit our dedicated pages:
                  </p>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="text-center">
                      <h4 className="font-semibold text-blue-800">📞 Contact Us</h4>
                      <p className="text-sm text-blue-600">Get in touch with our support team</p>
                    </div>
                    <div className="text-center">
                      <h4 className="font-semibold text-blue-800">👟 Customer Service</h4>
                      <p className="text-sm text-blue-600">Shipping, returns, and policies</p>
                    </div>
                    <div className="text-center">
                      <h4 className="font-semibold text-blue-800">❓ FAQ</h4>
                      <p className="text-sm text-blue-600">Common questions and answers</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default About;
