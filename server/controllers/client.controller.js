"use strict";

const request = require("../serverHandler");
const ClientService = require("../services/client.service");

const list = async (req, res) => {
  const { responseOk, responseError } = request(res);
  try {
    const clients = await ClientService.findAll(req);
    responseOk(clients);
  } catch (error) {
    responseError(error.message);
  }
};

const listOneById = async (req, res) => {
  const { responseOk, responseError } = request(res);
  try {
    const client = await ClientService.getOneById(req);
    responseOk(client);
  } catch (error) {
    responseError(error.message);
  }
};

const create = async (req, res) => {
  const { responseCreated, responseError } = request(res);
  try {
    const customers = await ClientService.store(req);
    responseCreated(customers);
  } catch (error) {
    responseError(error.message);
  }
};

const calculate = async (req, res) => {
  const { responseOk, responseError } = request(res);
  try {
    const optimizedCalculation = await ClientService.calculateOptimizedRoute(
      req
    );
    responseOk(optimizedCalculation);
  } catch (error) {
    responseError(error.message);
  }
};

const remove = async (req, res) => {
  const { responseOk, responseError } = request(res);
  try {
    const removedClient = await ClientService.removeClient(
      req
    );
    responseOk(removedClient);
  } catch (error) {
    responseError(error.message);
  }
};

const update = async (req, res) => {
  const { responseOk, responseError } = request(res);
  try {
    const removedClient = await ClientService.updateClient(
      req
    );
    responseOk(removedClient);
  } catch (error) {
    responseError(error.message);
  }
};

module.exports = { list, create, remove, update, calculate, listOneById };
