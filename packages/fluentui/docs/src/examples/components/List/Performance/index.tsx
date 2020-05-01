import * as React from 'react';

import ComponentPerfExample from '../../../../components/ComponentDoc/ComponentPerfExample';
import ExampleSection from '../../../../components/ComponentDoc/ExampleSection';

const Performance = () => (
  <ExampleSection title="Performance">
    <ComponentPerfExample
      title="Common"
      description="A typical list with common slots filled."
      examplePath="components/List/Performance/ListCommon.perf"
    />
    <ComponentPerfExample
      title="With 60 items"
      description="A list to be benchmarked against a Tree with List Items."
      examplePath="components/List/Performance/ListWith60ListItems.perf"
    />
    <ComponentPerfExample
      title="Nested"
      description="A list with nested lists."
      examplePath="components/List/Performance/ListNested.perf"
    />
  </ExampleSection>
);

export default Performance;
