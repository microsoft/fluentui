import * as React from 'react';

import ComponentPerfExample from '../../../../components/ComponentDoc/ComponentPerfExample';
import ExampleSection from '../../../../components/ComponentDoc/ExampleSection';
import ComponentBundleSizeExample from '../../../../components/ComponentDoc/ComponentBundleSizeExample';

const Performance = () => (
  <ExampleSection title="Performance">
    <ComponentPerfExample
      title="Default"
      description="A default test."
      examplePath="components/Attachment/Performance/AttachmentMinimal.perf"
    />
    <ComponentBundleSizeExample
      title="Bundle size"
      examplePath="components/Attachment/Performance/AttachmentDefault.bsize"
    />
  </ExampleSection>
);

export default Performance;
