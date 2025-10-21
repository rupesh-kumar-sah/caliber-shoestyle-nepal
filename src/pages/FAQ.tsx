import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { HelpCircle, ShoppingBag, Truck, RefreshCw, CreditCard, Phone } from "lucide-react";

const FAQ = () => {
  const faqCategories = [
    {
      title: "Orders & Shopping",
      icon: <ShoppingBag className="h-5 w-5" />,
      questions: [
        {
          question: "How can I track my order?",
          answer: "Once your order ships, you'll get a tracking link via email/SMS. You can also log into your Caliber account to view updates in real-time."
        },
        {
          question: "Do you offer cash on delivery (COD)?",
          answer: "Yes! COD is available across major cities in Nepal. You can select this option during checkout."
        },
        {
          question: "How do I choose the right size?",
          answer: "Check our Size Guide on each product page for detailed measurements. We recommend measuring your feet and comparing with our size chart."
        },
        {
          question: "Can I cancel my order?",
          answer: "Orders can be canceled within 2 hours of placement by contacting our support team at support@calibershoes.com or +977-9800000000."
        },
        {
          question: "Do you offer gift cards?",
          answer: "Yes, we offer digital gift cards in various denominations. They're perfect for gifting to friends and family."
        }
      ]
    },
    {
      title: "Shipping & Delivery",
      icon: <Truck className="h-5 w-5" />,
      questions: [
        {
          question: "How long does delivery take?",
          answer: "We deliver across Nepal within 3–7 business days. Major cities usually receive orders faster (2-4 days)."
        },
        {
          question: "What are your shipping charges?",
          answer: "Free shipping on orders above Rs. 3,000. Flat Rs. 150 for orders below Rs. 3,000."
        },
        {
          question: "Do you deliver to my area?",
          answer: "We deliver to all major cities and towns across Nepal. For remote areas, delivery time may be extended."
        },
        {
          question: "Can I change my delivery address?",
          answer: "You can update your delivery address within 2 hours of placing the order by contacting our support team."
        }
      ]
    },
    {
      title: "Returns & Exchanges",
      icon: <RefreshCw className="h-5 w-5" />,
      questions: [
        {
          question: "What's your return policy?",
          answer: "We offer a 7-day return policy for unworn shoes in original packaging. Items must be returned with proof of purchase."
        },
        {
          question: "How do I initiate a return?",
          answer: "Contact our support team at returns@calibershoes.com or +977-9800000000 with your order number and reason for return."
        },
        {
          question: "Who pays for return shipping?",
          answer: "Return shipping costs are the customer's responsibility unless the return is due to our error (wrong item sent, defective product)."
        },
        {
          question: "How long does the refund process take?",
          answer: "Once we receive and approve your return, refunds are processed within 3-5 business days to your original payment method."
        }
      ]
    },
    {
      title: "Payments & Pricing",
      icon: <CreditCard className="h-5 w-5" />,
      questions: [
        {
          question: "What payment methods do you accept?",
          answer: "We accept credit/debit cards, mobile wallets (eSewa, Khalti), bank transfers, and cash on delivery (COD)."
        },
        {
          question: "Are prices inclusive of taxes?",
          answer: "All prices shown include VAT. No additional taxes will be charged at checkout."
        },
        {
          question: "Do you offer installment payments?",
          answer: "Currently, we don't offer installment payments, but we're working on adding this feature soon."
        },
        {
          question: "Can I get a price adjustment?",
          answer: "If an item goes on sale within 7 days of your purchase, you may be eligible for a price adjustment. Contact support for details."
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-16">
        <div className="container px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="flex justify-center mb-4">
                <HelpCircle className="h-16 w-16 text-primary" />
              </div>
              <h1 className="text-4xl font-bold mb-4">Frequently Asked Questions</h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Find answers to common questions about shopping, shipping, returns, and more at Caliber Shoes.
              </p>
            </div>

            <div className="space-y-8">
              {faqCategories.map((category, categoryIndex) => (
                <Card key={categoryIndex} className="p-8">
                  <CardContent className="space-y-6">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="text-primary">
                        {category.icon}
                      </div>
                      <h2 className="text-2xl font-semibold">{category.title}</h2>
                    </div>

                    <Accordion type="single" collapsible className="w-full">
                      {category.questions.map((faq, faqIndex) => (
                        <AccordionItem key={faqIndex} value={`${categoryIndex}-${faqIndex}`}>
                          <AccordionTrigger className="text-left">
                            {faq.question}
                          </AccordionTrigger>
                          <AccordionContent className="text-muted-foreground">
                            {faq.answer}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </CardContent>
                </Card>
              ))}

              {/* Still Need Help Section */}
              <Card className="p-8 bg-primary/5">
                <CardContent className="text-center space-y-6">
                  <div className="flex justify-center">
                    <Phone className="h-12 w-12 text-primary" />
                  </div>
                  <h2 className="text-2xl font-semibold">Still Need Help?</h2>
                  <p className="text-muted-foreground max-w-2xl mx-auto">
                    Can't find the answer you're looking for? Our customer service team is here to help you with any questions or concerns.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Card className="p-4 text-center">
                      <h3 className="font-semibold mb-2">Email Support</h3>
                      <a href="mailto:support@calibershoes.com" className="text-primary hover:underline">
                        support@calibershoes.com
                      </a>
                      <p className="text-sm text-muted-foreground mt-1">Response within 24 hours</p>
                    </Card>

                    <Card className="p-4 text-center">
                      <h3 className="font-semibold mb-2">Phone Support</h3>
                      <a href="tel:+9779800000000" className="text-primary hover:underline">
                        +977-9800000000
                      </a>
                      <p className="text-sm text-muted-foreground mt-1">Sunday - Friday, 9 AM - 6 PM</p>
                    </Card>
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

export default FAQ;
