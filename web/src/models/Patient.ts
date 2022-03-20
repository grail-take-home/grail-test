export interface Patient {
  id: string;
  patientIdentifier: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  dateOfBirth: Date;
  address: {
    addressLineOne: string;
    addressLineTwo: string;
    city: string;
    postcode: string;
  };
}
