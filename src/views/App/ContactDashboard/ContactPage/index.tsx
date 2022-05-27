import { faSearch } from "@fortawesome/free-solid-svg-icons";
import ContactList from "components/ContactList";
import InputField from "components/InputField";
import { ContactsContext } from "context/contacts.context";
import ContactsHttp from "http/contacts.http";
import {
  ChangeEvent,
  useMemo,
  useCallback,
  useEffect,
  useContext,
  useState,
} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { buildUrlParams, parseUrlParamas } from "utils/generic.util";

const ContactPage = ({ isFavoritesPage }: Props) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { contacts, setContacts } = useContext(ContactsContext);
  const contactsHttp = useMemo(() => new ContactsHttp(), []);
  const filteredContacts = isFavoritesPage
    ? contacts.filter(({ isFavorite }) => isFavorite)
    : contacts;

  const { search: _search = "" } = parseUrlParamas(location.search);
  const [search, setSearch] = useState(_search);

  const inputHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value;
    const query = buildUrlParams({ search: term }).toString();
    navigate(`?${query}`);
    setSearch(term);
    fetchContacts(term);
  };

  const fetchContacts = useCallback(
    async (query?: string) => {
      const contacts = await contactsHttp.getContacts(query);
      setContacts(contacts);
    },
    [contactsHttp, setContacts]
  );

  useEffect(() => {
    if (isFavoritesPage) {
      setSearch("");
    }
    fetchContacts();
  }, [fetchContacts, isFavoritesPage]);

  return (
    <>
      <InputField className={isFavoritesPage && "hidden"} icon={faSearch}>
        <input
          onChange={inputHandler}
          type="text"
          placeholder="Search.."
          value={search}
        />
      </InputField>
      <ContactList
        className="w-100"
        contacts={filteredContacts}
        hasAdd={!isFavoritesPage}
      ></ContactList>
    </>
  );
};

type Props = {
  isFavoritesPage?: boolean;
};

export default ContactPage;
