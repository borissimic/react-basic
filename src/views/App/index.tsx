import "./index.scss";

import { Route, Routes } from "react-router-dom";
import ContactPage from "./ContactPage";
import { ContactsProvider } from "context/contacts.context";
import EditPage from "views/App/EditPage";

const App = () => {
  return (
    <ContactsProvider>
      <header className="header">
        <h1 className="header__title">Bikontakt</h1>
      </header>
      <main className="flex flex-column flex-align-center m-t-20">
        <Routes>
          <Route path="/" element={<ContactPage />}></Route>
          <Route
            path="/favorites"
            element={<ContactPage isFavoritesPage />}
          ></Route>
          <Route path="/create" element={<EditPage />}></Route>
          <Route path="/edit/:id" element={<EditPage />}></Route>
        </Routes>
      </main>
    </ContactsProvider>
  );
};

export default App;
