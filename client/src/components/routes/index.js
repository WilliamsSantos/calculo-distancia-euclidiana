import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ClientList from "../customers/list";
import ClientForm from "../customers/form";
import ClientView from "../customers/view";

function RouterComponent() {
  return (
    <Router>
      <Routes>
        <Route path="/client" element={<ClientView />} />
        <Route path="/clients" element={<ClientList />} />
        <Route path="/clients/new" element={<ClientForm />} />
      </Routes>
    </Router>
  );
}

export default RouterComponent;
