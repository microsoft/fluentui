import * as React from 'react';
import { Grid, Input, Text } from '@fluentui/react-northstar';

// This object contains properties that will be applied to the input
const propsForInput = { placeholder: 'Search...', role: 'checkbox' };
const propsTargettingWrapper = {
  placeholder: 'Wrapper placeholder...',
  id: 'wrapperId',
  role: 'presentation',
};

// This object contains properties that will be applied to the wrapper
const propsForWrapper = { dir: 'ltr', tabIndex: -1, styles: { padding: '5px', background: 'red' } };
const propsTargettingInput = {
  dir: 'rtl',
  tabIndex: 0,
  styles: { color: 'blue', background: 'yellow' },
};

const InputExampleTargeting = () => (
  <Grid columns="1fr 1fr" styles={{ justifyItems: 'start', alignItems: 'center', gap: '10px' }}>
    <Text content="Input with props that will be applied to either the input or the wrapper:" />
    <Input id="input-targeting-1" {...propsForInput} {...propsForWrapper} />

    <Text content="Input with input slot props that have to be applied to the input element:" />
    <Input id="input-targeting-2" {...propsForInput} {...propsForWrapper} input={propsTargettingInput} />

    <Text content="Input with wrapper slot props that have to be applied to the wrapper element:" />
    <Input id="input-targeting-3" {...propsForInput} {...propsForWrapper} wrapper={propsTargettingWrapper} />

    <Text content="Input with input and wrapper slot props that have to be applied to the input and wrapper elements, respectively:" />
    <Input
      id="input-targeting-4"
      {...propsForInput}
      {...propsForWrapper}
      input={propsTargettingInput}
      wrapper={propsTargettingWrapper}
    />
  </Grid>
);

export default InputExampleTargeting;
