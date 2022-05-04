import ContactList from "components/ContactList";
import Header from "components/Header";
import { TContact } from "models/contact.model";

const contacts:TContact[] = [
 {
  name:"Bikonja",
  surname: "Bikic",
  profilePicture:"https://astrodrom.hr/wp-content/uploads/2021/04/depositphotos_337481976-stock-photo-furious-bull-big-horns-spain.jpg",
  phoneNumber:"+3853213213",
  emailAdress:"bikonja.bikic@gmail.com"
 },
 {
  name:"Mercedes",
  surname: "Bikic",
  profilePicture:"",
  phoneNumber:"+3853213213",
  emailAdress:"mercedes.bikic@gmail.com"
 },
 {
  name:"Torpedo",
  surname: "Horvat",
  profilePicture:"",
  phoneNumber:"+3853213213",
  emailAdress:"torpedo1950@gmail.com"
 },
 {
  name:"Torpedo",
  surname: "Horvat",
  profilePicture:"",
  phoneNumber:"+3853213213",
  emailAdress:"torpedo1950@gmail.com"
 },
 {
  name:"Torpedo",
  surname: "Horvat",
  profilePicture:"",
  phoneNumber:"+3853213213",
  emailAdress:"torpedo1950@gmail.com"
 },
 {
  name:"Torpedo",
  surname: "Horvat",
  profilePicture:"",
  phoneNumber:"+3853213213",
  emailAdress:"torpedo1950@gmail.com"
 },
]


const App = () => {
 
 return <>
  <Header title = "Bikontakt" ></Header>
  <ContactList contacts={contacts}></ContactList>
 </>
}

export default App;
