import * as React from 'react';
import { Checkbox } from '@fluentui/react-checkbox';

// TODO add 'react-checkbox' to the list for withFluentProvider in react-examples/.storybook/preview.js

export const CheckboxExample = () => (
  <>
    <div style={{ display: 'flex', gap: '40px' }}>
      <div>
        <Checkbox size="large" label="FooBarBaz" />
        <Checkbox defaultChecked size="large" label={{ children: 'FooBarBaz', required: true }} />
        <Checkbox defaultIndeterminate size="large" label={{ children: 'FooBarBaz', required: true }} />
        <Checkbox circular size="large" label="FooBarBaz" />
      </div>
      <div>
        <Checkbox label="FooBarBaz" />
        <Checkbox defaultChecked label={{ children: 'FooBarBaz', required: true }} />
        <Checkbox defaultIndeterminate label={{ children: 'FooBarBaz', required: true }} />
        <Checkbox circular label="FooBarBaz" />
      </div>
    </div>
  </>
);
