import React from "react";
import { Button, TextInput } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { useForm } from "@mantine/form";

import { Patient } from "../../models/Patient";

export interface FormFields {
  firstName: string;
  lastName: string;
  dateOfBirth: Date | null;
  phoneNumber: string;
  addressLineOne: string;
  addressLineTwo: string;
  city: string;
  postcode: string;
}

interface IPatientFormProps {
  initialPatient?: Patient;
  onSubmit: (values: FormFields, patientIdentifier?: string) => void;
}

export const PatientForm: React.FC<IPatientFormProps> = ({
  initialPatient,
  onSubmit,
}) => {
  const form = useForm<FormFields>({
    initialValues: {
      firstName: initialPatient?.firstName || "",
      lastName: initialPatient?.lastName || "",
      dateOfBirth: initialPatient?.dateOfBirth
        ? new Date(initialPatient?.dateOfBirth)
        : null,
      phoneNumber: initialPatient?.phoneNumber || "",
      addressLineOne: initialPatient?.address?.addressLineOne || "",
      addressLineTwo: initialPatient?.address?.addressLineTwo || "",
      city: initialPatient?.address?.city || "",
      postcode: initialPatient?.address?.postcode || "",
    },
  });

  return (
    <form
      onSubmit={form.onSubmit((values) =>
        onSubmit(values, initialPatient?.patientIdentifier)
      )}
      className="flex flex-col space-y-4"
    >
      <div className="grid grid-cols-2 gap-4">
        <TextInput
          placeholder="First name"
          label="First name"
          required
          {...form.getInputProps("firstName")}
        />
        <TextInput
          placeholder="Last name"
          label="Last name"
          required
          {...form.getInputProps("lastName")}
        />
      </div>

      <div className="grid grid-cols-2 gap-4 pb-2">
        <TextInput
          placeholder="Phone number"
          label="Phone number"
          required
          {...form.getInputProps("phoneNumber")}
        />
        <DatePicker
          placeholder="Date of birth"
          label="Date of birth"
          required
          {...form.getInputProps("dateOfBirth")}
        />
      </div>

      <TextInput
        placeholder="Address 1"
        label="Address 1"
        required
        {...form.getInputProps("addressLineOne")}
      />
      <TextInput
        placeholder="Address 2"
        label="Address 2"
        {...form.getInputProps("addressLineTwo")}
      />

      <div className="grid grid-cols-2 gap-4">
        <TextInput
          placeholder="City"
          label="City"
          required
          {...form.getInputProps("city")}
        />
        <TextInput
          placeholder="Post code"
          label="Post code"
          required
          {...form.getInputProps("postcode")}
        />
      </div>

      <div className="pt-4 w-full">
        <Button fullWidth type="submit">
          {Boolean(initialPatient) ? "Update" : "Register"} patient
        </Button>
      </div>
    </form>
  );
};
