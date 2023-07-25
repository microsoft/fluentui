import * as React from 'react';
import { SwatchImagePickerCell } from '@fluentui/react-swatch-color-picker';
import { RadioGroup, Radio } from '@fluentui/react-components';
export const Default = () => {
  const [color, setColor] = React.useState('red');
  return (
    <>
      <RadioGroup value={color} onChange={(_, data) => setColor(data.value)} aria-labelledby="colors">
        <Radio name="color" value="red" />
        <Radio name="color" value="rgb(189, 255, 104)" />
        <Radio name="color" value="rgba(189, 255, 104,.4)" />
        <Radio name="color" value="#f09" />
      </RadioGroup>
      Background can be changed
      <div style={{ backgroundColor: color, width: 200, height: 200 }} />
    </>
  );
};
