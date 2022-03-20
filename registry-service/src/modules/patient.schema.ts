import { z } from "zod";
import { buildJsonSchemas } from "fastify-zod";

import { dateInputValidator } from "../utils/date";

const address = {
  addressLineOne: z.string({
    required_error: "Address line one is required",
    invalid_type_error: "Address line one must be a string",
  }),
  addressLineTwo: z
    .string({
      required_error: "Address line two is required",
      invalid_type_error: "Address line two must be a string",
    })
    .optional(),
  city: z.string({
    required_error: "City one is required",
    invalid_type_error: "City must be a string",
  }),
  postcode: z.string({
    required_error: "Postcode line one is required",
    invalid_type_error: "Postcode line one must be a string",
  }),
};

const patientCore = {
  firstName: z.string({
    required_error: "First name is required",
    invalid_type_error: "First name must be a string",
  }),
  lastName: z.string({
    required_error: "Last name is required",
    invalid_type_error: "Last name must be a string",
  }),
  dateOfBirth: dateInputValidator,
  phoneNumber: z.string({
    required_error: "Phone number is required",
    invalid_type_error: "Phone number must be a string",
  }),
};

const createPatientSchema = z.object({ ...patientCore, ...address });

const patientSchema = z.object({
  ...patientCore,
  id: z.string(),
  patientIdentifier: z.string(),
  address: z.object({ ...address }),
  dateOfBirth: z.date(),
});

const allPatientsSchema = z.array(patientSchema);

const updatePatientSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  dateOfBirth: dateInputValidator.optional(),
  phoneNumber: z.string().optional(),
  addressLineOne: z.string().optional(),
  addressLineTwo: z.string().optional(),
  city: z.string().optional(),
  postcode: z.string().optional(),
});

export type GetPatientResponse = z.infer<typeof patientSchema>;
export type CreatePatientInput = z.infer<typeof createPatientSchema>;
export type UpdatePatientInput = z.infer<typeof updatePatientSchema>;
export type UpdatePatientResponse = z.infer<typeof patientSchema>;
export type DeletePatientResponse = z.infer<typeof patientSchema>;
export type Patient = z.infer<typeof patientSchema>;

export const { schemas: patientSchemas, $ref } = buildJsonSchemas({
  createPatientSchema,
  patientSchema,
  allPatientsSchema,
  updatePatientSchema,
});
