import { Checkbox } from '@fluentui/react-experimental';
import * as React from 'react';

const CheckboxExampleDisabled = () => (
  <>
    <Checkbox disabled label="Disabled" />
    <Checkbox disabled checked label="Disabled & Checked" />
    <br />
    <Checkbox toggle disabled label="Disabled" />
    <Checkbox toggle disabled checked label="Disabled & Checked" />
  </>
);

export default CheckboxExampleDisabled;
