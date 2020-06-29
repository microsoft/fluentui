import * as React from 'react';

import ComponentExample from '../../../../components/ComponentDoc/ComponentExample';
import ExampleSection from '../../../../components/ComponentDoc/ExampleSection';

const Variations = () => (
  <ExampleSection title="Variations">
    <ComponentExample
      title="Vertical"
      description="A slider can be displayed vertically."
      examplePath="components/Slider/Variations/SliderExampleVertical"
    />
    <ComponentExample
      title="Fluid"
      description="A slider can take up the width of its container."
      examplePath="components/Slider/Variations/SliderExampleFluid"
    />
  </ExampleSection>
);

export default Variations;
