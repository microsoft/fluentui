import * as React from 'react';

import ComponentPerfExample from '../../../../components/ComponentDoc/ComponentPerfExample';
import ExampleSection from '../../../../components/ComponentDoc/ExampleSection';
import ComponentBundleSizeExample from '../../../../components/ComponentDoc/ComponentBundleSizeExample';

const Performance = () => (
  <ExampleSection title="Performance">
    <ComponentPerfExample
      title="Default"
      description="A default test."
      examplePath="components/Button/Performance/ButtonMinimal.perf"
    />
    <ComponentPerfExample title="Overrides" examplePath="components/Button/Performance/ButtonOverridesMiss.perf" />
    <ComponentPerfExample title="useCSS" examplePath="components/Button/Performance/ButtonUseCss.perf" />
    <ComponentPerfExample title="useCSS nesting" examplePath="components/Button/Performance/ButtonUseCssNesting.perf" />
    <ComponentBundleSizeExample title="Bundle size" examplePath="components/Button/Performance/ButtonDefault.bsize" />
  </ExampleSection>
);

export default Performance;
