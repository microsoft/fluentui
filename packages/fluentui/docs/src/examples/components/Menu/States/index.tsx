import * as React from 'react';
import ComponentExample from '../../../../components/ComponentDoc/ComponentExample';
import ExampleSection from '../../../../components/ComponentDoc/ExampleSection';

const States = () => (
  <ExampleSection title="States">
    <ComponentExample
      title="Disabled menu item"
      description="A menu item can be disabled."
      examplePath="components/Menu/States/MenuItemExampleDisabled"
    />
    <ComponentExample
      title="Menu wit controlled state"
      description="A menu can have its state controlled."
      examplePath="components/Menu/States/MenuControlledExample"
    />
  </ExampleSection>
);

export default States;
