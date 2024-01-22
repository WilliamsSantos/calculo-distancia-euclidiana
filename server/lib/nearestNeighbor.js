"use strict";

const calculateDistance = (pointA, pointB) =>
  Math.sqrt(
    Math.pow(pointA.lat - pointB.lat, 2) + Math.pow(pointA.lon - pointB.lon, 2)
  );

const findClosestClientIndex = (currentLocation, clientsToVisit) =>
  clientsToVisit.reduce((closestIdx, client, idx) => {
    const distance = calculateDistance(currentLocation, client);
    const closestDistance =
      closestIdx === -1
        ? Infinity
        : calculateDistance(currentLocation, clientsToVisit[closestIdx]);
    return distance < closestDistance ? idx : closestIdx;
  }, -1);

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
