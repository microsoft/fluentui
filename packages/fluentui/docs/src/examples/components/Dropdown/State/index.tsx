import * as React from 'react';

import ComponentExample from '../../../../components/ComponentDoc/ComponentExample';
import ExampleSection from '../../../../components/ComponentDoc/ExampleSection';

const State = () => (
  <ExampleSection title="State">
    <ComponentExample
      title="Disabled"
      description="A dropdown can show it is currently unable to be interacted with."
      examplePath="components/Dropdown/State/DropdownExampleDisabled"
    />
    <ComponentExample
      title="Loading"
      description="A dropdown can show that it is currently loading data."
      examplePath="components/Dropdown/State/DropdownExampleLoading"
    />
  </ExampleSection>
);

export default State;
