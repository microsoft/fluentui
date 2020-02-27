import * as React from 'react';

import ComponentExample from '../../../../components/ComponentDoc/ComponentExample';
import ExampleSection from '../../../../components/ComponentDoc/ExampleSection';

const Slots = () => (
  <ExampleSection title="Slots">
    <ComponentExample
      title="Icon and Content"
      description="A Split Button can have icon next to content."
      examplePath="components/SplitButton/Slots/SplitButtonIconAndContentExample"
    />
    <ComponentExample
      title="Toggle Button"
      description="A Split Button can have its toggle button customized."
      examplePath="components/SplitButton/Slots/SplitButtonToggleButtonExample"
    />
  </ExampleSection>
);

export default Slots;
