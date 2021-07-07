import * as React from 'react';
import { Checkbox } from '@fluentui/react-checkbox';

// TODO add 'react-checkbox' to the list for withFluentProvider in react-examples/.storybook/preview.js

export const CheckboxExample = () => (
  <div style={{ display: 'flex', gap: '6px', flexDirection: 'column' }}>
    <Checkbox defaultChecked size="large">
      FooBarBaz
    </Checkbox>

    <Checkbox size="large" required>
      FooBarBaz
    </Checkbox>

    <Checkbox size="large" disabled>
      FooBarBaz
    </Checkbox>

    <Checkbox defaultChecked size="large" disabled>
      FooBarBaz
    </Checkbox>

    <Checkbox defaultChecked circular size="large">
      FooBarBaz
    </Checkbox>

    <Checkbox defaultChecked="mixed" disabled>
      FooBarBaz
    </Checkbox>

    <Checkbox defaultChecked>FooBarBaz</Checkbox>

    <Checkbox defaultChecked="mixed">FooBarBaz</Checkbox>

    <Checkbox labelPosition="start" defaultChecked="mixed">
      FooBarBaz
    </Checkbox>

    <Checkbox />
  </div>
);
