import * as React from 'react';

import ComponentExample from '../../../../components/ComponentDoc/ComponentExample';
import ExampleSection from '../../../../components/ComponentDoc/ExampleSection';

const Variations = () => (
  <ExampleSection title="Variations">
    <ComponentExample
      title="Centered"
      description="Centered card"
      examplePath="components/Card/Variations/CardExampleCentered"
    />
    <ComponentExample
      title="Horizontal"
      description="Horizontal card"
      examplePath="components/Card/Variations/CardExampleHorizontal"
    />
  </ExampleSection>
);

export default Variations;
