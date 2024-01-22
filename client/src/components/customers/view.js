import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as ClientService from "./services";

const ClientView = () => {
  const [clientData, setClientData] = useState({
      name: "",
      email: "",
      phone: "",
      lat: "",
      lon: "",
  });

  const { id } = useParams();

  useEffect(() => {
    const loadClientData = async () => {
      const response = await ClientService.getClientById(id);
      if (response?.data) {
        setClientData(response.data);
      }
    };

    loadClientData();
  }, [id]);

  return (
    <div>
      <h3 class="text-center">Visualização do Cliente</h3>
      <div className="form">
        {clientData ? (
          <>
            <p>
              <b>Nome:</b> {clientData.name}
            </p>
            <p>
              <b>E-mail:</b> {clientData.email}
            </p>
            <p>
              <b>Telefone:</b> {clientData.phone}
            </p>
            <p>
              <b>Latitude:</b> {clientData.lat}
            </p>
            <p>
              <b>Longitude:</b> {clientData.lon}
            </p>
          </>
        ) : (
          <p>Carregando dados do cliente...</p>
        )}
      </div>
    </div>
  );
};

export default ClientView;
