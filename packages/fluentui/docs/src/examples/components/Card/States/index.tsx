import * as React from 'react';
import ComponentExample from '../../../../components/ComponentDoc/ComponentExample';
import ExampleSection from '../../../../components/ComponentDoc/ExampleSection';

const States = () => (
  <ExampleSection title="States">
    <ComponentExample
      title="Disabled"
      description="A card can show it is currently unable to be interacted with."
      examplePath="components/Card/States/CardExampleDisabled"
    />
  </ExampleSection>
);

export default States;
