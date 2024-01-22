import request from "../../libs/requests";

const DEFAULT_ROUTER = "/clients";

const listClients = (search) =>
  request
    .get(DEFAULT_ROUTER, { ...(search && { params: { search } }) })
    .then(({ data }) => data)
    .catch(({ message }) => {
      alert("There was an erro listing the clients:" + message);
    });

const createClient = ({ name, email, phone, lat, lon }) =>
  request
    .post(
      DEFAULT_ROUTER,
      { name, email, phone, lat, lon },
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    )
    .then(({ data }) => data)
    .catch(({ message }) => {
      alert("There was an error creating the client:" + message);
    });

const calculateRoutes = () =>
  request
    .get(`${DEFAULT_ROUTER}/calculate-route`)
    .then(({ data }) => data)
    .catch(({ message }) => {
      alert("Calculate route fails:" + message);
    });

const getClientById = (id) =>
  request
    .get(`${DEFAULT_ROUTER}/${id}`)
    .then(({ data }) => data)
    .catch(({ message }) => {
      alert("Get Client fails:" + message);
    });

const deleteClient = (id) =>
  request
    .delete(`${DEFAULT_ROUTER}/${id}`)
    .then(({ data }) => data)
    .catch(({ message }) => {
      alert("Delete Client fails:" + message);
    });

const updateClientById = (id, { name, email, phone, lat, lon }) =>
  request
    .put(
      `${DEFAULT_ROUTER}/${id}`,
      { name, email, phone, lat, lon },
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    )
    .then(({ data }) => data)
    .catch(
      ({
        response: {
          data: { message },
        },
      }) => {
        alert("Update Client fails:" + message);
      }
    );

export {
  getClientById,
  updateClientById,
  listClients,
  createClient,
  deleteClient,
  calculateRoutes,
};
