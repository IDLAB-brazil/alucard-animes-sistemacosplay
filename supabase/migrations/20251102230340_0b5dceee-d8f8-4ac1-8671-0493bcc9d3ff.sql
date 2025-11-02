-- Criar tabela de inscritos
CREATE TABLE public.inscritos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nome TEXT NOT NULL,
  categoria TEXT NOT NULL,
  cosplay TEXT NOT NULL,
  created BIGINT NOT NULL DEFAULT EXTRACT(EPOCH FROM now()) * 1000,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Criar índices para performance
CREATE INDEX idx_inscritos_categoria ON public.inscritos(categoria);
CREATE INDEX idx_inscritos_created ON public.inscritos(created);

-- Habilitar RLS
ALTER TABLE public.inscritos ENABLE ROW LEVEL SECURITY;

-- Políticas RLS (permite leitura e escrita para todos - sistema público)
CREATE POLICY "Permitir leitura pública de inscritos"
  ON public.inscritos
  FOR SELECT
  USING (true);

CREATE POLICY "Permitir inserção pública de inscritos"
  ON public.inscritos
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Permitir atualização pública de inscritos"
  ON public.inscritos
  FOR UPDATE
  USING (true);

CREATE POLICY "Permitir exclusão pública de inscritos"
  ON public.inscritos
  FOR DELETE
  USING (true);

-- Criar tabela de notas
CREATE TABLE public.notas (
  id UUID PRIMARY KEY REFERENCES public.inscritos(id) ON DELETE CASCADE,
  jurado_1 DECIMAL(3,1),
  jurado_2 DECIMAL(3,1),
  jurado_3 DECIMAL(3,1),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Habilitar RLS
ALTER TABLE public.notas ENABLE ROW LEVEL SECURITY;

-- Políticas RLS (permite leitura e escrita para todos - sistema público)
CREATE POLICY "Permitir leitura pública de notas"
  ON public.notas
  FOR SELECT
  USING (true);

CREATE POLICY "Permitir inserção pública de notas"
  ON public.notas
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Permitir atualização pública de notas"
  ON public.notas
  FOR UPDATE
  USING (true);

CREATE POLICY "Permitir exclusão pública de notas"
  ON public.notas
  FOR DELETE
  USING (true);

-- Habilitar realtime
ALTER PUBLICATION supabase_realtime ADD TABLE public.inscritos;
ALTER PUBLICATION supabase_realtime ADD TABLE public.notas;