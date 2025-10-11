import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useSiteSettings, useUpdateSiteSettings } from '@/hooks/useSiteSettings';
import { Loader2, Upload, QrCode } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface EsewaSettings {
  enabled: boolean;
  image_url: string;
  merchant_id: string;
}

export const EsewaSettings = () => {
  const { data: esewaQr } = useSiteSettings('esewa_qr');
  const updateSettings = useUpdateSiteSettings();
  
  const [esewaData, setEsewaData] = useState<EsewaSettings>({
    enabled: (esewaQr as unknown as EsewaSettings)?.enabled || false,
    image_url: (esewaQr as unknown as EsewaSettings)?.image_url || '',
    merchant_id: (esewaQr as unknown as EsewaSettings)?.merchant_id || ''
  });

  const [uploading, setUploading] = useState(false);

  const handleQrUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `esewa-qr-${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('site-media')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('site-media')
        .getPublicUrl(filePath);

      setEsewaData({ ...esewaData, image_url: publicUrl });
      toast.success('QR code uploaded successfully');
    } catch (error: any) {
      toast.error(error.message || 'Failed to upload QR code');
    } finally {
      setUploading(false);
    }
  };

  const handleSave = () => {
    updateSettings.mutate({ key: 'esewa_qr', value: esewaData });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <QrCode className="h-5 w-5" />
          eSewa QR Payment Settings
        </CardTitle>
        <CardDescription>
          Configure eSewa QR code payment method for checkout
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="esewa-enabled">Enable eSewa Payment</Label>
            <p className="text-sm text-muted-foreground">
              Allow customers to pay using eSewa QR code
            </p>
          </div>
          <Switch
            id="esewa-enabled"
            checked={esewaData.enabled}
            onCheckedChange={(checked) => setEsewaData({ ...esewaData, enabled: checked })}
          />
        </div>

        <div>
          <Label htmlFor="merchantId">Merchant ID (Optional)</Label>
          <Input
            id="merchantId"
            value={esewaData.merchant_id}
            onChange={(e) => setEsewaData({ ...esewaData, merchant_id: e.target.value })}
            placeholder="Enter your eSewa merchant ID"
          />
        </div>

        <div>
          <Label htmlFor="qrCode">eSewa QR Code</Label>
          <div className="mt-2 space-y-4">
            {esewaData.image_url && (
              <div className="flex flex-col items-center gap-2 p-4 border rounded-lg bg-muted/50">
                <p className="text-sm text-muted-foreground mb-2">Current QR Code:</p>
                <img 
                  src={esewaData.image_url} 
                  alt="eSewa QR Code" 
                  className="w-64 h-64 object-contain border-2 border-border rounded"
                />
              </div>
            )}
            
            <div>
              <Input
                id="qrCode"
                type="file"
                accept="image/*"
                onChange={handleQrUpload}
                disabled={uploading}
                className="hidden"
              />
              <Label htmlFor="qrCode" className="cursor-pointer">
                <div className="flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed rounded-lg hover:bg-muted transition-colors">
                  {uploading ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <Upload className="h-5 w-5" />
                  )}
                  <span className="font-medium">
                    {esewaData.image_url ? 'Replace QR Code' : 'Upload QR Code'}
                  </span>
                </div>
              </Label>
              <p className="text-xs text-muted-foreground mt-2">
                Upload a clear image of your eSewa QR code (PNG, JPG, or WEBP)
              </p>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t">
          <Button 
            onClick={handleSave} 
            disabled={updateSettings.isPending || uploading}
            className="w-full"
            size="lg"
          >
            {updateSettings.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Save eSewa Settings
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
