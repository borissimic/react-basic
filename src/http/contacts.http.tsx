import axios from "axios";
import { BASE_API_URL } from "constants/api.constants";
import HttpClient from "./generic.http";

class ContactsHttp extends HttpClient {
  constructor() {
    super(BASE_API_URL);
  }

  public async getContacts(): Promise<any> {
    return axios.get(this.url("/contacts"));
  }
}

export default ContactsHttp;
