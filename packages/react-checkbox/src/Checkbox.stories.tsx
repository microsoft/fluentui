import * as React from 'react';
import { Checkbox } from './index';

export const CheckboxVariations = () => (
  <div style={{ display: 'flex', gap: '14px', flexDirection: 'column' }}>
    <Checkbox>Simple Checkbox</Checkbox>
    <Checkbox circular>Circular Checkbox</Checkbox>
    <Checkbox labelPosition="before">Checkbox with label positioned before</Checkbox>
    <Checkbox required>Required Checkbox</Checkbox>
    <Checkbox size="large">Large Checkbox</Checkbox>
    <Checkbox />
    <Checkbox disabled />
    <Checkbox disabled defaultChecked="mixed" />
    <Checkbox disabled defaultChecked={true} />
  </div>
);

export const CheckboxStates = () => (
  <div style={{ display: 'flex', gap: '14px', flexDirection: 'column' }}>
    <Checkbox>Unchecked Checkbox</Checkbox>
    <Checkbox defaultChecked>Checked Checkbox</Checkbox>
    <Checkbox defaultChecked="mixed">Mixed Checkbox</Checkbox>
    <Checkbox disabled>Disabled Checkbox</Checkbox>
  </div>
);

export default {
  title: 'Components/Checkbox',
  component: Checkbox,
};
