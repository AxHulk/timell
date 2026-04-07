CREATE POLICY "Service role can update leads" ON public.leads
  FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'client'))
  WITH CHECK (public.has_role(auth.uid(), 'client'));