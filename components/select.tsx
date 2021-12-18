// @ts-nocheck
import React from "react";
import { useField } from "formik";

// @ts-nocheck
const getFieldCSSClasses = (touched, errors) => {
  const classes = ["form-control"];
  if (touched && errors) {
    classes.push("is-invalid");
  }

  if (touched && !errors) {
    classes.push("is-valid");
  }

  return classes.join(" ");
};

const inputLabel = ({ label, touched, error, customFeedbackLabel }) => {
  if (touched && error) {
    return <div className="invalid-feedback">{error}</div>;
  }

  if (touched && !error && label) {
    return <div className="valid-feedback">{label} was entered correct</div>;
  }

  return (
    <div className="feedback">
      {customFeedbackLabel && <>{customFeedbackLabel}</>}
      {!customFeedbackLabel && (
        <>
          {/* Please enter <b>{label}</b> */}
          {""}
        </>
      )}
    </div>
  );
};

const selectLabel = ({ label, touched, error, customFeedbackLabel }) => {
  if (touched && error) {
    return <div className="invalid-feedback">{error}</div>;
  }

  return (
    <div className="feedback">
      {customFeedbackLabel && <>{customFeedbackLabel}</>}
      {!customFeedbackLabel && label && (
        <>
          {/* Please select <b>{label}</b> */}
          {""}
        </>
      )}
    </div>
  );
};

export function FieldFeedbackLabel({
  label,
  touched,
  error,
  type,
  customFeedbackLabel,
}) {
  switch (type) {
    case "text":
      return inputLabel({ label, touched, error, customFeedbackLabel });
    case "email":
      return inputLabel({ label, touched, error, customFeedbackLabel });
    case "password":
      return inputLabel({ label, touched, error, customFeedbackLabel });
    default:
      return selectLabel({ label, touched, error, customFeedbackLabel });
  }
}

export function Select({
  label,
  withFeedbackLabel = true,
  type = "text",
  customFeedbackLabel,
  children,
  ...props
}) {
  const [field, meta] = useField(props);
  const { touched, error } = meta;
  return (
    <>
      {label && <label>Select {label}</label>}
      <select
        className={getFieldCSSClasses(touched, error)}
        {...field}
        {...props}
      >
        {children}
      </select>
      {withFeedbackLabel && (
        <FieldFeedbackLabel
          erros={error}
          touched={touched}
          label={label}
          customFeedbackLabel={customFeedbackLabel}
        />
      )}
    </>
  );
}
