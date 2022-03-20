import Fastify from "fastify";

import { patientRoutes } from "./modules/patient.route";
import { patientSchemas } from "./modules/patient.schema";

export const build = (opts = {}) => {
  const app = Fastify(opts);

  // register all schemas
  for (const schema of patientSchemas) {
    app.addSchema(schema);
  }

  app.register(import("fastify-cors"), () => {
    return (req: any, callback: any) => {
      const corsOptions = {
        origin: "http://localhost:3000",
        methods: ["GET", "POST", "DELETE", "PATCH", "OPTIONS"],
        credentials: true,
      };
      callback(null, corsOptions);
    };
  });

  app.get("/healthcheck", async () => {
    return { status: "ok" };
  });

  app.register(patientRoutes, { prefix: "api/patient" });

  return app;
};
