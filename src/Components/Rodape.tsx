export default function Rodape() {
  return (
    <footer className="border-t border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto max-w-6xl px-4 py-5 text-center text-sm text-slate-600">
        © {new Date().getFullYear()} • CP5 — Cadastro de Funcionários
      </div>
    </footer>
  );
}
