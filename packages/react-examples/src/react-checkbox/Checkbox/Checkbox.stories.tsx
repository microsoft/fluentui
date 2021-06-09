import * as React from 'react';
import { Checkbox } from '@fluentui/react-checkbox';

// TODO add 'react-checkbox' to the list for withFluentProvider in react-examples/.storybook/preview.js

export const CheckboxExample = () => (
  <>
    <div style={{ display: 'flex', gap: '40px' }}>
      <div>
        <Checkbox size="large" label="FooBarBaz" />
        <Checkbox size="large" label={{ children: 'FooBarBaz', required: true }} />
        <Checkbox size="large" label={{ children: 'FooBarBaz', required: true, disabled: true }} />
      </div>
      <div>
        <Checkbox label="FooBarBaz" />
        <Checkbox label={{ children: 'FooBarBaz', required: true }} />
        <Checkbox label={{ children: 'FooBarBaz', required: true, disabled: true }} />
      </div>
      <div>
        <Checkbox labelPosition="start" label="FooBarBaz" />
        <Checkbox labelPosition="start" label={{ children: 'FooBarBaz', required: true }} />
        <Checkbox labelPosition="start" label={{ children: 'FooBarBaz', required: true, disabled: true }} />
      </div>
    </div>
  </>
);
