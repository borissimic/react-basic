import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { COLOR_DANGER, COLOR_PRIMARY } from "constants/colors.constants";
import { CustomFormContext } from "context/custom-form.context";
import { cloneElement, useContext } from "react";
import { useState } from "react";
import { createClass } from "utils/generic.util";
import "./index.scss";

const InputField = ({
  label = "",
  className = "",
  icon,
  children,

  formControl = null,
}: Props) => {
  const [isFocus, setFocus] = useState(false);
  const onFocus = () => setFocus(true);
  const onBlur = () => setFocus(false);

  const { disabled, ...methods } = useContext(CustomFormContext);
  const defaultProps = { onFocus, onBlur, disabled };

  const [id, validators] = formControl || [];
  const props = formControl
    ? { ...defaultProps, ...methods?.register(id, validators) }
    : defaultProps;

  const errorMessage = methods?.formState?.errors[id]?.message;

  const classes = createClass(
    {
      focus: isFocus,
      disabled,
    },
    className
  );
  const createContent = () => {
    const content = cloneElement(children, props);

    if (disabled) {
      const value = methods?.getValues(id);
      return value || "N/A";
    }

    return content;
  };

  return (
    <div className={`input-field ${classes}`}>
      <label className="input-field__label" htmlFor={id}>
        {label}
      </label>
      <div className="input-field__input">
        <FontAwesomeIcon
          className="m-r-5"
          icon={icon}
          color={errorMessage ? COLOR_DANGER : COLOR_PRIMARY}
        />
        {createContent()}
      </div>
      {formControl && (
        <span className="input-field__error">{errorMessage}</span>
      )}
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
