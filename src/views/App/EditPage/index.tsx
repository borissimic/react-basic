import { faUser } from "@fortawesome/free-solid-svg-icons";
import InputField from "components/InputField";
import Form from "components/Form";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { parseUrlParamas, validators } from "utils/generic.util";
import ContactsHttp from "http/contacts.http";
import { TContact } from "models/contact.model";
import { useCallback, useEffect, useMemo, useState } from "react";

const EditPage = () => {
  const { id } = useParams();
  const { search } = useLocation();
  const navigate = useNavigate();
  const { isReadonly } = parseUrlParamas(search);
  const [contact, setContact] = useState(null);
  const contactsHttp = useMemo(() => new ContactsHttp(), []);

  const fetchContact = useCallback(async () => {
    const contact = await contactsHttp.getContact(+id);
    setContact(contact);
  }, [contactsHttp, id]);

  useEffect(() => {
    if (id) {
      fetchContact();
    }
  }, [fetchContact, id]);

  const submitHandler = async (data: TContact) => {
    if (id) {
      await contactsHttp.replaceContact({ id, ...data });
    } else {
      await contactsHttp.createContact(data);
    }
    navigate("/");
  };

  return (
    <Form onSubmit={submitHandler} preFill={contact} isDisabled={isReadonly}>
      <InputField
        label="First name:"
        className="w-px-150"
        icon={faUser}
        formControl={[
          "name",
          validators({
            required: true,
            maxLength: 20,
          }),
        ]}
      >
        <input type="text" placeholder="First Name" />
      </InputField>
      <button>Submit</button>
    </Form>
  );
};
export default EditPage;
