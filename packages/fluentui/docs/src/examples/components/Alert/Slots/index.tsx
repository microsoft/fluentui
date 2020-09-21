import * as React from 'react';

import ComponentExample from '../../../../components/ComponentDoc/ComponentExample';
import ExampleSection from '../../../../components/ComponentDoc/ExampleSection';

const Slots = () => (
  <ExampleSection title="Slots">
    <ComponentExample
      title="Dismiss Action"
      description="An Alert can provide the user with an action."
      examplePath="components/Alert/Slots/AlertExampleDismissAction"
    />
    <ComponentExample
      title="Actions"
      description="An Alert can contain action buttons."
      examplePath="components/Alert/Slots/AlertExampleActions"
    />
    <ComponentExample
      title="Icon"
      description="An Alert can contain an icon."
      examplePath="components/Alert/Slots/AlertExampleIcon"
    />
    <ComponentExample
      title="Header"
      description="An Alert can contain a header."
      examplePath="components/Alert/Slots/AlertExampleHeader"
    />
  </ExampleSection>
);

export default Slots;
