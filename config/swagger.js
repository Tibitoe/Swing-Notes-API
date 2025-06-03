import yaml from "js-yaml";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const mainDoc = yaml.load(
  fs.readFileSync(path.resolve(__dirname, "../docs/mainDocs.yaml"), "utf8")
);
const notesDoc = yaml.load(
  fs.readFileSync(path.resolve(__dirname, "../docs/notesDocs.yaml"), "utf8")
);
const authDoc = yaml.load(
  fs.readFileSync(path.resolve(__dirname, "../docs/authDocs.yaml"), "utf8")
);

const combinedSchemas = {
  ...(mainDoc.components?.schemas || {}),
  ...(notesDoc.components?.schemas || {}),
  ...(authDoc.components?.schemas || {}),
};

const combinedSecuritySchemes = {
  ...(mainDoc.components?.securitySchemes || {}),
  ...(notesDoc.components?.securitySchemes || {}),
  ...(authDoc.components?.securitySchemes || {}),
};

export const swaggerDocs = {
  ...mainDoc,
  paths: {
    ...mainDoc.paths,
    ...notesDoc.paths,
    ...authDoc.paths,
  },
  components: {
    schemas: combinedSchemas,
    securitySchemes: combinedSecuritySchemes,
  },
};
