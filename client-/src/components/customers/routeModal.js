import React from "react";
import Modal from "react-modal";
import "./css/modal.css";

Modal.setAppElement("#root");

const RouteModal = ({ isOpen, onRequestClose, route = [] }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="custom-modal"
    >
      <h2 className="modal-title">Ordem de Visitação</h2>
      <ol className="modal-list bg-list">
        {route.length ? (
          route.map((client, index) => (
            <li key={index} className="modal-list-item">
              <b>Nome:</b> {client?.name} - <b>lat:</b> {client?.lat}, <b>lon:</b> {client?.lon}
            </li>
          ))
        ) : (
          <p className="no-clients-message">Nada para visualizar</p>
        )}
      </ol>
      <button className="modal-close-btn" onClick={onRequestClose}>
        Fechar
      </button>
    </Modal>
  );
};

export default RouteModal;
