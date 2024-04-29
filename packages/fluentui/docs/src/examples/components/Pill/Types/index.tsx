import * as React from 'react';

import ComponentExample from '../../../../components/ComponentDoc/ComponentExample';
import ExampleSection from '../../../../components/ComponentDoc/ExampleSection';

const Types = () => (
  <ExampleSection title="Types">
    <ComponentExample title="Default" description="A default Pill." examplePath="components/Pill/Types/PillExample" />
    <ComponentExample
      title="PillGroup"
      description="A set of pill semantically wrapped by a PillGroup Container."
      examplePath="components/Pill/Types/PillsExample"
    />
  </ExampleSection>
);

export default Types;
