"use strict";

const ClientController = require("../controllers/client.controller");

const {
  validateCostumerCreateBody,
  validateCostumerUpdateBody,
} = require("../controllers/client.validate");

const DEFAULT_ROUTE = "/clients";

module.exports = (router) => {
  router.get(DEFAULT_ROUTE, ClientController.list);

  router.get(`${DEFAULT_ROUTE}/calculate-route`, ClientController.calculate);

  router.delete(`${DEFAULT_ROUTE}/:id`, ClientController.remove);

  router.put(
    `${DEFAULT_ROUTE}/:id`,
    [validateCostumerUpdateBody],
    ClientController.update
  );

  router.post(
    DEFAULT_ROUTE,
    [validateCostumerCreateBody],
    ClientController.create
  );

  router.get(`${DEFAULT_ROUTE}/:id`, ClientController.listOneById);

  return router;
};
