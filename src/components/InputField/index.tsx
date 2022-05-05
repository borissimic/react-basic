import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ChangeEventHandler, useState } from "react";
import "./index.scss";

const InputField = ({onChange,type,icon}:Props) => {
 const[focus,setFocus] = useState(false);
 const onFocus = () => setFocus(true);
 const onBlur = () => setFocus(false)

 return <div className={`input-field ${focus ? "focus":"" }`}>
     <FontAwesomeIcon icon={icon}/>
     <input onChange={onChange} type={type} onFocus={onFocus} onBlur={onBlur} />
     </div>
  
 
}

type Props ={
  onChange:ChangeEventHandler<HTMLInputElement>;
  type : string;
  icon?: IconProp

}
export default InputField