import * as React from 'react';
import { Grid, Input, Text } from '@fluentui/react-northstar';

const InputExampleWrapperSlot = () => (
  <Grid columns="1fr 2fr" styles={{ justifyItems: 'start', alignItems: 'center', gap: '10px' }}>
    <Text content="Input default:" />
    <Input placeholder="Search..." tabIndex={-1} styles={{ color: 'blue', backgroundColor: 'yellow' }} />

    <Text content="Wrapped Input with props:" />
    <Input
      placeholder="Search..."
      tabIndex={-1}
      styles={{ color: 'blue', backgroundColor: 'yellow' }}
      wrapper={{
        // will override component's 'tabIndex' attribute
        tabIndex: 0,

        // will set custom styles for wrapper element
        styles: { padding: '5px', backgroundColor: 'red' },
      }}
    />
  </Grid>
);

export default InputExampleWrapperSlot;
