import * as React from 'react';

import ComponentPerfExample from '../../../../components/ComponentDoc/ComponentPerfExample';
import ExampleSection from '../../../../components/ComponentDoc/ExampleSection';

const Performance = () => (
  <ExampleSection title="Performance">
    <ComponentPerfExample
      title="Custom styled"
      description="Custom styled toolbar"
      examplePath="components/Toolbar/Performance/CustomToolbar.perf"
    />
  </ExampleSection>
);

export default Performance;
