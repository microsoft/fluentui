import * as React from 'react';
import { Checkbox } from './index';

// TODO add 'react-checkbox' to the list for withFluentProvider in react-examples/.storybook/preview.js

export const CheckboxExample = () => (
  <>
    <Checkbox>Hello World!</Checkbox>
  </>
);

export default {
  title: 'Components/Checkbox',
  component: Checkbox,
};
