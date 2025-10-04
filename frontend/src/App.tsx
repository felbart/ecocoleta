import { BrowserRouter as Router, Routes, Route } from "react-router";
// import Sidebar from "./components/Sidebar";
import Dashboard from "./Dashboard";
import Cadastro from "./Cadastro";
import Consulta from "./Consulta";
import Home from "./Home";
import Header from "./components/Header";
// import { useState } from "react";


const App = () => {
  // const [ collapsed, setCollapsed ] = useState(false);
  // const handleToggle = () => setCollapsed(!collapsed);
  return (
    <Router>
      
    <Header />
      <div className="flex">
        {/* <Sidebar collapsed={collapsed} onToggle={handleToggle}/> */}
        <main className="flex-1 bg-tertiary-light p-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cadastrar" element={<Cadastro />} />
            <Route path="/consultar" element={<Consulta />} />
            <Route path="/estatisticas" element={<Dashboard />} /> {/* Por exemplo, usa o mesmo */}
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;