
-- Fix leads policies: use admin instead of client
DROP POLICY IF EXISTS "Only admins can view leads" ON public.leads;
DROP POLICY IF EXISTS "Service role can update leads" ON public.leads;

CREATE POLICY "Admins can view leads" ON public.leads
  FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update leads" ON public.leads
  FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Prevent privilege escalation
DROP POLICY IF EXISTS "Users can insert own roles" ON public.user_roles;

-- Lock down sms_codes to backend only
DROP POLICY IF EXISTS "Anyone can insert sms codes" ON public.sms_codes;
DROP POLICY IF EXISTS "Anyone can select sms codes" ON public.sms_codes;
DROP POLICY IF EXISTS "Anyone can update sms codes" ON public.sms_codes;
REVOKE ALL ON public.sms_codes FROM anon, authenticated;
GRANT ALL ON public.sms_codes TO service_role;

-- Restrict has_role EXECUTE
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO service_role, postgres;
