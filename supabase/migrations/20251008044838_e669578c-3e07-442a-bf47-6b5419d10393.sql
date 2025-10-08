-- Create site_settings table for admin-editable content
CREATE TABLE IF NOT EXISTS public.site_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key TEXT UNIQUE NOT NULL,
  value JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- Anyone can read settings
CREATE POLICY "Anyone can view site settings"
ON public.site_settings
FOR SELECT
USING (true);

-- Only admins can update settings
CREATE POLICY "Admins can update site settings"
ON public.site_settings
FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM user_roles
    WHERE user_id = auth.uid() AND role = 'admin'
  )
);

-- Create storage bucket for site media
INSERT INTO storage.buckets (id, name, public)
VALUES ('site-media', 'site-media', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies for site media
CREATE POLICY "Public can view site media"
ON storage.objects
FOR SELECT
USING (bucket_id = 'site-media');

CREATE POLICY "Admins can upload site media"
ON storage.objects
FOR INSERT
WITH CHECK (
  bucket_id = 'site-media' AND
  EXISTS (
    SELECT 1 FROM user_roles
    WHERE user_id = auth.uid() AND role = 'admin'
  )
);

CREATE POLICY "Admins can update site media"
ON storage.objects
FOR UPDATE
USING (
  bucket_id = 'site-media' AND
  EXISTS (
    SELECT 1 FROM user_roles
    WHERE user_id = auth.uid() AND role = 'admin'
  )
);

CREATE POLICY "Admins can delete site media"
ON storage.objects
FOR DELETE
USING (
  bucket_id = 'site-media' AND
  EXISTS (
    SELECT 1 FROM user_roles
    WHERE user_id = auth.uid() AND role = 'admin'
  )
);

-- Insert default site settings
INSERT INTO public.site_settings (key, value) VALUES
('hero', '{"title": "Step Into Style", "subtitle": "Discover premium footwear that combines comfort with elegance", "buttonText": "Shop Now"}'),
('features', '[
  {"icon": "Truck", "title": "Free Shipping", "description": "On orders over रू 5000"},
  {"icon": "Shield", "title": "Secure Payment", "description": "100% secure transactions"},
  {"icon": "Star", "title": "Quality Guaranteed", "description": "Premium materials"},
  {"icon": "Headphones", "title": "24/7 Support", "description": "Always here to help"}
]'),
('testimonials', '[
  {"name": "Sarah Johnson", "review": "Best shoes I''ve ever owned! Comfortable and stylish.", "rating": 5},
  {"name": "Michael Chen", "review": "Great quality and fast shipping. Highly recommend!", "rating": 5},
  {"name": "Emily Davis", "review": "Love the variety and excellent customer service.", "rating": 5}
]'),
('footer', '{"about": "Caliber Shoes - Your trusted partner for premium footwear since 2024", "email": "info@calibershoes.com", "phone": "+977 1234567890", "address": "Kathmandu, Nepal"}'),
('esewa_qr', '{"enabled": true, "image_url": "", "merchant_id": ""}'),
('site_info', '{"name": "Caliber Shoes", "tagline": "Step Into Style", "logo_url": ""}')
ON CONFLICT (key) DO NOTHING;