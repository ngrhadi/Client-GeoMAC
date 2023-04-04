import EyeClose from '@/assets/EyeClose';
import EyeOpen from '@/assets/EyeOpen';
import React from 'react';

type PropInput = {
  placeHolder: string;
  titleLabel: string;
  htmlFor: string;
  type: string;
  required?: boolean;
  autoComplete: string;
  isPassword?: boolean;
  isTexArea?: boolean;
  value: string | number;
  showPw?: boolean;
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onShowPassword?: () => void;
};

export const FieldInput = ({
  placeHolder,
  htmlFor,
  type,
  required,
  titleLabel,
  value,
  autoComplete,
  ...props
}: PropInput) => {
  return (
    <>
      <label htmlFor={htmlFor}>{titleLabel}</label>
      {props.isTexArea ? (
        <textarea
          className={`p-2 h-32`}
          autoComplete={'off'}
          placeholder={placeHolder}
          id={htmlFor}
          required={required}
          name={htmlFor}
          value={value}
          onChange={props.onChange}
        />
      ) : (
        <>
          {props.isPassword === true ? (
            <div className="flex flex-row align-middle">
              <input
                className={`p-2 w-full`}
                placeholder={placeHolder}
                id={htmlFor}
                autoComplete={'off'}
                required={required}
                name={htmlFor}
                type={type}
                value={value}
                onChange={props.onChange}
              />
              <div className=" flex justify-end items-center">
                <button className="absolute" onClick={props.onShowPassword}>
                  {props.showPw ? <EyeOpen /> : <EyeClose />}
                </button>
              </div>
            </div>
          ) : (
            <input
              className={`p-2`}
              placeholder={placeHolder}
              id={htmlFor}
              autoComplete={'off'}
              required={required}
              name={htmlFor}
              type={type}
              value={value}
              onChange={props.onChange}
            />
          )}
        </>
      )}
    </>
  );
};
