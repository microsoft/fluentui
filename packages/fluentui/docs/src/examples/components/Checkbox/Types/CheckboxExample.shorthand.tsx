import { Checkbox } from '@fluentui/react-northstar';
import * as React from 'react';

const CheckboxExample = () => (
  <>
    <Checkbox label="Make my profile visible" />
    <br />
    <Checkbox
      label={
        <span>
          Long labels will wrap and the indicator <br /> should remain top-aligned.
        </span>
      }
    />
  </>
);

export default CheckboxExample;
