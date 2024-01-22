import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import RouteModal from "./routeModal";
import * as ClientService from "./services";
import "./css/list.css";

const ClientList = () => {
  const navigate = useNavigate();
  const [clients, setClients] = useState([]);
  const [route, setRoute] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const deleteClient = async (client_id) => {
    if (window.confirm("Deseja Realmente Excluir?")) {
      await ClientService.deleteClient(client_id);
      await fetchData();
    }
  };

  const updateClient = async (client_id) => {
    navigate(`/client/${client_id}/edit`);
  };

  async function fetchData() {
    const clientList = await ClientService.listClients(
      searchTerm?.toLowerCase()
    );

    if (clientList.success) {
      const { data: clients } = clientList ?? {};
      setClients(clients);
    }
  }

  const openModal = async () => {
    const calculated = await ClientService.calculateRoutes();
    if (calculated) {
      setRoute(calculated.data);
      setIsModalOpen(true);
    }
  };

  const redirectViewPage = (client_id) => {
    navigate(`/client/${client_id}`);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    fetchData();
  }, [searchTerm]);

  return (
    <div className="client-list-container">
      <div className="client-search-container">
        <input
          type="text"
          className="client-search-input"
          placeholder="Pesquisar clientes..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
      {clients.length ? (
        <table className="client-list-table">
          <thead>
            <tr>
              <th>Nome</th>
              <th>E-Mail</th>
              <th>Telefone</th>
              <th className="text-center" colSpan={3}>
                Opções
              </th>
            </tr>
          </thead>
          <tbody>
            {clients.map((client) => (
              <tr key={client.id}>
                <td className="text-center">{client.name} </td>
                <td className="text-center">{client.email}</td>
                <td className="text-center"> {client.phone}</td>
                <td
                  onClick={() => updateClient(client.id)}
                  className="text-center btn-view"
                  title="Editar"
                >✍🏼</td>
                <td
                  onClick={() => redirectViewPage(client.id)}
                  className="text-center btn-view"
                  title="Visualizar"
                >🔍</td>
                <td
                  onClick={() => deleteClient(client.id)}
                  className="text-center btn-danger"
                  title="Excluir"
                >🗑️</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="no-clients-message">Nenhum Cliente Encontrado</p>
      )}
      <button className="btn btn-large" onClick={openModal}>
        Ver Rota de Visitação
      </button>
      <RouteModal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        route={route}
      />
    </div>
  );
};

export default ClientList;
