import * as React from 'react';

import ComponentExample from '../../../../components/ComponentDoc/ComponentExample';
import NonPublicSection from '../../../../components/ComponentDoc/NonPublicSection';

const Slots = () => (
  <NonPublicSection title="Slots">
    <ComponentExample
      title="HeaderMessage"
      description="A dropdown can display a custom header message."
      examplePath="components/Dropdown/Slots/DropdownExampleHeaderMessage"
    />
  </NonPublicSection>
);

export default Slots;
