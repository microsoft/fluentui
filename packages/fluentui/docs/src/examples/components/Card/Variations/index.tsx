import * as React from 'react';

import ComponentExample from '../../../../components/ComponentDoc/ComponentExample';
import ExampleSection from '../../../../components/ComponentDoc/ExampleSection';

const Variations = () => (
  <ExampleSection title="Variations">
    <ComponentExample
      title="Centered"
      description="Centered card"
      examplePath="components/Card/Usage/CardExampleCentered"
    />
    <ComponentExample
      title="Horizontal"
      description="Horizontal card"
      examplePath="components/Card/Usage/CardExampleHorizontal"
    />
  </ExampleSection>
);

export default Variations;
