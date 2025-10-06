import { Outlet } from "react-router-dom";
import Menu from "./Components/Menu";
import Rodape from "./Components/Rodape";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-slate-50 via-white to-slate-100 text-slate-900">
      <Menu />
      <main className="flex-1">
        <div className="mx-auto max-w-6xl px-4 py-8">
          <Outlet />
        </div>
      </main>
      <Rodape />
    </div>
  );
}


