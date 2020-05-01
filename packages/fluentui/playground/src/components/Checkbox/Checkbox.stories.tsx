import React from 'react';
import { CheckboxBase } from './Checkbox.base';

export default {
  component: 'Checkbox',
  title: 'Base Checkbox',
};

const _onChange = () => {
  // eslint-disable-next-line no-console
  console.log('Checkbox was clicked.');
};

export const baseCheckbox = () => (
  <CheckboxBase defaultChecked={true} onChange={_onChange}>
    This renders as a checkbox
  </CheckboxBase>
);
