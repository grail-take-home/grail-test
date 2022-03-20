import { FastifyInstance } from "fastify";

import {
  deletePatientHandler,
  getAllPatientsHandler,
  getPatientHandler,
  registerPatientHandler,
  updatePatientHandler,
} from "./patient.controller";
import { $ref } from "./patient.schema";

export const patientRoutes = async (server: FastifyInstance) => {
  server.get(
    "/",
    {
      schema: {
        response: { 200: $ref("allPatientsSchema") },
      },
    },
    getAllPatientsHandler
  );

  server.get(
    "/:patientId",
    {
      schema: {
        response: { 200: $ref("patientSchema") },
      },
    },
    getPatientHandler
  );

  server.post(
    "/",
    {
      schema: {
        body: $ref("createPatientSchema"),
        response: { 201: $ref("patientSchema") },
      },
    },
    registerPatientHandler
  );

  server.patch(
    "/:patientId",
    {
      schema: {
        body: $ref("updatePatientSchema"),
        response: { 200: $ref("patientSchema") },
      },
    },
    updatePatientHandler
  );

  server.delete("/:patientId", deletePatientHandler);
};
