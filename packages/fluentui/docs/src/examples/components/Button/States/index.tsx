import * as React from 'react';
import ComponentExample from '../../../../components/ComponentDoc/ComponentExample';
import ExampleSection from '../../../../components/ComponentDoc/ExampleSection';

const States = () => (
  <ExampleSection title="States">
    <ComponentExample
      title="Disabled"
      description="A button can show it is currently unable to be interacted with."
      examplePath="components/Button/States/ButtonExampleDisabled"
    />
    <ComponentExample
      title="Disabled Focusable"
      description="A button can show it is currently unable to be interacted with, but still be focusable."
      examplePath="components/Button/States/ButtonExampleDisabledFocusable"
    />
    <ComponentExample
      title="Loading"
      description="A button can show a loading indicator."
      examplePath="components/Button/States/ButtonExampleLoading"
    />
  </ExampleSection>
);

export default States;
