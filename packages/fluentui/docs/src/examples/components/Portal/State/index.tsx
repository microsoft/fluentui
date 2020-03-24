import * as React from 'react';

import ComponentExample from '../../../../components/ComponentDoc/ComponentExample';
import ExampleSection from '../../../../components/ComponentDoc/ExampleSection';

const PortalStateExamples = () => (
  <ExampleSection title="State">
    <ComponentExample
      title="Open"
      description="A portal can be opened."
      examplePath="components/Portal/State/PortalExampleOpen"
    />
  </ExampleSection>
);

export default PortalStateExamples;
