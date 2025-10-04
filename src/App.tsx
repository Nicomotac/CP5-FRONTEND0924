import { Outlet } from "react-router-dom";
import Menu from "./Components/Menu";
import Rodape from "./Components/Rodape";

export default function App() {

return(
  <>
	<Menu/>
	<Outlet/>
	<Rodape/>
  </>
)

}
