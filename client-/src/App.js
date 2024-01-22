import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ClientList from "./components/customers/list";
import ClientForm from "./components/customers/form";
import ClientView from "./components/customers/view";
import Navbar from "./components/navbar";
import "./App.css";

function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/clients" element={<ClientList />} />
          <Route path="/clients/new" element={<ClientForm />} />
          <Route path="/client/:id" element={<ClientView />} />
          <Route path="/client/:id/edit" element={<ClientForm />} />

        </Routes>
      </Router>
    </div>
  );
}

export default App;
