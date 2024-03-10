import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export function ListadoEstudiantes() {
  const navigate = useNavigate();
  const [estudiantes, setEstudiantes] = useState([]);

  // Mapeo de pais_id a nombres de países
  const paises = {
    1: 'Colombia',
    2: 'Peru',
    3: 'Chile',
    4: 'Brasil',
    5: 'Canada',
    6: 'Venezuela',
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3002/api/estudiantes/');
        const estudiantesConPais = response.data.data.map(estudiante => ({
          ...estudiante,
          pais: paises[estudiante.pais_id] || 'Desconocido',
        }));
        setEstudiantes(estudiantesConPais);
      } catch (error) {
        console.error("Error al obtener estudiantes:", error);
      }
    };

    fetchData();
  }, []);

  const handleEliminar = async (id) => {
    try {
      await axios.delete(`http://localhost:3002/api/estudiantes/${id}`);
      const nuevosEstudiantes = estudiantes.filter(est => est.id !== id);
      setEstudiantes(nuevosEstudiantes); // Actualizamos el estado después de la eliminación.
    } catch (error) {
      console.error("Error al eliminar estudiante:", error);
    }
  };

  // Asegúrate de que la ruta a la que estás redirigiendo existe en tu configuración de React Router.
  const handleActualizar = (id) => {
    navigate(`/estudiante/editar/${id}`); // Cambia esta ruta por la correcta según tu aplicación.
  };

  return (
    <div className="container mt-3">
      <div className="mb-3">
        <Link to="/estudiante/nuevo">
          <button className="btn btn-success">Agregar Estudiante</button>
        </Link>
      </div>
      <table className="table table-bordered">
        <thead className="table-dark">
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Documento</th>
            <th scope="col">Nombre</th>
            <th scope="col">Apellido</th>
            <th scope="col">País</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {estudiantes.map(estudiante => (
            <tr key={estudiante.id}>
              <td>{estudiante.id}</td>
              <td>{estudiante.documento}</td>
              <td>{estudiante.nombre}</td>
              <td>{estudiante.apellido}</td>
              <td>{estudiante.pais}</td>
              <td>
                {/* Utilizamos un botón o enlace para llamar a handleActualizar */}
                <button className="btn btn-primary mr-2" onClick={() => handleActualizar(estudiante.id)}>
                  Actualizar
                </button>
                <button className="btn btn-danger" onClick={() => handleEliminar(estudiante.id)}>
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
