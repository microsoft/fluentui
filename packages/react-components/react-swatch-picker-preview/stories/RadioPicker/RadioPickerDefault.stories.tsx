import * as React from 'react';
import { RadioPicker, RadioSwatch } from '@fluentui/react-swatch-picker-preview';
import { Radio, RadioGroup } from '@fluentui/react-radio';
import { Prohibited20Filled } from '@fluentui/react-icons';

export const Default = () => {
  const [rowValue, setRowValue] = React.useState('cyan');
  const [value, setValue] = React.useState('cyan');

  return (
    <>
      <RadioGroup name="row-picker" value={rowValue} onChange={(_, data) => setRowValue(data.value)}>
        <RadioSwatch value="red" label="Red" />
        <RadioSwatch value="green" label="Green" />
        <RadioSwatch value="blue" label="Blue" />
      </RadioGroup>

      <RadioPicker name="row-picker" value={rowValue} onChange={(_, data) => setRowValue(data.value)}>
        <RadioSwatch icon={<Prohibited20Filled />} value="red" label="Red" />
        <RadioSwatch value="green" label="Green" />
        <RadioSwatch value="blue" label="Blue" />
      </RadioPicker>
      <div>{rowValue}</div>
      <div style={{ backgroundColor: rowValue, width: '200px', height: '200px' }} />
      <h2>Grid</h2>
      <RadioPicker
        name="colors"
        layout={'grid'}
        columnCount={3}
        value={value}
        onChange={(_, data) => setValue(data.value)}
      >
        <RadioSwatch value="red" label="Red" />
        <RadioSwatch value="green" label="Green" />
        <RadioSwatch value="blue" label="Blue" />
        <RadioSwatch value="yellow" label="Yellow" />
        <RadioSwatch value="orange" label="Orange" />
        <RadioSwatch value="purple" label="Purple" />
        <RadioSwatch value="black" label="Black" />
        <RadioSwatch value="white" label="White" />
        <RadioSwatch value="#f09" label="#f09" />
      </RadioPicker>
      <div style={{ backgroundColor: value, width: '200px', height: '200px' }} />
    </>
  );
};
