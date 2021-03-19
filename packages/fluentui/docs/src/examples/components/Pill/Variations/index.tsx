import * as React from 'react';

import ComponentExample from '../../../../components/ComponentDoc/ComponentExample';
import ExampleSection from '../../../../components/ComponentDoc/ExampleSection';

const Variations = () => (
  <ExampleSection title="Variations">
    <ComponentExample
      title="Sizes"
      description="A Pill can be sized."
      examplePath="components/Pill/Variations/PillExampleSizes"
    />
    <ComponentExample
      title="Rounded"
      description="A Pill can be rounded."
      examplePath="components/Pill/Variations/PillExampleRounded"
    />
  </ExampleSection>
);

export default Variations;
