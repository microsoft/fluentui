import * as React from 'react';
import { Checkbox } from '@fluentui/react-checkbox';

// TODO add 'react-checkbox' to the list for withFluentProvider in react-examples/.storybook/preview.js

export const CheckboxExample = () => (
  <>
    <div style={{ display: 'flex', gap: '40px' }}>
      <Checkbox size="large" label="FooBarBaz" />
      <Checkbox size="large" label="FooBarBaz" required />
      <Checkbox size="large" label="FooBarBaz" disabled />
      <Checkbox defaultChecked label="FooBarBaz" />
      <Checkbox defaultChecked="indeterminate" label="FooBarBaz" />
    </div>
  </>
);
