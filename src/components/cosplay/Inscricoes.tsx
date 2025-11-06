import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { Inscrito } from "@/lib/cosplay-types";
import { CATEGORIES, KPOP_CATEGORIES } from "@/lib/cosplay-types";
import { byOrder } from "@/lib/cosplay-utils";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

interface InscricoesProps {
  inscritos: Inscrito[];
  loading: boolean;
  onAdd: (inscrito: { nome: string; categoria: string; cosplay: string }) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}

export function Inscricoes({ inscritos, loading, onAdd, onDelete }: InscricoesProps) {
  const { hasRole } = useAuth();
  const isAdmin = hasRole('admin');
  
  const [nome, setNome] = useState("");
  const [categoria, setCategoria] = useState("");
  const [cosplay, setCosplay] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const getCosplayLabel = () => {
    if (categoria === "ANIMEKÊ") return "Música/Anime";
    if (KPOP_CATEGORIES.includes(categoria as any)) return "Música/Artista";
    return "Personagem/Cosplay";
  };

  const getCosplayPlaceholder = () => {
    if (categoria === "ANIMEKÊ") return "Nome da música ou anime";
    if (KPOP_CATEGORIES.includes(categoria as any)) return "Nome da música e artista";
    return "Nome do personagem ou cosplay";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!nome.trim() || !categoria || !cosplay.trim()) {
      return;
    }

    setSubmitting(true);
    try {
      await onAdd({ nome: nome.trim(), categoria, cosplay: cosplay.trim() });
      setNome("");
      setCategoria("");
      setCosplay("");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Tem certeza que deseja excluir este participante?")) {
      await onDelete(id);
    }
  };

  const sortedInscritos = [...inscritos].sort(byOrder);
  let lastCat: string | null = null;

  return (
    <div className="space-y-6">
      {isAdmin && (
        <Card className="p-6 border-border bg-card">
          <h2 className="text-2xl font-bold text-primary mb-6 flex items-center gap-2">
            <span>📝</span>
            <span>Gerenciar Inscrições</span>
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">{/* form content */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label htmlFor="nome" className="flex items-center gap-2">
                <span>👤</span>
                <span>Nome do Participante</span>
              </Label>
              <Input
                id="nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                placeholder="Digite o nome completo"
                required
                className="border-input bg-background"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="categoria" className="flex items-center gap-2">
                <span>🎭</span>
                <span>Categoria</span>
              </Label>
              <Select value={categoria} onValueChange={setCategoria} required>
                <SelectTrigger id="categoria" className="border-input bg-background">
                  <SelectValue placeholder="Selecione uma categoria" />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="cosplay" className="flex items-center gap-2">
                <span>🎨</span>
                <span>{getCosplayLabel()}</span>
              </Label>
              <Input
                id="cosplay"
                value={cosplay}
                onChange={(e) => setCosplay(e.target.value)}
                placeholder={getCosplayPlaceholder()}
                required
                className="border-input bg-background"
              />
            </div>
          </div>
          
          <div className="flex gap-4 flex-wrap">
            <Button type="submit" disabled={submitting} className="bg-gradient-to-r from-primary to-accent">
              {submitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              <span>➕</span>
              <span>Adicionar Participante</span>
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setNome("");
                setCategoria("");
                setCosplay("");
              }}
            >
              <span>🗑️</span>
              <span>Limpar Formulário</span>
            </Button>
          </div>
        </form>
      </Card>
      )}

      <Card className="p-6 border-border bg-card">
        <h3 className="text-xl font-semibold text-primary mb-4 flex items-center gap-2">
          <span>👥</span>
          <span>Lista de Participantes</span>
        </h3>
        
        {loading ? (
          <div className="text-center py-12">
            <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
            <p className="text-muted-foreground mt-4">Carregando participantes...</p>
          </div>
        ) : !sortedInscritos.length ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-lg font-semibold mb-2">Nenhum participante inscrito</h3>
            <p className="text-muted-foreground">Adicione o primeiro participante usando o formulário acima</p>
          </div>
        ) : (
          <div className="space-y-4">
            {sortedInscritos.map((inscrito) => {
              const showCategoryHeader = inscrito.categoria !== lastCat;
              lastCat = inscrito.categoria;
              
              return (
                <div key={inscrito.id} className="space-y-2">
                  {showCategoryHeader && (
                    <div className="font-bold text-primary py-2 px-4 border-b-2 border-border uppercase tracking-wide text-sm">
                      {inscrito.categoria}
                    </div>
                  )}
                  <div className="flex items-center justify-between p-4 bg-background border border-border rounded-lg hover:border-primary transition-all hover:translate-x-1 animate-slide-in">
                    <div className="space-y-1">
                      <div className="font-semibold">{inscrito.nome}</div>
                      <div className="text-sm text-muted-foreground">{inscrito.cosplay}</div>
                    </div>
                    {isAdmin && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(inscrito.id)}
                        className="hover:bg-destructive hover:text-destructive-foreground"
                      >
                        <span>🗑️</span>
                        <span className="ml-2">Excluir</span>
                      </Button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </Card>
    </div>
  );
}
