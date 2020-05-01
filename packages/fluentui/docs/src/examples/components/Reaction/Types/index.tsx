import * as React from 'react';

import ComponentExample from '../../../../components/ComponentDoc/ComponentExample';
import ExampleSection from '../../../../components/ComponentDoc/ExampleSection';

const Types = () => (
  <ExampleSection title="Types">
    <ComponentExample
      title="Default"
      description="A default Reaction."
      examplePath="components/Reaction/Types/ReactionExample"
    />
    <ComponentExample
      title="Reaction group"
      description="Reactions can be grouped together."
      examplePath="components/Reaction/Types/ReactionGroupExample"
    />
  </ExampleSection>
);

export default Types;
