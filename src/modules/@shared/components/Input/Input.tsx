import React from 'react';

type NativeInputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

const Input = (props: NativeInputProps) => {
  return <input {...props} />;
};

export default Input;
