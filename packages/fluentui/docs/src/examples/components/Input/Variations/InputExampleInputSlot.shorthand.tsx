import * as React from 'react';
import { Grid, Input, Text } from '@fluentui/react-northstar';

const inputStyles = { color: 'blue', background: 'yellow' };
const InputExampleInputSlot = () => (
  <Grid columns="1fr 2fr" styles={{ justifyItems: 'start', alignItems: 'center', gap: '10px' }}>
    <Text content="Input default:" />
    <Input placeholder="Search..." role="presentation" />

    <Text content="Input with input slot as props:" />
    <Input
      placeholder="Search..."
      role="presentation"
      input={{
        // will override component's 'placeholder' attribute
        placeholder: 'Placeholder Override...',

        // will override component's 'role' attribute
        role: 'checkbox',

        // will set custom styles for input DOM element
        styles: inputStyles,
      }}
    />
  </Grid>
);

export default InputExampleInputSlot;
