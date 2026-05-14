import * as React from 'react';
import type { JSXElement, RangeSliderProps } from '@fluentui/react-components';
import { Button, Label, RangeSlider, useId } from '@fluentui/react-components';

const initialValue: RangeSliderProps['value'] = { start: 25, end: 75 };

export const Controlled = (): JSXElement => {
  const labelId = useId('rangeslider-controlled-label-');
  const [value, setValue] = React.useState(initialValue);

  const onChange: RangeSliderProps['onChange'] = (_, data) => setValue(data.value);
  const reset = () => setValue({ ...initialValue });

  return (
    <>
      <Label id={labelId}>
        Controlled Range Slider [ Start: {value.start} / End: {value.end} ]
      </Label>
      <RangeSlider aria-labelledby={labelId} min={0} max={100} value={value} onChange={onChange} />
      <Button onClick={reset}>Reset</Button>
    </>
  );
};

Controlled.parameters = {
  docs: {
    description: {
      story:
        'Manage RangeSlider values in local state and update them through onChange to build a fully controlled experience.',
    },
  },
};
