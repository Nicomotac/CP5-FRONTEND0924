import React, { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"

type TypeNovo = {
  id: number;
  nome: string;
  cargo: string;
  setor: string;
  turno: string;
  salario: number;
}

export default function FormularioFuncionario(){

const {id} = useParams()

const navegacao = useNavigate()

const [novo, setNovo] = useState<TypeNovo>({
    id: 0,
    nome: "",
    cargo: "",
    setor: "",
    turno: "",
    salario: 0,
})

let metodo: string = "POST"

if(id) metodo = "PUT"

const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setNovo({...novo,[name]:value})
}

const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const funcionario = { ...novo, cargo: String(novo.cargo), setor: String(novo.setor), turno:String(novo.turno), salario:Number(novo.salario)}

    fetch(`http://localhost:5000/funcionario/${id ? id : ""}`, {
        method:metodo,
        headers:{"Content-Type":"Aplication/json"},
        body: JSON.stringify(funcionario)
    })
    .then(()=>navegacao('/'))
    .catch(error=>console.log(error))
}

    useEffect(() =>{
        if(id){
            fetch(`http://localhost:5000/funcionario/${id}`)
            .then(resp => resp.json())
            .then(data => setNovo(data))
            .catch(error=> console.log(error))
        }



    },[id])


return (
  <div className="max-w-2xl m-auto my-7">
    <h1 className="text-blue-800 text-center font-bold mb-8 text-5xl">
      Formulário de Funcionários
    </h1>

    <form
      className="border-2 border-gray-400 rounded-md p-4"
      onSubmit={handleSubmit}
    >
      <input
        className="border-2 border-gray-400 rounded-md p-2 w-full mb-1"
        type="text"
        name="nome"
        value={novo.nome}
        placeholder="Nome"
        onChange={handleChange}
      />
      <br />

      <input
        className="border-2 border-gray-400 rounded-md p-2 w-full mb-1"
        type="text"
        name="cargo"
        value={novo.cargo}
        placeholder="Cargo"
        onChange={handleChange}
      />
      <br />

      <input
        className="border-2 border-gray-400 rounded-md p-2 w-full mb-1"
        type="text"
        name="setor"
        value={novo.setor}
        placeholder="Setor"
        onChange={handleChange}
      />
      <br />

      <input
        className="border-2 border-gray-400 rounded-md p-2 w-full mb-1"
        type="text"
        name="turno"
        value={novo.turno}
        placeholder="Turno"
        onChange={handleChange}
      />
      <br />

      <input
        className="border-2 border-gray-400 rounded-md p-2 w-full mb-1"
        type="number"
        name="salario"
        value={novo.salario}
        placeholder="Salário"
        onChange={handleChange}
        step={0.01}
      />
      <br />

      <button
        className="bg-green-500 text-white font-bold py-2 px-4 rounded-md mr-3"
        type="submit"
      >
        Enviar
      </button>

      <Link
        className="bg-red-500 text-white font-bold py-2 px-4 rounded-md"
        to="/"
      >
        Cancelar
      </Link>
    </form>
  </div>
);









}