import * as React from 'react';

import ComponentExample from '../../../../components/ComponentDoc/ComponentExample';
import ExampleSection from '../../../../components/ComponentDoc/ExampleSection';

const Usage = () => (
  <ExampleSection title="Usage">
    <ComponentExample
      title="Target"
      description="A Provider allows to define target document to apply styles."
      examplePath="components/Provider/Usage/ProviderExampleTarget"
    />
    <ComponentExample
      description={
        <>
          <code>iframe</code> can be also used as <code>target</code>.
        </>
      }
      examplePath="components/Provider/Usage/ProviderExampleTargetFrame"
    />
  </ExampleSection>
);

export default Usage;
