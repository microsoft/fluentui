import * as React from 'react';
import { Checkbox } from '@fluentui/react-checkbox';

export const CheckboxVariations = () => (
  <div style={{ display: 'flex', gap: '14px', flexDirection: 'column' }}>
    <Checkbox label="Simple Checkbox" />
    <Checkbox label="Circular Checkbox" circular />
    <Checkbox label="Checkbox with label positioned before" labelPosition="before" />
    <Checkbox label="Required Checkbox" required />
    <Checkbox label="Large Checkbox" size="large" />
  </div>
);

export const CheckboxStates = () => (
  <div style={{ display: 'flex', gap: '14px', flexDirection: 'column' }}>
    <Checkbox label="Unchecked Checkbox" />
    <Checkbox label="Checked Checkbox" defaultChecked />
    <Checkbox label="Mixed Checkbox" defaultChecked="mixed" />
    <Checkbox label="Disabled Checkbox" disabled />
  </div>
);
