import { Checkbox } from '@fluentui/react-northstar';
import * as React from 'react';

const CheckboxExampleToggle = () => (
  <>
    <Checkbox label="Subscribe to weekly newsletter" toggle />
    <Checkbox disabled checked label="Subscribe to weekly newsletter" toggle />
  </>
);

export default CheckboxExampleToggle;
