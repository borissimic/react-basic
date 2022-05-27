import { Navigate, Route, Routes } from "react-router-dom";

import EditPage from "views/App/EditPage";
import ContactDashboard from "./ContactDashboard";

import "./index.scss";

const App = () => {
  return (
    <>
      <header className="header">
        <h1 className="header__title">Bikontakt</h1>
      </header>
      <main className="flex flex-column flex-align-center m-t-20">
        <Routes>
          <Route path="*" element={<Navigate to={"/contacts/all"} replace />} />
          <Route path="/contacts/*" element={<ContactDashboard />} />
          <Route path="/create" element={<EditPage />} />
          <Route path="/edit/:id" element={<EditPage />} />
        </Routes>
      </main>
    </>
  );
};

export default App;
