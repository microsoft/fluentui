import * as React from 'react';

import ComponentExample from '../../../../components/ComponentDoc/ComponentExample';
import ExampleSection from '../../../../components/ComponentDoc/ExampleSection';

const Usage = () => (
  <ExampleSection title="Usage">
    <ComponentExample
      title="In scrollable container"
      description="A Chat can be placed in a scrollable container."
      examplePath="components/Chat/Usage/ChatExampleInScrollable"
    />
  </ExampleSection>
);

export default Usage;
