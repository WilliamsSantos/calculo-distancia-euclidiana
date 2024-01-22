"use strict";

const { body } = require("express-validator");
const validate = require("../middlewares/validationMiddleware");

const validateCostumerCreateBody = validate([
  body("name")
    .notEmpty()
    .withMessage("Nome é Obrigatório")
    .isLength({ min: 2 })
    .withMessage("Nome deve ter no mínimo 2 letras"),
  body("email")
    .notEmpty()
    .withMessage("Email é obrigatório")
    .isEmail()
    .withMessage("Email inválido"),
  body("phone")
    .notEmpty()
    .withMessage("Telefone é obrigatório")
    .isNumeric({ min: 11 })
    .withMessage(
      "Telefone deve conter apenas número e seguir formato com DD:(exemplo: 21987588562) respeitando 11 números"
    ),
  body("lat").notEmpty().isNumeric(),
  body("lon").notEmpty().isNumeric(),
]);

const validateCostumerUpdateBody = validate([
  body("name")
    .optional()
    .isLength({ min: 2 })
    .withMessage("Nome deve ter no mínimo 2 letras"),
  body("email")
    .optional()
    .isEmail()
    .withMessage("Email inválido"),
  body("phone")
    .optional()
    .isNumeric({ min: 11 })
    .withMessage(
      "Telefone deve conter apenas número e seguir formato com DD:(exemplo: 21987588562) respeitando 11 números"
    ),
  body("lat").optional().isNumeric(),
  body("lon").optional().isNumeric(),
]);

module.exports = {
  validateCostumerCreateBody,
  validateCostumerUpdateBody,
};
