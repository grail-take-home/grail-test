import { build } from "./server";

const PORT = 5000;

export const server = build();

const main = async () => {
  try {
    await server.listen(PORT, "0.0.0.0");
    console.log(`Server ready at http://localhost:${PORT}`);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

main();
