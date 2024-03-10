const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const baseDatos = require("../basededatos");

/**
 * @swagger
 * components:
 *   schemas:
 *     Estudiante:
 *       type: object
 *       required:
 *         - documento
 *         - nombre
 *         - apellido
 *         - pais_id
 *       properties:
 *         id:
 *           type: string
 *           description: El valor autogenerado de un estudiante
 *         documento:
 *           type: string
 *           description: El documento asociado a un estudiante
 *         nombre:
 *           type: string
 *           description: El nombre de un estudiante
 *         apellido:
 *           type: string
 *           description: El apellido de un estudiante
 *         pais_id:
 *           type: string
 *           description: El id del pais que pertenece el estudiante
 *       example:
 *         documento: 3423423
 *         nombre: Lorena 
 *         apellido: Diaz
 *         pais_id: 1
 */

/**
 * @swagger
 * tags:
 *   name: Estudiantes
 *   description: Estudiantes API
 * /estudiantes:
 *   get:
 *     summary: Obtener todos los estudiantes
 *     tags: [Estudiantes]
 *     responses:
 *       200:
 *         description: Listado de estudiantes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Estudiante'
 *   post:
 *     summary: Crear un nuevo estudiante
 *     tags: [Estudiantes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Estudiante'
 *     responses:
 *       200:
 *         description: El estudiante creado.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Estudiante'
 *       500:
 *         description: Error al crear estudiante
 * /estudiantes/{id}:
 *   get:
 *     summary: Obtener el estudiante por id
 *     tags: [Estudiantes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: El id del estudiante
 *     responses:
 *       200:
 *         description: La respuesta del estudiante por id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Estudiante'
 *       404:
 *         description: El estudiante no fue encontrado
 *   put:
 *    summary: Actualizar el estudiante por el id
 *    tags: [Estudiante]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *        description: El id del estudiante
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Estudiante'
 *    responses:
 *      200:
 *        description: El estudiate fue actualizado
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Estudiante'
 *      404:
 *        description: El estudiante no fue encontrado
 *      500:
 *        description: Some error happened
 *   delete:
 *     summary: Eliminar el estudiante por id
 *     tags: [Estudiantes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: El id del estudiante
 *
 *     responses:
 *       200:
 *         description: El estudiante fue eliminado
 *       404:
 *         description: El estudiante no fue encontrado
 */

router.get("/estudiantes", (req, res, next) => {
  var sql = "select * from estudiante";
  var params = [];
  baseDatos.all(sql, params, (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: rows,
    });
  });
});

router.post("/estudiantes/", bodyParser.json(), (req, res, next) => {
  var errors = [];

  var data = {
    documento: req.body.documento,
    nombre: req.body.nombre,
    apellido: req.body.apellido,
    pais_id: req.body.pais_id,
  };

  var sql =
    "INSERT INTO estudiante (documento, nombre, apellido, pais_id) VALUES (?,?,?,?)";
  var params = [data.documento, data.nombre, data.apellido, data.pais_id];
  baseDatos.run(sql, params, function (err, result) {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: data,
      id: this.lastID,
    });
  });
});

router.get("/estudiantes/:id", (req, res, next) => {
  var sql = "select * from estudiante where id = ?";
  var params = [req.params.id];
  baseDatos.get(sql, params, (err, row) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: row,
    });
  });
});

router.delete("/estudiantes/:id", (req, res, next) => {
  baseDatos.run(
    "DELETE FROM estudiante WHERE id = ?",
    req.params.id,
    function (err, result) {
      if (err) {
        res.status(400).json({ error: res.message });
        return;
      }
      res.json({ message: "deleted", changes: this.changes });
    }
  );
});

router.put("/estudiantes/:id", bodyParser.json(), (req, res) => {
  var data = {
    documento: req.body.documento,
    nombre: req.body.nombre,
    apellido: req.body.apellido,
    pais_id: req.body.pais_id,
  };

  baseDatos.run(
    `UPDATE estudiante set 
         documento = COALESCE(?,documento), 
         nombre = COALESCE(?,nombre), 
         apellido = COALESCE(?,apellido),
         pais_id = COALESCE(?,pais_id) 
         WHERE id = ?`,
    [data.documento, data.nombre, data.apellido, data.pais_id, req.params.id],
    function (err, result) {
      if (err) {
        res.status(400).json({ error: res.message });
        return;
      }
      res.json({
        message: "success",
        data: data,
        changes: this.changes,
      });
    }
  );
});

module.exports = router;
