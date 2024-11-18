import React from "react";

const Field = ({ label, children, htmlFor, errors }) => {
  const id = htmlFor || getChildId(children);

  return (
    <div className="form-control">
      {label && (
        <label className="auth-label" htmlFor={id}>
          {label}
        </label>
      )}
      {children}
      {!!errors && (
        <div role="alert" className="text-red-500">
          {errors.message}
        </div>
      )}
    </div>
  );
};

const getChildId = (children) => {
  const child = React.Children.only(children);
  if ("id" in child?.props) {
    return child.props.id;
  }
};

export default Field;
