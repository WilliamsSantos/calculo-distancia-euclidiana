"use strict";

/**
 * Calcula a distância euclidiana entre dois pontos geográficos.
 * @param {Object} pointA - O primeiro ponto, contendo propriedades `lat` e `lon`.
 * @param {Object} pointB - O segundo ponto, similar ao primeiro.
 * @returns {number} A distância euclidiana entre os dois pontos.
 */
const calculateDistance = (pointA, pointB) =>
  Math.sqrt(
    Math.pow(pointA.lat - pointB.lat, 2) + Math.pow(pointA.lon - pointB.lon, 2)
  );

/**
 * Encontra o índice do cliente mais próximo da localização atual.
 * @param {Object} currentLocation - A localização atual com propriedades `lat` e `lon`.
 * @param {Object[]} clientsToVisit - Array de clientes (com `lat` e `lon`) ainda não visitados.
 * @returns {number} Índice do cliente mais próximo no array `clientsToVisit`.
 */
const findClosestClientIndex = (currentLocation, clientsToVisit) =>
  clientsToVisit.reduce((closestIdx, client, idx) => {
    const distance = calculateDistance(currentLocation, client);
    const closestDistance =
      closestIdx === -1
        ? Infinity
        : calculateDistance(currentLocation, clientsToVisit[closestIdx]);
    return distance < closestDistance ? idx : closestIdx;
  }, -1);

/**
 * Calcula a rota ótima para visitar um conjunto de clientes, começando de um ponto específico.
 * @param {number} startX - Latitude do ponto de início.
 * @param {number} startY - Longitude do ponto de início.
 * @param {Object[]} clients - Array de objetos cliente, cada um com `lat` e `lon`.
 * @returns {Object[]} Rota ótima para visitar os clientes, na ordem de visitação.
 */
const calculateRoute = (startX, startY, clients) => {
  let route = [];
  let currentLocation = { lat: startX, lon: startY };
  let clientsToVisit = [...clients];

  while (clientsToVisit.length > 0) {
    const closestClientIndex = findClosestClientIndex(
      currentLocation,
      clientsToVisit
    );
    if (closestClientIndex === -1) break;

    const nextClient = clientsToVisit.splice(closestClientIndex, 1)[0];
    route.push(nextClient);
    currentLocation = nextClient;
  }

  return route;
};

module.exports = { calculateRoute };
