import { faEnvelope, faPhone, faUser } from "@fortawesome/free-solid-svg-icons";
import InputField from "components/InputField";
import Form from "components/Form";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { fileToBase64, parseUrlParamas, validators } from "utils/generic.util";
import ContactsHttp from "http/contacts.http";
import { TContact } from "models/contact.model";
import { useCallback, useEffect, useMemo, useState } from "react";
import { EMAIL_REGEX } from "constants/regex.constants";
import ImageFrame from "components/ImageFrame";

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
      <ImageFrame
        className="m-b-20"
        imageUrl={contact?.profilePicture}
        formControl={["profilePicture"]}
      ></ImageFrame>
      <InputField
        label="First name:"
        className="w-px-250"
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
      <InputField
        label="Surname:"
        className="w-px-250"
        icon={faUser}
        formControl={[
          "surname",
          validators({
            required: true,
            maxLength: 20,
          }),
        ]}
      >
        <input type="text" placeholder="Surname" />
      </InputField>
      <InputField
        label="Email:"
        className="w-px-250"
        icon={faEnvelope}
        formControl={[
          "emailAdress",
          validators({
            required: true,
            pattern: EMAIL_REGEX,
          }),
        ]}
      >
        <input type="email" placeholder="Email" />
      </InputField>
      <InputField
        label="Phone:"
        className="w-px-250"
        icon={faPhone}
        formControl={[
          "phoneNumber",
          validators({
            required: true,
            maxLength: 20,
          }),
        ]}
      >
        <input type="text" placeholder="Phone Number" />
      </InputField>

      <button>Submit</button>
    </Form>
  );
};
export default EditPage;
