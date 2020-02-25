import * as React from 'react';

import ComponentPerfExample from '../../../../components/ComponentDoc/ComponentPerfExample';
import ExampleSection from '../../../../components/ComponentDoc/ExampleSection';

const Performance = () => (
  <ExampleSection title="Performance">
    <ComponentPerfExample
      title="Merge themes"
      description="mergeThemes perf"
      examplePath="components/Provider/Performance/ProviderMergeThemes.perf"
    />
  </ExampleSection>
);

export default Performance;
