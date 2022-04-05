import * as React from 'react';

import ExampleSection from '../../../../components/ComponentDoc/ExampleSection';
import ComponentBundleSizeExample from '../../../../components/ComponentDoc/ComponentBundleSizeExample';

const Performance = () => (
  <ExampleSection title="Performance">
    <ComponentBundleSizeExample title="Bundle size" examplePath="components/Box/Performance/BoxDefault.bsize" />
  </ExampleSection>
);

export default Performance;
