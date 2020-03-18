import * as React from 'react';
import ComponentExample from '../../../../components/ComponentDoc/ComponentExample';
import ExampleSection from '../../../../components/ComponentDoc/ExampleSection';

const State = () => (
  <ExampleSection title="State">
    <ComponentExample
      title="Disabled"
      description="A disabled Input can show it is currently unable to be interacted with."
      examplePath="components/Input/State/InputExampleDisabled"
    />
  </ExampleSection>
);

export default State;
