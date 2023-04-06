import EyeClose from '@/assets/EyeClose';
import EyeOpen from '@/assets/EyeOpen';
import React, { LegacyRef, MutableRefObject } from 'react';
import { DataNegeri } from '../GeotectInfo/FormProjectInfo';
import DownIcon from '@/assets/DownIcon';
import UpIcon from '@/assets/UpIcon';
import CalendarIcon from '@/assets/CalendarIcon';

type PropInput = {
  placeHolder: string;
  titleLabel: string;
  htmlFor: string;
  type: string;
  required?: boolean;
  autoComplete: string;
  isPassword?: boolean;
  isTexArea?: boolean;
  value?: string | number | string[] | object | null | any;
  defaultValue?: string | number | string[] | object | null | any;
  showPw?: boolean;
  isDateTime?: boolean;
  showCalendar?: boolean;
  multiple?: boolean;
  ref?:
    | LegacyRef<HTMLInputElement>
    | MutableRefObject<string[] | null | undefined>
    | undefined;
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onShowPassword?: () => void;
  onShowCalendar?: () => void;
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
      <label className="text-sm lg:text-lg" htmlFor={htmlFor}>
        {titleLabel}
      </label>
      {props.isTexArea ? (
        <div className="flex">
          <textarea
            className={`p-2 h-32 w-full border-zinc-800 border-2 text-sm lg:text-lg`}
            autoComplete={'off'}
            placeholder={placeHolder}
            id={htmlFor}
            required={required}
            name={htmlFor}
            value={value}
            onChange={props.onChange}
          />
        </div>
      ) : (
        <>
          {props.isPassword === true ? (
            <div className="flex flex-row align-middle text-sm lg:text-lg">
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
              <div className="flex justify-end items-center">
                <button
                  className="bg-[#3B3B3B] py-2 border-[#3B3B3B] border-2"
                  onClick={props.onShowPassword}
                >
                  {props.showPw ? <EyeOpen /> : <EyeClose />}
                </button>
              </div>
            </div>
          ) : props.isDateTime ? (
            <>
              <div className="flex flex-row align-middle text-sm lg:text-lg">
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
                <div className="flex justify-end items-center">
                  <button
                    type="button"
                    className="bg-[#3B3B3B] py-2 border-[#3B3B3B] border-2"
                    onClick={props.onShowCalendar}
                  >
                    {props.showCalendar ? (
                      <CalendarIcon active={false} />
                    ) : (
                      <CalendarIcon active={true} />
                    )}
                  </button>
                </div>
              </div>
            </>
          ) : type === 'file' ? (
            <input
              className={`p-2 text-sm lg:text-lg`}
              placeholder={placeHolder}
              id={htmlFor}
              ref={props.ref?.valueOf}
              autoComplete={'off'}
              required={required}
              name={htmlFor}
              multiple={props.multiple}
              type={type}
              defaultValue={''}
              onChange={props.onChange}
            />
          ) : (
            <input
              className={`p-2 text-sm lg:text-lg`}
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
