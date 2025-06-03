import yaml from "js-yaml";
import fs from "fs";
import path from "path";

const mainDoc = yaml.load(
  fs.readFileSync(path.resolve("docs/mainDocs.yaml"), "utf8")
);
const notesDoc = yaml.load(
  fs.readFileSync(path.resolve("docs/notesDocs.yaml"), "utf8")
);
const authDoc = yaml.load(
  fs.readFileSync(path.resolve("docs/authDocs.yaml"), "utf8")
);

export const swaggerDocs = {
  ...mainDoc,
  paths: {
    ...mainDoc.paths,
    ...notesDoc.paths,
    ...authDoc.paths,
  },
  components: {
    schemas: {
      ...(notesDoc.components?.schemas || {}),
      ...(authDoc.components?.schemas || {}),
    },
  },
};
