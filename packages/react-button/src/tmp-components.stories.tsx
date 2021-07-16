//
// !!!   A temporary workaround to avoid dependencies on any non converged packages.
//

/* eslint-disable @typescript-eslint/naming-convention */
import * as React from 'react';

interface ITextFieldProps extends React.AllHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  value: string;
  onChange: (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => void;
  disabled: boolean;
}

export const TextField = ({ value, onChange, disabled }: ITextFieldProps) => {
  return <input value={value} disabled={disabled} onChange={e => onChange(e, e.target.value)} />;
};

interface ICheckboxProps extends React.AllHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  checked: boolean;
  onChange: (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, checked?: boolean) => void;
  disabled: boolean;
  styles: string;
}

export const Checkbox = ({ checked, onChange, disabled, styles }: ICheckboxProps) => {
  return (
    <input
      type="checkbox"
      checked={checked}
      disabled={disabled}
      onChange={e => onChange(e, !checked)}
      className={styles}
    />
  );
};

export interface IDropdownOption {
  key: string;
  text: string;
}

interface IDropdownProps {
  options: IDropdownOption[];
  disabled: boolean;
  selectedKey: string;
  onChange: (event: React.FormEvent<HTMLSelectElement>, option?: IDropdownOption) => void;
}

export const Dropdown = ({ options, disabled, selectedKey, onChange }: IDropdownProps) => {
  return (
    <select
      disabled={disabled}
      defaultValue={selectedKey}
      onChange={e => onChange(e, { key: e.target.value, text: e.target.value })}
    >
      {options.map(option => {
        return (
          <option key={option.key} value={option.text}>
            {option.text}
          </option>
        );
      })}
    </select>
  );
};
