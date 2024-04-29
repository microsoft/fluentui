import { useBooleanKnob } from '@fluentui/docs-components';
import { Checkbox } from '@fluentui/react-northstar';
import * as React from 'react';

const CheckboxExampleChecked = () => {
  const [checked] = useBooleanKnob({ name: 'checked', initialValue: true });

  return (
    <>
      <Checkbox checked={checked} label="Checked" />
      <Checkbox checked={checked} label="Checked toggle" toggle />
    </>
  );
};

export default CheckboxExampleChecked;
