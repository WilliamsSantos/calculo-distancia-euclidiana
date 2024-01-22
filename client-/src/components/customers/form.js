import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import InputMask from "react-input-mask";
import * as ClientService from "./services";
import * as Form from "./validate";
import "./css/form.css";

const ClientForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const emptyClient = {
    name: "",
    email: "",
    phone: "",
    lat: "",
    lon: "",
  };
  const [clientData, setClientData] = useState(emptyClient);

  useEffect(() => {
    if (id) {
      ClientService.getClientById(id).then(({ data }) => {
        setClientData(data);
      });
    }
  }, [id]);

  const formatClientData = () => ({
    ...clientData,
    phone: clientData.phone.replace(/\D/g, "") ?? "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formattedData = formatClientData(clientData);
    const isValid = Form.validate(formattedData);

    if (!isValid) {
      return;
    }

    const result = await (id
      ? ClientService.updateClientById(id, formattedData)
      : ClientService.createClient(formattedData));

    if (result?.success) {
      clearFormField();
      navigate(`/client/${id ?? result.data.id}`);
    }
  };

  const clearFormField = () => {
    setClientData(emptyClient);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setClientData({ ...clientData, [name]: value });
  };

  return (
    <div>
      <h3 className="text-center">{id ? "Atualiza " : "Novo"} Cliente</h3>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label htmlFor="name">Nome:</label>
          <input
            id="name"
            type="text"
            name="name"
            value={clientData.name}
            onChange={handleInputChange}
            placeholder="Nome"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">E-mail:</label>
          <input
            id="email"
            type="email"
            name="email"
            value={clientData.email}
            onChange={handleInputChange}
            placeholder="E-mail"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Telefone:</label>
          <InputMask
            id="phone"
            type="text"
            name="phone"
            mask="(99) 9 9999-9999"
            value={clientData.phone}
            onChange={handleInputChange}
            placeholder="Telefone"
          />
        </div>
        <div className="form-group">
          <label htmlFor="lat">Latitude:</label>
          <input
            id="lat"
            type="text"
            name="lat"
            onChange={handleInputChange}
            value={clientData.lat}
            placeholder="Latitude"
          />
        </div>
        <div className="form-group">
          <label htmlFor="lon">Longitude:</label>
          <input
            id="lon"
            type="text"
            name="lon"
            value={clientData.lon}
            onChange={handleInputChange}
            placeholder="Longitude"
          />
        </div>
        <button type="submit" className="btn-large">
          {id ? "Atualizar" : "Cadastrar"} Cliente
        </button>
      </form>
    </div>
  );
};

export default ClientForm;
