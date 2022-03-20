export const getUniqueReferenceNumber = () => {
  return new Promise<string>((resolve) =>
    resolve(`${Math.floor(Math.random() * 1000)}`)
  );
};
