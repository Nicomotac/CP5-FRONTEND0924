import { Link, NavLink } from "react-router-dom";

export default function Menu() {
  
  const itemBase =
    "px-3 py-2 rounded-lg font-medium text-slate-700 hover:bg-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 transition";
  const itemAtivo = "!bg-slate-900 !text-white hover:!bg-slate-900";

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/70">
      <div className="mx-auto max-w-6xl px-4 h-16 flex items-center justify-between">
        
        <Link
          to="/"
          className="text-lg font-bold tracking-tight text-slate-900 hover:opacity-90"
        >
          Hospital das Clínicas
        </Link>

        
        <nav className="flex items-center gap-1">
          <NavLink end to="/" className={({ isActive }) => `${itemBase} ${isActive ? itemAtivo : ""}`}>
            Início
          </NavLink>
          <NavLink to="/listar" className={({ isActive }) => `${itemBase} ${isActive ? itemAtivo : ""}`}>
            Funcionários
          </NavLink>
          <NavLink to="/formulario/incluir" className={({ isActive }) => `${itemBase} ${isActive ? itemAtivo : ""}`}>
            Cadastrar
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
