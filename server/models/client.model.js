"use strict";

const { exec } = require("../database/connection");

const CUSTOMER_DATABASE = "clients";

const findClientsSqlRaw = (
  filters,
  filterKeys = ["name", "email", "phone"]
) => {
  const { conditions, params } = filterKeys.reduce(
    (acc, key) => ({
      ...acc,
      ...(filters && {
        params: [...(acc?.params ?? []), `%${filters}%`],
        conditions: [
          ...(acc?.conditions ?? []),
          `${key} ilike $${++acc.params.length}`,
        ],
      }),
    }),
    { conditions: [], params: [] }
  );

  const whereClause = `${
    conditions.length ? `WHERE ${conditions.join(" OR ")}` : ""
  }`;

  return {
    query: `SELECT id, name, email, phone, lat, lon FROM ${CUSTOMER_DATABASE} ${whereClause}`,
    params,
  };
};

const findOneClientByIdSqlRaw = (id) => ({
  query: `SELECT id, name, email, phone, lat, lon FROM ${CUSTOMER_DATABASE} WHERE id = $1 LIMIT 1`,
  params: [id],
});

const find = async (search) => {
  const { query, params } = findClientsSqlRaw(search);
  return await exec(query, params);
};

const findOneById = async (id) => {
  const { query, params } = findOneClientByIdSqlRaw(id);
  return await exec(query, params);
};

const createClientsSqlRaw = ({ name, email, phone, lat, lon }) => ({
  query: `
      INSERT INTO ${CUSTOMER_DATABASE} (name, email, phone, lat, lon) VALUES ($1, $2, $3, $4, $5) RETURNING *;
    `,
  params: [name, email, phone, lat, lon],
});

const create = async (data) => {
  const { query, params } = createClientsSqlRaw(data);
  return await exec(query, params);
};

const deleteClientsSqlRaw = (id) => ({
  query: `
      DELETE FROM ${CUSTOMER_DATABASE} WHERE id = $1;
    `,
  params: [id],
});

const deleteBy = async (id) => {
  const { query, params } = deleteClientsSqlRaw(id);
  return await exec(query, params);
};

const updateClientsSqlRaw = (id, { name, email, phone, lat, lon }) => ({
  query: `
      UPDATE ${CUSTOMER_DATABASE} SET name = $1, email = $2, phone = $3, lat = $4, lon = $5 WHERE id = $6 RETURNING *;
    `,
  params: [name, email, phone, lat, lon, id],
});

const updateBy = async (id, data) => {
  const { query, params } = updateClientsSqlRaw(id, data);
  return await exec(query, params);
};

module.exports = { find, findOneById, create, deleteBy, updateBy };
