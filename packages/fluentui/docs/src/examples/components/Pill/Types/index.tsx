import * as React from 'react';

import ComponentExample from '../../../../components/ComponentDoc/ComponentExample';
import ExampleSection from '../../../../components/ComponentDoc/ExampleSection';

const Types = () => (
  <ExampleSection title="Types">
    <ComponentExample title="Default" description="A default Pill." examplePath="components/Pill/Types/PillExample" />
    <ComponentExample
      title="Pills"
      description="A set of pills semantically wrapped by a Pills Container."
      examplePath="components/Pill/Types/PillsExample"
    />
  </ExampleSection>
);

export default Types;
