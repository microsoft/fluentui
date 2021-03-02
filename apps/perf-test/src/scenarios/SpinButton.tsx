import * as React from 'react';
import { SpinButton } from '@fluentui/react';

const Scenario = () => (
  <SpinButton
    defaultValue="0"
    label={'Basic SpinButton:'}
    min={0}
    max={100}
    step={1}
    incrementButtonAriaLabel={'Increase value by 1'}
    decrementButtonAriaLabel={'Decrease value by 1'}
  />
);

export default Scenario;
