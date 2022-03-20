import { Patient } from "@prisma/client";

export const formatPatient = (patient: Patient) => {
  const address = {
    addressLineOne: patient.addressLineOne,
    addressLineTwo: patient.addressLineTwo,
    city: patient.city,
    postcode: patient.postcode,
  };
  return {
    id: patient.id,
    patientIdentifier: patient.patientIdentifier,
    firstName: patient.firstName,
    lastName: patient.lastName,
    dateOfBirth: patient.dateOfBirth,
    phoneNumber: patient.phoneNumber,
    address,
  };
};
