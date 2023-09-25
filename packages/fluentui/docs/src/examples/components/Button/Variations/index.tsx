import * as React from 'react';
import ComponentExample from '../../../../components/ComponentDoc/ComponentExample';
import ExampleSection from '../../../../components/ComponentDoc/ExampleSection';

const Variations = () => (
  <ExampleSection title="Variations">
    <ComponentExample
      title="Fluid"
      description="A button can take the width of its container."
      examplePath="components/Button/Variations/ButtonExampleFluid"
    />
    <ComponentExample
      title="Circular"
      description="A button can be circular."
      examplePath="components/Button/Variations/ButtonExampleCircular"
    />
    <ComponentExample
      title="Size"
      description="A button can have either be default size or small."
      examplePath="components/Button/Variations/ButtonExampleSize"
    />
    <ComponentExample
      title="Flat or Elevated"
      description="A button can be elevated or flat."
      examplePath="components/Button/Variations/ButtonExampleFlat"
    />
  </ExampleSection>
);

export default Variations;
