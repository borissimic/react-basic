import {
  faEnvelope,
  faHeart,
  faPencil,
  faPhone,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ImageFrame from "components/ImageFrame";
import { ContactsContext } from "context/contacts.context";
import ContactsHttp from "http/contacts.http";
import { Contact } from "models/contact.model";
import { MouseEvent, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { buildUrlParams } from "utils/generic.util";

import "./index.scss";

const ContactCard = ({ contact: _contact }: Props) => {
  const navigate = useNavigate();
  const { contacts, setContacts } = useContext(ContactsContext);
  const [contact, setContact] = useState(_contact);
  const { id, fullName, profilePicture, phoneNumber, emailAdress, isFavorite } =
    contact;
  const contactsHttp = new ContactsHttp();

  const deleteHandler = async (event: MouseEvent) => {
    event.stopPropagation();

    const newContacts = contacts.filter((contact) => contact.id !== id);

    await contactsHttp.deleteContact(id);

    setContacts(newContacts);
  };

  const favoriteHandler = async (event: MouseEvent) => {
    event.stopPropagation();

    const newContact = await contactsHttp.updateContact(id, {
      isFavorite: !isFavorite,
    });

    const newContacts = contacts.map((contact) =>
      contact.id === id ? newContact : contact
    );

    setContact(newContact);
    setContacts(newContacts);
  };
  const navigateHandler = (event: MouseEvent, isReadonly?: boolean) => {
    event.stopPropagation();

    if (isReadonly) {
      const query = buildUrlParams({ isReadonly });

      return navigate(`/edit/${id}?${query}`);
    }
    navigate(`/edit/${id}`);
  };

  return (
    <article
      className="contact-card "
      onClick={(event) => navigateHandler(event, true)}
    >
      <FontAwesomeIcon
        className="contact-card__icon contact-card__icon--left"
        icon={faTrash}
        size="lg"
        color="gray"
        onClick={deleteHandler}
      />

      <div className="contact-card__icon contact-card__icon--right">
        <FontAwesomeIcon
          className="m-r-5"
          onClick={favoriteHandler}
          icon={faHeart}
          size="lg"
          color={isFavorite ? "pink" : "gray"}
        />
        <FontAwesomeIcon
          icon={faPencil}
          size="lg"
          color="gray"
          onClick={navigateHandler}
        />
      </div>

      <ImageFrame imageUrl={profilePicture}></ImageFrame>
      <h3>{fullName}</h3>
      <div className="contact-card__info">
        <div>
          <FontAwesomeIcon icon={faEnvelope} size="lg" color="gray" />
          <span>{emailAdress}</span>
        </div>
        <div>
          <FontAwesomeIcon icon={faPhone} size="lg" color="gray" />
          <span>{phoneNumber}</span>
        </div>
      </div>
    </article>
  );
};

type Props = {
  contact: Contact;
};

export default ContactCard;
