import * as React from 'react';

import ExampleSection from '../../../../components/ComponentDoc/ExampleSection';
import ComponentBundleSizeExample from '../../../../components/ComponentDoc/ComponentBundleSizeExample';

const Performance = () => (
  <ExampleSection title="Performance">
    <ComponentBundleSizeExample
      title="Bundle size"
      examplePath="components/Accordion/Performance/AccordionDefault.bsize"
    />
  </ExampleSection>
);

export default Performance;
