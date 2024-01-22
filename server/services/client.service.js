"use strict";

const NearestNeighbor = require("../lib/nearestNeighbor");
const ClientModel = require("../models/client.model");

const findAll = async ({ query }) => {
  const { search } = query ?? {};

  const [result, errors] = await ClientModel.find(search);

  if (errors) {
    throw new Error(errors);
  }

  return result;
};

const store = async ({ body }) => {
  const [[created], errors] = await ClientModel.create(body);

  if (errors || !created) {
    throw new Error(errors ? errors : "Fail to create customer");
  }

  return created;
};

const calculateOptimizedRoute = async ({ query }) => {
  const [clients, errors] = await ClientModel.find();

  if (errors) {
    throw new Error("No customers found");
  }

  const { lon = 0, lat = 0 } = query ?? {};

  return NearestNeighbor.calculateRoute(lon, lat, clients);
};

const getOneById = async ({ params }) => {
  const { id } = params ?? {};

  const [[result], errors] = await ClientModel.findOneById(id);

  if (errors) {
    throw new Error(errors);
  }

  return result;
};

const removeClient = async ({ params }) => {
  const { id } = params ?? {};

  const [result, errors] = await ClientModel.deleteBy(id);

  if (errors) {
    throw new Error(errors);
  }

  return result;
};

const updateClient = async ({ params, body }) => {
  const clientFound = await getOneById({ params });

  const { id, ...restClient } = clientFound;

  const clientToUpdate = {
    ...restClient,
    ...body,
  };

  const [result, errors] = await ClientModel.updateBy(id, clientToUpdate);

  if (errors) {
    throw new Error(errors);
  }

  return result[0];
};

module.exports = {
  getOneById,
  findAll,
  store,
  removeClient,
  updateClient,
  calculateOptimizedRoute,
};
