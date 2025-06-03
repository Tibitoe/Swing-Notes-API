import { executeQuery } from "../services/dbService.js";

const Notes = {
  getAll: async function (profileId) {
    const result = await executeQuery(
      `
        SELECT *
        FROM note
        WHERE profile_id = $1
    `,
      [profileId]
    );
    return result;
  },
  getById: async function (id, profileId) {
    const result = await executeQuery(
      `
        SELECT *
        FROM note
        WHERE id = $1 AND profile_id = $2
    `,
      [id, profileId]
    );

    return result[0];
  },
  create: async function (title, text, profileId) {
    const result = await executeQuery(
      `
        INSERT INTO note (title, text, profile_id) VALUES($1, $2, $3)
        RETURNING *;
    `,
      [title, text, profileId]
    );

    return result[0];
  },
  update: async function (id, title, text, profileId) {
    const result = await executeQuery(
      `
        UPDATE note
        SET title = $2, text = $3, modified_at = CURRENT_TIMESTAMP
        WHERE id = $1 AND profile_id = $4
        RETURNING *;
    `,
      [id, title, text, profileId]
    );

    return result[0];
  },
  delete: async function (id, profileId) {
    const result = await executeQuery(
      `
        DELETE FROM note
        WHERE id = $1 AND profile_id = $2
        RETURNING *;
    `,
      [id, profileId]
    );

    return result[0];
  },
  search: async function (searchTerm, profileId) {
    const result = await executeQuery(
      `
        SELECT *
        FROM note
        WHERE (title LIKE $1 OR text LIKE $1) AND profile_id = $2
    `,
      [`%${searchTerm}%`, profileId]
    );

    return result;
  },
};

export default Notes;
