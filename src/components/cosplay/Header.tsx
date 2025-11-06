import logo from "@/assets/logo.png";
import { useAuth } from "@/contexts/AuthContext";
import { LogOut, User } from "lucide-react";

interface HeaderProps {
  activeView: string;
  onNavigate: (view: string) => void;
  onExportPdf: () => void;
}

export function Header({ activeView, onNavigate, onExportPdf }: HeaderProps) {
  const { user, signOut, hasRole } = useAuth();
  
  const navItems = [
    { id: "inscricoes", label: "Inscrições", icon: "📝" },
    { id: "ranking", label: "Ranking", icon: "🏆" },
    { id: "avaliacao", label: "Jurados", icon: "⭐" },
    { id: "kpop", label: "K-pop", icon: "🎵" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <button 
            onClick={() => onNavigate("home")}
            className="flex items-center gap-3 group"
          >
            <img
              src={logo}
              alt="Alucard Animes"
              className="h-12 w-12 rounded-lg object-contain transition-transform group-hover:scale-110 group-hover:rotate-3"
            />
            <div className="hidden sm:block text-left">
              <h1 className="text-lg font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Cadastro Concurso
              </h1>
              <p className="text-xs text-muted-foreground">
                Sistema de gerenciamento e avaliação
              </p>
            </div>
          </button>

          <nav className="flex flex-wrap items-center gap-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg border transition-all ${
                  activeView === item.id
                    ? "bg-gradient-to-r from-primary to-accent text-primary-foreground border-primary shadow-lg shadow-primary/25"
                    : "border-border hover:border-primary hover:bg-muted"
                }`}
              >
                <span>{item.icon}</span>
                <span className="hidden sm:inline">{item.label}</span>
              </button>
            ))}
            <button
              onClick={onExportPdf}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg border border-border hover:border-primary hover:bg-muted transition-all"
            >
              <span>📄</span>
              <span className="hidden sm:inline">Apresentação</span>
            </button>
            
            <div className="flex items-center gap-2 px-3 py-2 text-xs border border-border rounded-lg bg-muted/50">
              <User className="h-3 w-3" />
              <span className="hidden md:inline max-w-[120px] truncate">{user?.email}</span>
              {hasRole('admin') && (
                <span className="px-1.5 py-0.5 bg-primary/20 text-primary rounded text-[10px] font-semibold">
                  ADMIN
                </span>
              )}
              {hasRole('judge') && (
                <span className="px-1.5 py-0.5 bg-accent/20 text-accent rounded text-[10px] font-semibold">
                  JURADO
                </span>
              )}
            </div>
            
            <button
              onClick={() => signOut()}
              className="inline-flex items-center justify-center h-9 w-9 rounded-lg border border-border hover:border-destructive hover:bg-destructive/10 hover:text-destructive transition-all"
              title="Sair"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
}
