import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import { EstudianteForm } from "./estudiantes/EstudianteForm";
import { ListadoEstudiantes } from "./estudiantes/ListadoEstudiantes";
import { Footer } from "./layout/Footer";
import { Header } from "./layout/Header";
import { Nav } from "./layout/Nav";
export function App() {
  return (
    <Router>
      <div className="app-container">
        <Header />
        <Nav />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<ListadoEstudiantes />} />
            <Route path="/estudiante" element={<EstudianteForm />} />
            <Route path="/estudiante/:documento_identidad" element={<EstudianteForm />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;