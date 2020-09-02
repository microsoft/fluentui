import * as React from 'react';

import ComponentPerfExample from '../../../../components/ComponentDoc/ComponentPerfExample';
import ExampleSection from '../../../../components/ComponentDoc/ExampleSection';

const Performance = () => (
  <ExampleSection title="Performance">
    <ComponentPerfExample title="Minimal" examplePath="components/Table/Performance/TableMinimal.perf" />
    <ComponentPerfExample title="With many items" examplePath="components/Table/Performance/TableManyItems.perf" />
  </ExampleSection>
);

export default Performance;
