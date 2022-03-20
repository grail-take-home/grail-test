import React from "react";
import { ActionIcon } from "@mantine/core";
import { Pencil1Icon } from "@modulz/radix-icons";

import { Patient } from "../../models/Patient";

interface IPatientRowProps {
  patient: Patient;
  onPatientClick: () => void;
}

export const PatientRow: React.FC<IPatientRowProps> = ({
  patient,
  onPatientClick,
}) => {
  return (
    <tr
      key={patient.id}
      className="cursor-pointer hover:bg-blue-50"
      onClick={onPatientClick}
    >
      <td>{patient.patientIdentifier}</td>
      <td>
        {patient.firstName} {patient.lastName}
      </td>
      <td>{patient.phoneNumber}</td>
      <td>{patient.address.city}</td>
      <td>
        <div className="flex items-center">
          <ActionIcon color="orange" title="Edit patient">
            <Pencil1Icon />
          </ActionIcon>
        </div>
      </td>
    </tr>
  );
};
