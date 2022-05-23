import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { cloneElement } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { createClass } from "utils/generic.util";
import "./index.scss";

const InputField = ({
  label = "",
  className = "",
  icon,
  children,
  isDisabled = false,
  formControl = null,
}: Props) => {
  const [isFocus, setFocus] = useState(false);
  const onFocus = () => setFocus(true);
  const onBlur = () => setFocus(false);
  const defaultProps = { onFocus, onBlur, disabled: isDisabled };

  const { register } = useForm();
  const [id, validators] = formControl || [];
  const props = formControl
    ? { ...defaultProps, ...register(id, validators) }
    : defaultProps;

  const content = cloneElement(children, props);
  const classes = createClass(
    {
      focus: isFocus,
      disabled: isDisabled,
    },
    className
  );
  const createContent = () => {
    const props: any = content.props;

    if (isDisabled) {
      return props.value || "N/A";
    }

    return content;
  };

  return (
    <div className={`input-field ${classes}`}>
      <label className="input-field__label" htmlFor={id}>
        {label}
      </label>
      <div className="input-field__input">
        <FontAwesomeIcon className="m-r-5" icon={icon} />
        {createContent()}
      </div>
      <span className="input-field__error">Error message</span>
    </div>
  );
};

type Props = {
  icon?: IconProp;
  children: any;
  className?: string;
  isDisabled?: boolean;
  label?: string;
  formControl?: any[];
};
export default InputField;
