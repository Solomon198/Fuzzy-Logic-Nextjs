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

export function Input({
  field, // { name, value, onChange, onBlur }
  form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  label,
  withFeedbackLabel = true,
  customFeedbackLabel,
  type = "text",
  ...props
}) {
  return (
    <>
      {label && <label>Enter {label}</label>}
      <input
        type={type}
        className={getFieldCSSClasses(touched[field.name], errors[field.name])}
        {...field}
        {...props}
      />
      {withFeedbackLabel && (
        <FieldFeedbackLabel
          error={errors[field.name]}
          touched={touched[field.name]}
          // label={label}
          type={type}
          customFeedbackLabel={customFeedbackLabel}
        />
      )}
    </>
  );
}
