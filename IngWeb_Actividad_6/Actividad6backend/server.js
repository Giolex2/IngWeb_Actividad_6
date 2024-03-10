require("dotenv").config();
const express = require("express");
const cors = require("cors");
const puerto = process.env.PORT || 3002;
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const uniminuto_api = express();
uniminuto_api.use(express.static("public"));
uniminuto_api.use(cors());
uniminuto_api.use("/api", require("./routes/estudiantes"));

const options = {
  definition: {
    openapi: "3.0.3",
    info: {
      title: "Uniminuto API con Swagger",
      version: "0.0.1",
      description:
        "Este es un ejemplo de CRUD hecho con el framework Express y documentado por Swagger",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
    },
    servers: [
      {
        url: "http://localhost:3002/api/",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const specs = swaggerJsdoc(options);
uniminuto_api.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(specs, {
    explorer: true,
    customCssUrl:
      "https://cdn.jsdelivr.net/npm/swagger-ui-themes@3.0.0/themes/3.x/theme-newspaper.css",
  })
);

uniminuto_api.listen(puerto, () => {
  console.log("Servidor escuchando en puerto %s", puerto);
});
