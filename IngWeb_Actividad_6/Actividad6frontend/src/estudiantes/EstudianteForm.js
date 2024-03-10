import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

export function EstudianteForm() {
  
  const [estudiante, setEstudiante] = useState({
    documento: "",
    nombre: "",
    apellido: "",
    pais_id: ""
  });

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      cargarDatosEstudiante(id);
    }
  }, [id]);

  const cargarDatosEstudiante = async (id) => {
    const url = `http://localhost:3002/api/estudiantes/${id}`;
    try {
      const response = await axios.get(url);
      setEstudiante(response.data); 
    } catch (error) {
      console.error("Error al cargar datos del estudiante:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEstudiante({ ...estudiante, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response;
      if (id) {
        response = await axios.put(`http://localhost:3002/api/estudiantes/${id}`, estudiante);
      } else {
        response = await axios.post("http://localhost:3002/api/estudiantes/", estudiante);
      }
      console.log("Respuesta del servidor:", response.data);
      navigate('/estudiantes'); 
    } catch (error) {
      console.error("Error al enviar datos:", error);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="documento">
        <Form.Label>Documento</Form.Label>
        <Form.Control
          type="text"
          name="documento"
          value={estudiante.documento}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group controlId="nombre">
        <Form.Label>Nombre</Form.Label>
        <Form.Control
          type="text"
          name="nombre"
          value={estudiante.nombre}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group controlId="apellido">
        <Form.Label>Apellido</Form.Label>
        <Form.Control
          type="text"
          name="apellido"
          value={estudiante.apellido}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group controlId="pais_id">
        <Form.Label>País</Form.Label>
        <Form.Control
          as="select"
          name="pais_id"
          value={estudiante.pais_id}
          onChange={handleChange}
        >
          {}
          <option value="">Seleccione un país</option>
          <option value="1">Colombia</option>
          <option value="2">Peru</option>
          <option value="3">Chile</option>
          <option value="4">Brasil</option>
          <option value="5">Canada</option>
          <option value="6">Venezuela</option>
          {/* agregar más opciones según los países registrados  en BD */}
        </Form.Control>
      </Form.Group>

      <Button variant="primary" type="submit">
        {id ? "Actualizar" : "Crear"}
      </Button>
    </Form>
  );
}
