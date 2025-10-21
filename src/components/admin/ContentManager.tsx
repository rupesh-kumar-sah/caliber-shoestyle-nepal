import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileText, Phone, Truck, RefreshCw, HelpCircle, Save, Edit3 } from 'lucide-react';
import { toast } from 'sonner';

interface ContentSection {
  id: string;
  title: string;
  content: string;
  lastModified?: string;
}

const ContentManager = () => {
  const [activeTab, setActiveTab] = useState('about');
  const [isEditing, setIsEditing] = useState<string | null>(null);

  // Content state for each page
  const [aboutContent, setAboutContent] = useState<ContentSection>({
    id: 'about',
    title: 'About Us Content',
    content: `🥿 About Us — Caliber Shoes

At Caliber Shoes, we believe every step you take should blend comfort, confidence, and class. Founded with a passion for craftsmanship and design, Caliber Shoes combines premium materials, modern aesthetics, and advanced technology to create footwear that fits every occasion — from daily wear to special moments.

Our mission is simple: To empower people to walk boldly with style and comfort that lasts all day.

Whether it's classic formals, trendy sneakers, or casual comfort shoes, each Caliber pair is made with precision, durability, and care.

Step Up Your Style — Step Into Caliber.`
  });

  const [contactContent, setContactContent] = useState<ContentSection>({
    id: 'contact',
    title: 'Contact Information',
    content: `We'd love to hear from you! For product inquiries, feedback, or support, please reach out using the details below:

Email: support@calibershoes.com
Phone: +977-9800000000
Address: Caliber Shoes HQ, Kathmandu, Nepal
Business Hours: Sunday – Friday | 9:00 AM – 6:00 PM

Or fill out our Contact Form on the website, and we'll get back to you within 24 hours.`
  });

  const [shippingContent, setShippingContent] = useState<ContentSection>({
    id: 'shipping',
    title: 'Shipping Information',
    content: `We deliver across Nepal within 3–7 business days. All orders are carefully packed and shipped with trusted courier partners. Once your order ships, you'll receive an email and SMS tracking number.

Delivery Charges:
• Free shipping on orders above Rs. 3,000
• Flat Rs. 150 for orders below that`
  });

  const [returnsContent, setReturnsContent] = useState<ContentSection>({
    id: 'returns',
    title: 'Returns & Exchanges Policy',
    content: `We want you to love your Caliber Shoes! If the fit isn't right or you received the wrong product, you can return or exchange it within 7 days of delivery.

Conditions:
• Items must be unused and in original packaging
• Proof of purchase (invoice) required
• Exchanges subject to stock availability

Contact our support team at returns@calibershoes.com to initiate a return.`
  });

  const [faqContent, setFaqContent] = useState<ContentSection>({
    id: 'faq',
    title: 'Frequently Asked Questions',
    content: `1. How can I track my order? Once your order ships, you'll get a tracking link via email/SMS.

2. Do you offer cash on delivery (COD)? Yes! COD is available across major cities in Nepal.

3. How do I choose the right size? Check our Size Guide on each product page for detailed measurements.

4. Can I cancel my order? Orders can be canceled within 2 hours of placement by contacting our support team.

5. What if my shoes are defective? In rare cases of manufacturing defects, we'll replace your pair free of cost.`
  });

  const handleEdit = (sectionId: string) => {
    setIsEditing(sectionId);
  };

  const handleSave = (sectionId: string) => {
    // Here you would typically save to a database or API
    toast.success('Content saved successfully!');
    setIsEditing(null);
  };

  const handleCancel = () => {
    setIsEditing(null);
  };

  const updateContent = (sectionId: string, newContent: string) => {
    switch (sectionId) {
      case 'about':
        setAboutContent({ ...aboutContent, content: newContent });
        break;
      case 'contact':
        setContactContent({ ...contactContent, content: newContent });
        break;
      case 'shipping':
        setShippingContent({ ...shippingContent, content: newContent });
        break;
      case 'returns':
        setReturnsContent({ ...returnsContent, content: newContent });
        break;
      case 'faq':
        setFaqContent({ ...faqContent, content: newContent });
        break;
    }
  };

  const renderContentEditor = (section: ContentSection) => (
    <Card className="mb-6">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center gap-2">
            {section.id === 'about' && <FileText className="h-5 w-5" />}
            {section.id === 'contact' && <Phone className="h-5 w-5" />}
            {section.id === 'shipping' && <Truck className="h-5 w-5" />}
            {section.id === 'returns' && <RefreshCw className="h-5 w-5" />}
            {section.id === 'faq' && <HelpCircle className="h-5 w-5" />}
            {section.title}
          </CardTitle>
          <div className="flex gap-2">
            {isEditing === section.id ? (
              <>
                <Button
                  size="sm"
                  onClick={() => handleSave(section.id)}
                  className="flex items-center gap-2"
                >
                  <Save className="h-4 w-4" />
                  Save
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleCancel}
                >
                  Cancel
                </Button>
              </>
            ) : (
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleEdit(section.id)}
                className="flex items-center gap-2"
              >
                <Edit3 className="h-4 w-4" />
                Edit
              </Button>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {isEditing === section.id ? (
          <Textarea
            value={
              section.id === 'about' ? aboutContent.content :
              section.id === 'contact' ? contactContent.content :
              section.id === 'shipping' ? shippingContent.content :
              section.id === 'returns' ? returnsContent.content :
              faqContent.content
            }
            onChange={(e) => updateContent(section.id, e.target.value)}
            rows={10}
            className="min-h-[200px]"
          />
        ) : (
          <div className="whitespace-pre-wrap p-4 bg-muted/30 rounded-lg min-h-[150px]">
            {section.content}
          </div>
        )}
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Content Management</h2>
        <p className="text-sm text-muted-foreground">
          Manage content for About Us, Contact, Shipping, Returns, and FAQ pages
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="about" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            About Us
          </TabsTrigger>
          <TabsTrigger value="contact" className="flex items-center gap-2">
            <Phone className="h-4 w-4" />
            Contact
          </TabsTrigger>
          <TabsTrigger value="shipping" className="flex items-center gap-2">
            <Truck className="h-4 w-4" />
            Shipping
          </TabsTrigger>
          <TabsTrigger value="returns" className="flex items-center gap-2">
            <RefreshCw className="h-4 w-4" />
            Returns
          </TabsTrigger>
          <TabsTrigger value="faq" className="flex items-center gap-2">
            <HelpCircle className="h-4 w-4" />
            FAQ
          </TabsTrigger>
        </TabsList>

        <TabsContent value="about">
          {renderContentEditor(aboutContent)}
        </TabsContent>

        <TabsContent value="contact">
          {renderContentEditor(contactContent)}
        </TabsContent>

        <TabsContent value="shipping">
          {renderContentEditor(shippingContent)}
        </TabsContent>

        <TabsContent value="returns">
          {renderContentEditor(returnsContent)}
        </TabsContent>

        <TabsContent value="faq">
          {renderContentEditor(faqContent)}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ContentManager;
