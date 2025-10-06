import { Link } from "react-router-dom";

export default function PaginaInicial() {
  return (
    <div className="relative">
      {/* Blobs decorativos */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-24 -left-24 w-80 h-80 rounded-full bg-sky-400/30 blur-3xl animate-float" />
        <div className="absolute -bottom-28 -right-20 w-96 h-96 rounded-full bg-indigo-400/30 blur-3xl animate-float" />
      </div>

      {/* HERO */}
      <section className="mx-auto max-w-6xl px-4 py-10 grid gap-10 md:grid-cols-2 items-center">
        <div className="space-y-5">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight title-gradient">
            Hospital das Clínicas
          </h1>
          <p className="text-slate-600">
            Referência regional em atendimento humanizado, com equipes
            multiprofissionais e tecnologia atualizada.
          </p>

          <ul className="list-disc pl-6 text-slate-700 space-y-1">
            <li>Unidades: Clínicas, Pediatria, Emergência</li>
            <li>Leitos ativos: 180</li>
            <li>Atendimento 24 horas</li>
          </ul>

          <div className="flex flex-wrap gap-3 pt-2">
            <Link to="/listar" className="btn-gradient">
              Ver Funcionários
            </Link>
            <Link to="/formulario/incluir" className="btn-outline">
              Cadastrar Funcionário
            </Link>
          </div>

          
          <div className="flex flex-wrap gap-2 pt-4">
            <span className="chip">Clínicas</span>
            <span className="chip">Pediatria</span>
            <span className="chip">Emergência</span>
            <span className="chip">TI</span>
            <span className="chip">Administração</span>
          </div>
        </div>

        <div className="glass-card p-3">
          <img
            className="w-full h-[280px] md:h-[360px] object-cover rounded-xl shadow-md"
            src="https://images.unsplash.com/photo-1504439468489-c8920d796a29?q=80&w=1200&auto=format&fit=crop"
            alt="Centro cirúrgico do hospital"
            loading="lazy"
          />
        </div>
      </section>

     
      <section className="mx-auto max-w-6xl px-4 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Leitos", value: "180" },
          { label: "Profissionais", value: "320" },
          { label: "Atendimentos/dia", value: "450" },
          { label: "Satisfação", value: "96%" },
        ].map((m) => (
          <div key={m.label} className="glass-card p-5">
            <p className="text-sm text-slate-500">{m.label}</p>
            <p className="text-2xl font-semibold">{m.value}</p>
          </div>
        ))}
      </section>

      <section className="mx-auto max-w-6xl px-4 mt-10">
        <div className="glass-card overflow-hidden">
          <div className="md:grid md:grid-cols-3">
           
            <div className="p-6 md:col-span-2">
              <h2 className="text-2xl font-semibold mb-2">
                Nova ala pediátrica modernizada
              </h2>
              <p className="text-slate-600">
                A unidade recebeu novos leitos, brinquedoteca e ampliação da equipe de
                enfermagem para acelerar triagens e garantir um atendimento ainda mais
                acolhedor às crianças e famílias.
              </p>
              <div className="pt-4">
                <Link to="/listar" className="btn-outline">Conhecer a equipe</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      
      <section className="mx-auto max-w-6xl px-4 py-10">
        <div className="rounded-2xl p-6 md:p-8 text-center text-white shadow-lg"
             style={{backgroundImage:"linear-gradient(90deg,#0ea5e9,#6366f1)"}}>
          <h3 className="text-2xl md:text-3xl font-bold mb-2">Quer fazer parte da equipe?</h3>
          <p className="opacity-90">
            Cadastre novos profissionais ou atualize os existentes agora mesmo.
          </p>
          <div className="pt-4">
            <Link
                to="/formulario/incluir"
                className="group relative inline-flex items-center justify-center overflow-hidden rounded-full
                            bg-white/90 px-6 py-3 font-semibold text-slate-900 shadow-lg ring-1 ring-white/70 backdrop-blur
                            transition hover:bg-white hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0
                            focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                <span>Cadastrar agora</span>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-0.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
                </svg>
                <span className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-r
                   from-white/0 via-white/60 to-white/0 opacity-0 group-hover:opacity-100
                   blur-md transition" />
            </Link>

          </div>
        </div>
      </section>
    </div>
  );
}

