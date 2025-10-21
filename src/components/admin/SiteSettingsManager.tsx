import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useSiteSettings, useUpdateSiteSettings } from '@/hooks/useSiteSettings';
import { Loader2, Upload } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface HeroSettings {
  title: string;
  subtitle: string;
  buttonText: string;
}

interface FooterSettings {
  about: string;
  email: string;
  phone: string;
  address: string;
}

interface SiteInfoSettings {
  name: string;
  tagline: string;
  logo_url: string;
}

export const SiteSettingsManager = () => {
  const { data: hero } = useSiteSettings('hero');
  const { data: footer } = useSiteSettings('footer');
  const { data: siteInfo } = useSiteSettings('site_info');
  const updateSettings = useUpdateSiteSettings();
  
  const [heroData, setHeroData] = useState<HeroSettings>({
    title: (hero as unknown as HeroSettings)?.title || '',
    subtitle: (hero as unknown as HeroSettings)?.subtitle || '',
    buttonText: (hero as unknown as HeroSettings)?.buttonText || ''
  });
  
  const [footerData, setFooterData] = useState<FooterSettings>({
    about: (footer as unknown as FooterSettings)?.about || '',
    email: (footer as unknown as FooterSettings)?.email || '',
    phone: (footer as unknown as FooterSettings)?.phone || '',
    address: (footer as unknown as FooterSettings)?.address || ''
  });
  
  const [siteInfoData, setSiteInfoData] = useState<SiteInfoSettings>({
    name: (siteInfo as unknown as SiteInfoSettings)?.name || '',
    tagline: (siteInfo as unknown as SiteInfoSettings)?.tagline || '',
    logo_url: (siteInfo as unknown as SiteInfoSettings)?.logo_url || ''
  });

  const [uploading, setUploading] = useState(false);

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `logo-${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError, data } = await supabase.storage
        .from('site-media')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('site-media')
        .getPublicUrl(filePath);

      setSiteInfoData({ ...siteInfoData, logo_url: publicUrl });
      toast.success('Logo uploaded successfully');
    } catch (error: unknown) {
      toast.error((error as Error).message || 'Failed to upload logo');
    } finally {
      setUploading(false);
    }
  };

  const handleSaveHero = () => {
    updateSettings.mutate({ key: 'hero', value: heroData });
  };

  const handleSaveFooter = () => {
    updateSettings.mutate({ key: 'footer', value: footerData });
  };

  const handleSaveSiteInfo = () => {
    updateSettings.mutate({ key: 'site_info', value: siteInfoData });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Site Information</CardTitle>
          <CardDescription>Update your site's basic information and logo</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="siteName">Site Name</Label>
            <Input
              id="siteName"
              value={siteInfoData.name}
              onChange={(e) => setSiteInfoData({ ...siteInfoData, name: e.target.value })}
            />
          </div>
          
          <div>
            <Label htmlFor="tagline">Tagline</Label>
            <Input
              id="tagline"
              value={siteInfoData.tagline}
              onChange={(e) => setSiteInfoData({ ...siteInfoData, tagline: e.target.value })}
            />
          </div>

          <div>
            <Label htmlFor="logo">Logo</Label>
            <div className="flex items-center gap-4">
              {siteInfoData.logo_url && (
                <img src={siteInfoData.logo_url} alt="Logo" className="h-16 w-16 object-contain border rounded" />
              )}
              <div>
                <Input
                  id="logo"
                  type="file"
                  accept="image/*"
                  onChange={handleLogoUpload}
                  disabled={uploading}
                  className="hidden"
                />
                <Label htmlFor="logo" className="cursor-pointer">
                  <div className="flex items-center gap-2 px-4 py-2 border rounded-md hover:bg-muted">
                    {uploading ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Upload className="h-4 w-4" />
                    )}
                    <span>Upload Logo</span>
                  </div>
                </Label>
              </div>
            </div>
          </div>

          <Button onClick={handleSaveSiteInfo} disabled={updateSettings.isPending}>
            {updateSettings.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Save Site Info
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Hero Section</CardTitle>
          <CardDescription>Customize your homepage hero banner</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="heroTitle">Title</Label>
            <Input
              id="heroTitle"
              value={heroData.title}
              onChange={(e) => setHeroData({ ...heroData, title: e.target.value })}
            />
          </div>
          
          <div>
            <Label htmlFor="heroSubtitle">Subtitle</Label>
            <Textarea
              id="heroSubtitle"
              value={heroData.subtitle}
              onChange={(e) => setHeroData({ ...heroData, subtitle: e.target.value })}
            />
          </div>

          <div>
            <Label htmlFor="heroButton">Button Text</Label>
            <Input
              id="heroButton"
              value={heroData.buttonText}
              onChange={(e) => setHeroData({ ...heroData, buttonText: e.target.value })}
            />
          </div>

          <Button onClick={handleSaveHero} disabled={updateSettings.isPending}>
            {updateSettings.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Save Hero Section
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Footer Information</CardTitle>
          <CardDescription>Update footer content and contact details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="footerAbout">About Text</Label>
            <Textarea
              id="footerAbout"
              value={footerData.about}
              onChange={(e) => setFooterData({ ...footerData, about: e.target.value })}
            />
          </div>

          <div>
            <Label htmlFor="footerEmail">Email</Label>
            <Input
              id="footerEmail"
              type="email"
              value={footerData.email}
              onChange={(e) => setFooterData({ ...footerData, email: e.target.value })}
            />
          </div>

          <div>
            <Label htmlFor="footerPhone">Phone</Label>
            <Input
              id="footerPhone"
              value={footerData.phone}
              onChange={(e) => setFooterData({ ...footerData, phone: e.target.value })}
            />
          </div>

          <div>
            <Label htmlFor="footerAddress">Address</Label>
            <Input
              id="footerAddress"
              value={footerData.address}
              onChange={(e) => setFooterData({ ...footerData, address: e.target.value })}
            />
          </div>

          <Button onClick={handleSaveFooter} disabled={updateSettings.isPending}>
            {updateSettings.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Save Footer
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
