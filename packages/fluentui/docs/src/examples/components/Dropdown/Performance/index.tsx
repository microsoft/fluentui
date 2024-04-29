import * as React from 'react';

import ComponentPerfExample from '../../../../components/ComponentDoc/ComponentPerfExample';
import ExampleSection from '../../../../components/ComponentDoc/ExampleSection';

const Performance = () => (
  <ExampleSection title="Performance">
    <ComponentPerfExample
      title="Default"
      description="A default test."
      examplePath="components/Dropdown/Performance/DropdownManyItems.perf"
    />
  </ExampleSection>
);

export default Performance;
