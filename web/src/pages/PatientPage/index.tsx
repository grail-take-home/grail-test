import React from "react";
import { Button, Modal, Text, Title } from "@mantine/core";
import { FormFields, PatientForm } from "./PatientForm";

import { Layout } from "../../components/Layout";
import { PatientTable } from "./PatientTable";
import { SearchBar } from "../../components/SearchBar";
import { patientService } from "../../services/PatientService";
import { Patient } from "../../models/Patient";

export const PatientPage: React.FC = () => {
  const [searchValue, setSearchValue] = React.useState("");
  const [registerModalOpen, setRegisterModalOpen] = React.useState(false);
  const [selectedPatient, setSelectedPatient] = React.useState<any>();
  const patientModalOpen = Boolean(selectedPatient);
  const [patients, setPatients] = React.useState<Patient[]>([]);

  const getAllPatients = async () => {
    const patients = await patientService.getAll();
    setPatients(patients);
  };

  React.useEffect(() => {
    getAllPatients();
  }, []);

  const onPatientClick = (patient: Patient) => setSelectedPatient(patient);

  const onRegisterPatient = async (patientInput: FormFields) => {
    const registeredPatient = await patientService.register(patientInput);
    setPatients((current) => [registeredPatient, ...current]);
    setRegisterModalOpen(false);
  };

  const onEditPatient = async (
    patientInput: Partial<FormFields>,
    patientIdentifier: string
  ) => {
    const updatedPatient = await patientService.update(
      patientIdentifier,
      patientInput
    );

    // update patient in state
    setPatients((currentPatients) =>
      currentPatients.map((patient) => {
        if (patient.patientIdentifier === patientIdentifier) {
          return {
            ...patient,
            ...updatedPatient,
          };
        }
        return patient;
      })
    );

    setSelectedPatient(undefined);
  };

  const filteredPatients =
    patients?.filter((patient) =>
      patient.patientIdentifier
        .toLowerCase()
        .includes(searchValue.toLowerCase())
    ) || [];
  const isPatients = filteredPatients?.length > 0;

  return (
    <Layout>
      <div className="pb-12">
        <section className="flex justify-between mb-4 items-center mt-12">
          <Title order={2}>Patient management</Title>
          <Button onClick={() => setRegisterModalOpen(true)}>
            Register Patient
          </Button>
        </section>

        <section className="flex bg-white p-4 flex-col space-y-6">
          <SearchBar
            value={searchValue}
            onChange={(value) => setSearchValue(value)}
            disabled={patients?.length === 0}
          />
          <main>
            {isPatients ? (
              <PatientTable
                patients={filteredPatients}
                onPatientClick={onPatientClick}
              />
            ) : (
              <div>
                <Text>Please register some patients to view them here</Text>
              </div>
            )}
          </main>
        </section>
      </div>

      <Modal
        opened={registerModalOpen}
        onClose={() => setRegisterModalOpen(false)}
        size="lg"
        title="Register Patient"
      >
        <PatientForm onSubmit={onRegisterPatient} />
      </Modal>

      <Modal
        opened={patientModalOpen}
        onClose={() => setSelectedPatient(false)}
        size="lg"
        title={`Editing patient: ${selectedPatient?.patientIdentifier || ""}`}
      >
        <PatientForm
          initialPatient={selectedPatient}
          onSubmit={onEditPatient}
        />
      </Modal>
    </Layout>
  );
};
