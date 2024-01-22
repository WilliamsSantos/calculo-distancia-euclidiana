"use strict";

const HTTP_OK = 200;
const HTTP_ERROR = 500;
const HTTP_CREATED = 201;

const success =
  (res) =>
  (data, status = HTTP_OK) =>
    res.status(status).send({ success: true, data });

const create =
  (res) =>
  (data, status = HTTP_CREATED) =>
    res.status(status).send({ success: true, data });

const error =
  (res) =>
  (message, status = HTTP_ERROR) =>
    res.status(status).send({ success: false, message });

module.exports = (res) => ({
  responseOk: success(res),
  responseError: error(res),
  responseCreated: create(res),
});
