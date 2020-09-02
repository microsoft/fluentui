import * as React from 'react';
import ComponentExample from '../../../../components/ComponentDoc/ComponentExample';
import ExampleSection from '../../../../components/ComponentDoc/ExampleSection';

const States = () => (
  <ExampleSection title="States">
    <ComponentExample
      title="Disabled"
      description="A card can show if it is currently unable to be interacted with."
      examplePath="components/Card/States/CardExampleDisabled"
    />
    <ComponentExample
      title="Selected"
      description="A card can show if it is currently selected."
      examplePath="components/Card/States/CardExampleSelected"
    />
  </ExampleSection>
);

export default States;
