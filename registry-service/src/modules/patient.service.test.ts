import { Patient } from "@prisma/client";
import { prismaMock } from "../test-helpers/prisma-mock";

import { CreatePatientInput } from "./patient.schema";
import { createPatient } from "./patient.service";

describe("createPatient", () => {
  test("should create new patient ", async () => {
    const patientInput: CreatePatientInput & { patientIdentifier: string } = {
      patientIdentifier: "328",
      firstName: "John",
      lastName: "Doe",
      phoneNumber: "012345789",
      dateOfBirth: "2020-01-01",
      addressLineOne: "123 Main St",
      addressLineTwo: "Apt 1",
      city: "Anytown",
      postcode: "123456",
    };

    const patientResponse: Patient = {
      ...patientInput,
      id: "123",
      addressLineTwo: patientInput.addressLineTwo || null,
      dateOfBirth: new Date("2020-01-01"),
      createdAt: new Date("2019-01-01"),
      updatedAt: new Date("2021-01-01"),
    };

    prismaMock.patient.create.mockResolvedValue(patientResponse);

    await expect(createPatient(patientInput)).resolves.toEqual(patientResponse);
  });
});

// if more time would add more tests
