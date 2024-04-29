import * as React from 'react';

import PrototypePerfExample from '../../../components/ComponentDoc/PrototypePerfExample';
import ExampleSection from '../../../components/ComponentDoc/ExampleSection';

const PerformanceTests = () => (
  <ExampleSection title="Roster Performance">
    <PrototypePerfExample
      title="Roster (containing 50 people)"
      examplePath="components/PerformanceTests/Performance/Roster.perf"
    />
  </ExampleSection>
);

export default PerformanceTests;
