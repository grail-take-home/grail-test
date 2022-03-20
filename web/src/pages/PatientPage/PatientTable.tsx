import React from "react";
import { Table } from "@mantine/core";

import { PatientRow } from "./PatientRow";
import { Patient } from "../../models/Patient";

interface IPatientTableProps {
  patients: Patient[];
  onPatientClick: (patient: Patient) => void;
}

export const PatientTable: React.FC<IPatientTableProps> = ({
  patients,
  onPatientClick,
}) => {
  return (
    <Table>
      <thead>
        <tr>
          <th>Patient Identifier</th>
          <th>Name</th>
          <th>Phone number</th>
          <th>City</th>
          <th>Edit patient</th>
        </tr>
      </thead>
      <tbody>
        {patients.map((patient) => (
          <PatientRow
            key={patient.id}
            patient={patient}
            onPatientClick={() => onPatientClick(patient)}
          />
        ))}
      </tbody>
    </Table>
  );
};
