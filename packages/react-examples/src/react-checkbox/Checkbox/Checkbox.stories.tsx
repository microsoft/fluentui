import * as React from 'react';
import { Checkbox } from '@fluentui/react-checkbox';

// TODO add 'react-checkbox' to the list for withFluentProvider in react-examples/.storybook/preview.js

export const CheckboxExample = () => (
  <div style={{ display: 'flex', gap: '6px', flexDirection: 'column' }}>
    <Checkbox label="FooBarBaz" defaultChecked size="large" />

    <Checkbox label="FooBarBaz" size="large" required />

    <Checkbox label="FooBarBaz" size="large" disabled />

    <Checkbox label="FooBarBaz" defaultChecked size="large" disabled />

    <Checkbox label="FooBarBaz" defaultChecked circular size="large" />

    <Checkbox label="FooBarBaz" defaultChecked="mixed" disabled />

    <Checkbox label="FooBarBaz" defaultChecked />

    <Checkbox label="FooBarBaz" defaultChecked="mixed" />

    <Checkbox label="FooBarBaz" labelPosition="start" defaultChecked="mixed" />

    <Checkbox />
  </div>
);
