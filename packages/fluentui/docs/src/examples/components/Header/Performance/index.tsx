import * as React from 'react';

import ComponentPerfExample from '../../../../components/ComponentDoc/ComponentPerfExample';
import ExampleSection from '../../../../components/ComponentDoc/ExampleSection';

const Performance = () => (
  <ExampleSection title="Performance">
    <ComponentPerfExample
      title="Default"
      description="A default test."
      examplePath="components/Header/Performance/HeaderSlots.perf"
    />
    <ComponentPerfExample
      title="Minimal"
      description="Header with no props."
      examplePath="components/Header/Performance/HeaderMinimal.perf"
    />
  </ExampleSection>
);

export default Performance;
