import { prisma } from "../utils/prisma";
import { CreatePatientInput } from "../modules/patient.schema";

export const createMockUser = (
  patient: CreatePatientInput & { patientIdentifier: string }
) => {
  try {
    return prisma.patient.create({
      data: {
        ...patient,
        dateOfBirth: new Date(patient.dateOfBirth),
      },
    });
  } catch (error) {
    console.error(error);
  }
};

export const deleteAllMockPatients = () => {
  return prisma.patient.deleteMany({});
};

export const getMockPatient = (patientIdentifier: string) => {
  return prisma.patient.findFirst({
    where: { patientIdentifier },
  });
};
