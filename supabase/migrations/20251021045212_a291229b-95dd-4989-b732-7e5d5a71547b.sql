-- Add transaction_id column to orders table
ALTER TABLE public.orders 
ADD COLUMN transaction_id text;

-- Update status to use a more specific type with clear states
ALTER TABLE public.orders 
ALTER COLUMN status SET DEFAULT 'pending';

-- Add a comment to document the allowed status values
COMMENT ON COLUMN public.orders.status IS 'Allowed values: pending, payment_confirmed, accepted, rejected, cancelled, completed';

-- Allow admins to update orders
CREATE POLICY "Admins can update orders"
ON public.orders
FOR UPDATE
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM user_roles
    WHERE user_roles.user_id = auth.uid()
    AND user_roles.role = 'admin'
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1 FROM user_roles
    WHERE user_roles.user_id = auth.uid()
    AND user_roles.role = 'admin'
  )
);