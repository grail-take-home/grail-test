import { FastifyReply, FastifyRequest } from "fastify";
import { getUniqueReferenceNumber } from "../mockIdServer";

import { formatPatient } from "../utils/patient";

import { CreatePatientInput, UpdatePatientInput } from "./patient.schema";
import {
  createPatient,
  deletePatient,
  getAllPatients,
  getPatient,
  updatePatient,
} from "./patient.service";

export const getAllPatientsHandler = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const patients = await getAllPatients();

    const formattedPatients = patients?.map((patient) =>
      formatPatient(patient)
    );
    return reply.code(200).send(formattedPatients || []);
  } catch (error) {
    return reply.code(500);
  }
};

export const getPatientHandler = async (
  request: FastifyRequest<{ Params: { patientId: string } }>,
  reply: FastifyReply
) => {
  try {
    const { patientId } = request.params;
    const patient = await getPatient(patientId);

    if (!patient) {
      return reply.code(404).send({
        message: `Failed to find patient with patientId: ${patientId}`,
      });
    }

    const formattedPatient = formatPatient(patient);
    return reply.code(200).send(formattedPatient);
  } catch (error) {
    return reply.code(500);
  }
};

export const registerPatientHandler = async (
  request: FastifyRequest<{ Body: CreatePatientInput }>,
  reply: FastifyReply
) => {
  try {
    // generate patient identifier from mock external service
    const patientIdentifier = await getUniqueReferenceNumber();

    const patient = {
      ...request.body,
      patientIdentifier,
    };

    const createdPatient = await createPatient(patient);
    const formattedPatient = formatPatient(createdPatient);

    return reply.code(201).send(formattedPatient);
  } catch (error) {
    return reply.code(500);
  }
};

export const updatePatientHandler = async (
  request: FastifyRequest<{
    Params: { patientId: string };
    Body: UpdatePatientInput;
  }>,
  reply: FastifyReply
) => {
  try {
    const { patientId } = request.params;
    const newPatientInfo = request.body;
    const patient = await getPatient(patientId);

    if (!patient) {
      return reply.code(404).send({
        message: `Failed to update patient with patientId: ${patientId}`,
      });
    }

    const updatedPatient = await updatePatient(patientId, newPatientInfo);
    const formattedPatient = formatPatient(updatedPatient);

    return reply.code(200).send(formattedPatient);
  } catch (error) {
    return reply.code(500);
  }
};

export const deletePatientHandler = async (
  request: FastifyRequest<{ Params: { patientId: string } }>,
  reply: FastifyReply
) => {
  try {
    const { patientId } = request.params;
    const patient = await getPatient(patientId);

    if (!patient) {
      return reply.code(404).send({
        message: `Failed to find patient with patientId: ${patientId}`,
      });
    }

    await deletePatient(patientId);
    return reply.code(204).send({});
  } catch (error) {
    return reply.code(500);
  }
};
