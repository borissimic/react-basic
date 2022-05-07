import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { cloneElement } from "react";
import { useState } from "react";
import "./index.scss";

const InputField = ({ icon, children }: Props) => {
  const [focus, setFocus] = useState(false);
  const onFocus = () => setFocus(true);
  const onBlur = () => setFocus(false);

  const content = cloneElement(children, { onFocus, onBlur });

  return (
    <div className={`input-field ${focus ? "focus" : ""}`}>
      <FontAwesomeIcon className="m-r-5" icon={icon} />

      {content}
    </div>
  );
};

type Props = {
  icon?: IconProp;
  children: any;
};
export default InputField;
