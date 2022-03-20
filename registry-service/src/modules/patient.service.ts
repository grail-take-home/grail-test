import { prisma } from "../utils/prisma";
import { CreatePatientInput, UpdatePatientInput } from "./patient.schema";

export const createPatient = (
  patientInput: CreatePatientInput & { patientIdentifier: string }
) => {
  return prisma.patient.create({
    data: { ...patientInput, dateOfBirth: new Date(patientInput.dateOfBirth) },
  });
};

export const getPatient = (patientIdentifier: string) => {
  return prisma.patient.findUnique({ where: { patientIdentifier } });
};

export const getAllPatients = () => {
  return prisma.patient.findMany();
};

export const deletePatient = (patientIdentifier: string) => {
  return prisma.patient.delete({ where: { patientIdentifier } });
};

export const updatePatient = (
  patientIdentifier: string,
  newPatientInfo: UpdatePatientInput
) => {
  return prisma.patient.update({
    where: { patientIdentifier },
    data: newPatientInfo,
  });
};
