import * as React from 'react';
import { Select } from '../index';
import { useId } from '@fluentui/react-utilities';

export const Appearance = () => {
  const selectId = useId();

  return (
    <>
      <label htmlFor={`${selectId}-outline`}>Outline</label>
      <Select id={`${selectId}-outline`} appearance="outline">
        <option>Red</option>
        <option>Green</option>
        <option>Blue</option>
      </Select>

      <label htmlFor={`${selectId}-underline`}>Underline</label>
      <Select id={`${selectId}-underline`} appearance="underline">
        <option>Red</option>
        <option>Green</option>
        <option>Blue</option>
      </Select>

      <label htmlFor={`${selectId}-filledDarker`}>Filled Darker</label>
      <Select id={`${selectId}-filledDarker`} appearance="filledDarker">
        <option>Red</option>
        <option>Green</option>
        <option>Blue</option>
      </Select>

      <label htmlFor={`${selectId}-filledLighter`}>Filled Lighter</label>
      <Select id={`${selectId}-filledLighter`} appearance="filledLighter">
        <option>Red</option>
        <option>Green</option>
        <option>Blue</option>
      </Select>
    </>
  );
};

Appearance.parameters = {
  docs: {
    description: {
      story:
        'A Select can have the following `appearance` variants:\n' +
        '- `outline` (default): has a border around all four sides.\n' +
        '- `underline`: only has a bottom border.\n' +
        '- `filledDarker`: no border, only a subtle background color difference against a white page.\n' +
        '- `filledLighter`: no border, and a white background.\n',
    },
  },
};
