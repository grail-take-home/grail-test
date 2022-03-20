import { API_URL } from "../config";

import { GlobalFetch } from "./GlobalFetch";
import { FormFields } from "../pages/PatientPage/PatientForm";
import { Patient } from "../models/Patient";

class PatientService {
  async getAll(): Promise<Patient[]> {
    return GlobalFetch({
      url: `${API_URL}/api/patient`,
    });
  }

  async register(patientInput: FormFields): Promise<Patient> {
    return GlobalFetch({
      url: `${API_URL}/api/patient`,
      method: "POST",
      body: patientInput,
    });
  }

  async update(
    patientId: string,
    patientUpdate: Partial<FormFields>
  ): Promise<Patient> {
    return GlobalFetch({
      url: `${API_URL}/api/patient/${patientId}`,
      method: "PATCH",
      body: patientUpdate,
    });
  }
}

export const patientService = new PatientService();
