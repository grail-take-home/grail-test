import { build } from "../server";
import {
  deleteAllMockPatients,
  getMockPatient,
} from "../test-helpers/dbquery-helpers";
import { createMockUser } from "../test-helpers/dbquery-helpers";
import { mockPatient, mockPatientInput } from "../test-helpers/mocks";

describe("patient controller", () => {
  const app = build();

  beforeAll(async () => {
    await deleteAllMockPatients();
    await app.ready();
  });

  afterAll(() => app.close());

  afterEach(async () => await deleteAllMockPatients());

  describe("getPatientHandler", () => {
    it("gets the correct user when a valid patientId is passed", async () => {
      const patientId = "123";
      const patient = mockPatient(patientId);
      const patientInput = mockPatientInput();

      await createMockUser({ ...patientInput, patientIdentifier: patientId });

      const response = await app.inject({
        method: "GET",
        url: `/api/patient/${patientId}`,
      });

      const { id, ...rest } = JSON.parse(response.body);

      expect(response.statusCode).toBe(200);
      expect(Boolean(id)).toBe(true);
      expect({
        ...rest,
        dateOfBirth: new Date(rest.dateOfBirth),
      }).toEqual(patient);
    });

    it("returns 404 and a message when the user does not exist", async () => {
      const patientId = "123";

      const response = await app.inject({
        method: "GET",
        url: `/api/patient/${patientId}`,
      });

      const { message } = JSON.parse(response.body);

      expect(response.statusCode).toBe(404);
      expect(message).toBe(
        `Failed to find patient with patientId: ${patientId}`
      );
    });
  });

  describe("getAllPatientsHandler", () => {
    it("returns an array of all users", async () => {
      const mockPatientIds = ["1", "2", "3"];
      const patientInput = mockPatientInput();

      // create 3 patients
      await Promise.all(
        mockPatientIds.map((id) =>
          createMockUser({ ...patientInput, patientIdentifier: id })
        )
      );

      const response = await app.inject({
        method: "GET",
        url: `/api/patient`,
      });

      const patients = JSON.parse(response.body);

      expect(response.statusCode).toBe(200);
      expect(patients).toHaveLength(mockPatientIds.length);
    });

    it("return an empty list when there are no users", async () => {
      const response = await app.inject({
        method: "GET",
        url: `/api/patient`,
      });

      const patients = JSON.parse(response.body);
      expect(patients).toEqual([]);
    });
  });

  describe("registerPatientHandler", () => {
    it("registers a patient successfully and assigns an id", async () => {
      const mockInput = mockPatientInput();

      const response = await app.inject({
        method: "POST",
        url: "/api/patient",
        headers: {
          ["content-type"]: "application/json",
        },
        payload: JSON.stringify(mockInput),
      });

      const { id, patientIdentifier, ...rest } = JSON.parse(response.body);
      expect(response.statusCode).toBe(201);
      expect(Boolean(id)).toBe(true);
      expect(Boolean(patientIdentifier)).toBe(true);

      const { patientIdentifier: mockPatientId, ...patient } = mockPatient("");
      expect({ ...rest, dateOfBirth: new Date(rest.dateOfBirth) }).toEqual(
        patient
      );
    });

    it("returns an error when the user does not provide a full patient", async () => {
      const mockInput = mockPatientInput();
      const { firstName, ...namelessInput } = mockInput;

      const response = await app.inject({
        method: "POST",
        url: "/api/patient",
        headers: {
          ["content-type"]: "application/json",
        },
        payload: JSON.stringify(namelessInput),
      });

      const { message } = JSON.parse(response.body);

      expect(response.statusCode).toBe(400);
      expect(message).toBe(`body should have required property 'firstName'`);
    });
  });

  describe("updatePatientHandler", () => {
    it("successfully updates a patient record", async () => {
      const patientId = "123";
      const patientInput = mockPatientInput();
      const updateName = { firstName: "newName" };

      await createMockUser({ ...patientInput, patientIdentifier: patientId });

      const response = await app.inject({
        method: "PATCH",
        url: `/api/patient/${patientId}`,
        headers: {
          ["content-type"]: "application/json",
        },
        payload: JSON.stringify(updateName),
      });

      const updatedPatient = JSON.parse(response.body);

      expect(response.statusCode).toBe(200);
      expect(updatedPatient.patientIdentifier).toBe(patientId);
      expect(updatedPatient.firstName).toBe(updateName.firstName);
    });

    it("returns 404 when trying to update a patient that does not exist", async () => {
      const patientId = "does-not-exist";
      const updateName = { firstName: "newName" };

      const response = await app.inject({
        method: "PATCH",
        url: `/api/patient/${patientId}`,
        headers: {
          ["content-type"]: "application/json",
        },
        payload: JSON.stringify(updateName),
      });

      const { message } = JSON.parse(response.body);

      expect(response.statusCode).toBe(404);
      expect(message).toBe(
        `Failed to update patient with patientId: ${patientId}`
      );
    });
  });

  describe("deletePatientHandler", () => {
    it("deletes a patient successfully", async () => {
      const patientId = "123";
      const patientInput = mockPatientInput();

      await createMockUser({ ...patientInput, patientIdentifier: patientId });

      const response = await app.inject({
        method: "DELETE",
        url: `/api/patient/${patientId}`,
      });

      expect(response.statusCode).toBe(204);

      const patient = await getMockPatient(patientId);
      expect(patient).toBeNull();
    });

    it("returns 404 when trying to delete a patient that does not exist", async () => {
      const patientId = "does-not-exist";

      const response = await app.inject({
        method: "DELETE",
        url: `/api/patient/${patientId}`,
      });

      const { message } = JSON.parse(response.body);

      expect(response.statusCode).toBe(404);
      expect(message).toBe(
        `Failed to find patient with patientId: ${patientId}`
      );
    });
  });
});
