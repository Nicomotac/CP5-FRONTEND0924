import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";

type Row = {
  Id?: number;
  Nome: string;
  Cargo: string;
  Setor: string;
  Turno: string;
  Salário: string;
};

const API = "http://localhost:5000/Funcionarios";

export default function FormularioFuncionario() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { pathname } = useLocation();

  const isIncluir = pathname.includes("/formulario/incluir");
  const isEditar  = pathname.includes("/formulario/editar");
  const isExcluir = pathname.includes("/formulario/excluir");

  const [form, setForm] = useState<Row>({
    Nome: "", Cargo: "", Setor: "", Turno: "", Salário: ""
  });
  const [loading, setLoading] = useState(false);

  // carregar para editar/excluir
  useEffect(() => {
    if (!(isEditar || isExcluir) || !id) return;
    (async () => {
      const r = await fetch(`${API}/${id}`);
      if (!r.ok) { alert("Falha ao carregar."); navigate("/listar"); return; }
      const data = await r.json();
      setForm({
        Id: data.Id,
        Nome: data.Nome ?? "",
        Cargo: data.Cargo ?? "",
        Setor: data.Setor ?? "",
        Turno: data.Turno ?? "",
        Salário: data["Salário"] ?? ""
      });
    })();
  }, [id, isEditar, isExcluir, navigate]);

  // excluir (confirma e deleta)
  useEffect(() => {
    if (!isExcluir || !id) return;
    (async () => {
      const ok = confirm("Tem certeza que deseja excluir este funcionário?");
      if (!ok) { navigate("/listar"); return; }
      await fetch(`${API}/${id}`, { method: "DELETE" });
      navigate("/listar");
    })();
  }, [isExcluir, id, navigate]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload: Row = {
        Nome: form.Nome.trim(),
        Cargo: form.Cargo.trim(),
        Setor: form.Setor.trim(),
        Turno: form.Turno.trim(),
        Salário: form.Salário.toString().trim()
      };
      const url = isEditar ? `${API}/${id}` : API;
      const method = isEditar ? "PUT" : "POST";
      const r = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      if (!r.ok) throw new Error("Erro ao salvar.");
      navigate("/listar");
    } catch (e) {
      alert((e as Error).message);
    } finally {
      setLoading(false);
    }
  };

  if (isExcluir) {
    return (
      <div className="max-w-xl m-auto my-10 text-center">
        <p>Processando exclusão...</p>
        <Link to="/listar" className="underline text-blue-600">Voltar à lista</Link>
      </div>
    );
  }

  return (
    <section className="max-w-2xl m-auto">
      <h2 className="text-3xl font-semibold text-blue-800 text-center mb-6">
        {isEditar ? "Editar Funcionário" : "Cadastrar Funcionário"}
      </h2>

      <form
        onSubmit={onSubmit}
        className="border-2 border-gray-300 rounded-md p-4 bg-white shadow"
      >
        <input className="border-2 border-gray-300 rounded-md p-2 w-full mb-2" name="Nome" value={form.Nome} onChange={onChange} placeholder="Nome" required />
        <input className="border-2 border-gray-300 rounded-md p-2 w-full mb-2" name="Cargo" value={form.Cargo} onChange={onChange} placeholder="Cargo" required />
        <input className="border-2 border-gray-300 rounded-md p-2 w-full mb-2" name="Setor" value={form.Setor} onChange={onChange} placeholder="Setor" required />
        <input className="border-2 border-gray-300 rounded-md p-2 w-full mb-2" name="Turno" value={form.Turno} onChange={onChange} placeholder="Turno" required />
        <input className="border-2 border-gray-300 rounded-md p-2 w-full mb-4" name="Salário" value={form.Salário} onChange={onChange} placeholder="Salário" required />

        <div className="flex justify-center gap-3">
          <button
            type="submit"
            disabled={loading}
            className="bg-green-600 text-white font-semibold py-2 px-5 rounded-md hover:bg-green-700 disabled:opacity-60"
          >
            {loading ? "Salvando..." : isEditar ? "Atualizar" : "Salvar"}
          </button>
          <Link to="/listar" className="bg-red-600 text-white font-semibold py-2 px-5 rounded-md hover:bg-red-700">
            Cancelar
          </Link>
        </div>
      </form>
    </section>
  );
}
