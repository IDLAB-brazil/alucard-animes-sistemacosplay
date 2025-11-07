-- Drop all authentication-based policies
DROP POLICY IF EXISTS "Authenticated users can view participants" ON public.inscritos;
DROP POLICY IF EXISTS "Admins can insert participants" ON public.inscritos;
DROP POLICY IF EXISTS "Admins can update participants" ON public.inscritos;
DROP POLICY IF EXISTS "Admins can delete participants" ON public.inscritos;

DROP POLICY IF EXISTS "Authenticated users can view scores" ON public.notas;
DROP POLICY IF EXISTS "Judges and admins can insert scores" ON public.notas;
DROP POLICY IF EXISTS "Judges and admins can update scores" ON public.notas;
DROP POLICY IF EXISTS "Admins can delete scores" ON public.notas;

-- Restore public access policies
CREATE POLICY "Permitir leitura pública de inscritos"
ON public.inscritos FOR SELECT
USING (true);

CREATE POLICY "Permitir inserção pública de inscritos"
ON public.inscritos FOR INSERT
WITH CHECK (true);

CREATE POLICY "Permitir atualização pública de inscritos"
ON public.inscritos FOR UPDATE
USING (true);

CREATE POLICY "Permitir exclusão pública de inscritos"
ON public.inscritos FOR DELETE
USING (true);

CREATE POLICY "Permitir leitura pública de notas"
ON public.notas FOR SELECT
USING (true);

CREATE POLICY "Permitir inserção pública de notas"
ON public.notas FOR INSERT
WITH CHECK (true);

CREATE POLICY "Permitir atualização pública de notas"
ON public.notas FOR UPDATE
USING (true);

CREATE POLICY "Permitir exclusão pública de notas"
ON public.notas FOR DELETE
USING (true);