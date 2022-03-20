export const mockPatient = (patientIdentifier: string) => {
  return {
    patientIdentifier,
    firstName: "John",
    lastName: "Doe",
    phoneNumber: "012345789",
    dateOfBirth: new Date("2020-01-01"),
    address: {
      addressLineOne: "123 Main St",
      addressLineTwo: "Apt 1",
      city: "Anytown",
      postcode: "123456",
    },
  };
};

export const mockPatientInput = () => {
  return {
    firstName: "John",
    lastName: "Doe",
    phoneNumber: "012345789",
    dateOfBirth: "2020-01-01",
    addressLineOne: "123 Main St",
    addressLineTwo: "Apt 1",
    city: "Anytown",
    postcode: "123456",
  };
};
