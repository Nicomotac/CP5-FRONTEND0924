import { Link } from "react-router-dom";

export	default function Menu(){
    return(
        <header className="Menu">
            <h1>Página Formulários HC - Hospital das Clínicas</h1>

            <nav>
                <Link to = {"/"}>Home</Link>
                
            </nav>
        </header>
    );
}