import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

type AnyRow = {
  Id?: number;           // dos seeds (dados.json)
  id?: number;           // dos itens criados via POST
  Nome?: string; nome?: string;
  Cargo?: string; cargo?: string;
  Setor?: string; setor?: string;
  Turno?: string; turno?: string;
  "Salário"?: string; salario?: string;
};

const API_UPPER = "http://localhost:5000/Funcionarios";
const API_LOWER = "http://localhost:5000/funcionarios";

function getId(r: AnyRow) {
  return (typeof r.Id === "number" ? r.Id : r.id) as number | undefined;
}
function getNome(r: AnyRow) { return (r.Nome ?? r.nome ?? "") as string; }
function getCargo(r: AnyRow) { return (r.Cargo ?? r.cargo ?? "") as string; }
function getSetor(r: AnyRow) { return (r.Setor ?? r.setor ?? "") as string; }
function getTurno(r: AnyRow) { return (r.Turno ?? r.turno ?? "") as string; }
function getSalario(r: AnyRow) { return (r["Salário"] ?? r.salario ?? "") as string; }

export default function ListaFuncionario() {
  const [lista, setLista] = useState<AnyRow[]>([]);
  const [busca, setBusca] = useState("");
  const [base, setBase] = useState<string>(API_UPPER); // lembra qual endpoint funcionou

  const carregar = async () => {
    try {
      let r = await fetch(API_UPPER);
      if (!r.ok) {
        r = await fetch(API_LOWER);
        setBase(API_LOWER);
      } else {
        setBase(API_UPPER);
      }
      const data = await r.json();
      setLista(Array.isArray(data) ? data : []);
    } catch (e) {
      alert("Não foi possível carregar a lista. Rode: npm run backend");
      setLista([]);
    }
  };

  useEffect(() => { carregar(); }, []);

  const filtrados = useMemo(() => {
    const q = busca.toLowerCase();
    return lista.filter((f) =>
      getNome(f).toLowerCase().includes(q) ||
      getCargo(f).toLowerCase().includes(q) ||
      getSetor(f).toLowerCase().includes(q)
    );
  }, [lista, busca]);

  const excluir = async (id: number) => {
    if (!confirm("Tem certeza que deseja excluir este funcionário?")) return;

    // tenta com a base atual; se falhar, tenta a outra
    const outras = base === API_UPPER ? [API_UPPER, API_LOWER] : [API_LOWER, API_UPPER];
    try {
      let resp = await fetch(`${outras[0]}/${id}`, { method: "DELETE" });
      if (!resp.ok) {
        resp = await fetch(`${outras[1]}/${id}`, { method: "DELETE" });
      }
      if (resp.ok || resp.status === 404) {
        await carregar();
        return;
      }
      alert("Erro ao excluir. Confirme o nome da coleção no dados.json.");
    } catch {
      alert("Falha ao conectar ao backend (json-server).");
    }
  };

  return (
    <div className="max-w-5xl m-auto my-7">
      <h1 className="text-blue-800 text-center font-bold mb-8 text-3xl">
        Lista de Funcionários
      </h1>

      {/* Ações */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-4">
        <input
          className="border-2 border-gray-400 rounded-md p-2 w-full md:w-80"
          placeholder="Pesquisar por nome, cargo ou setor..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
        />

        <Link
          to="/formulario/incluir"
          className="bg-green-600 text-white font-semibold py-2 px-5 rounded-md hover:bg-green-700 transition text-center"
        >
          ➕ Inserir novo
        </Link>
      </div>

      {/* Tabela */}
      <div className="border-2 border-gray-400 rounded-md bg-white shadow-md overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="border-2 border-gray-400 p-2 text-left">Nome</th>
              <th className="border-2 border-gray-400 p-2 text-left">Cargo</th>
              <th className="border-2 border-gray-400 p-2 text-left">Setor</th>
              <th className="border-2 border-gray-400 p-2 text-left">Turno</th>
              <th className="border-2 border-gray-400 p-2 text-right">Salário</th>
              <th className="border-2 border-gray-400 p-2 text-right w-48">Ações</th>
            </tr>
          </thead>

        <tbody>
          {filtrados.map((f) => {
            const id = getId(f);
            return (
              <tr key={`${id}-${getNome(f)}`} className="hover:bg-gray-50">
                <td className="border-2 border-gray-400 p-2">{getNome(f)}</td>
                <td className="border-2 border-gray-400 p-2">{getCargo(f)}</td>
                <td className="border-2 border-gray-400 p-2">{getSetor(f)}</td>
                <td className="border-2 border-gray-400 p-2">{getTurno(f)}</td>
                <td className="border-2 border-gray-400 p-2 text-right">{getSalario(f)}</td>
                <td className="border-2 border-gray-400 p-2">
                  <div className="flex justify-end gap-2">
                    <Link
                      to={`/formulario/editar/${id}`}
                      className="bg-blue-600 text-white text-sm font-semibold py-2 px-4 rounded-md hover:bg-blue-700 transition"
                    >
                      Editar
                    </Link>
                    <button
                      onClick={() => id !== undefined && excluir(id)}
                      className="bg-red-600 text-white text-sm font-semibold py-2 px-4 rounded-md hover:bg-red-700 transition disabled:opacity-60"
                      disabled={id === undefined}
                    >
                      Excluir
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}

          {filtrados.length === 0 && (
            <tr>
              <td className="border-2 border-gray-400 p-6 text-center text-gray-600" colSpan={6}>
                Nenhum registro encontrado.
              </td>
            </tr>
          )}
        </tbody>

          <tfoot>
            <tr>
              <td className="border-2 border-gray-400 p-2 text-center bg-gray-100" colSpan={6}>
                Funcionários do Hospital
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}
