import * as React from 'react';

import ComponentExample from '../../../../components/ComponentDoc/ComponentExample';
import ExampleSection from '../../../../components/ComponentDoc/ExampleSection';

const State = () => (
  <ExampleSection title="State">
    <ComponentExample
      title="Disabled"
      description="A disabled Pill."
      examplePath="components/Pill/State/PillExampleDisabled"
    />
  </ExampleSection>
);

export default State;
