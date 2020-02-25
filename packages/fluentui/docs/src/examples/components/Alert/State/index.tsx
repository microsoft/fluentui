import * as React from 'react';

import ComponentExample from '../../../../components/ComponentDoc/ComponentExample';
import ExampleSection from '../../../../components/ComponentDoc/ExampleSection';

const State = () => (
  <ExampleSection title="State">
    <ComponentExample
      title="Visible"
      description="An alert can be set to visible to force itself to be shown."
      examplePath="components/Alert/State/AlertExampleVisible"
    />
  </ExampleSection>
);

export default State;
