import * as React from 'react';
import ComponentExample from '../../../../components/ComponentDoc/ComponentExample';
import ExampleSection from '../../../../components/ComponentDoc/ExampleSection';

const States = () => (
  <ExampleSection title="States">
    <ComponentExample
      title="Disabled"
      description="A slider can be read-only and unable to change states."
      examplePath="components/Slider/States/SliderExampleDisabled"
    />
  </ExampleSection>
);

export default States;
