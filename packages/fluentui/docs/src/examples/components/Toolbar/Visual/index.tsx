import * as React from 'react';

import ComponentExample from '../../../../components/ComponentDoc/ComponentExample';
import NonPublicSection from '../../../../components/ComponentDoc/NonPublicSection';

const Usage = () => (
  <NonPublicSection title="Visual tests">
    <ComponentExample
      toolbarAriaLabel="Example visual test with expanded state "
      examplePath="components/Toolbar/Visual/ToolbarExampleVariables"
    />
    <ComponentExample
      toolbarAriaLabel="Example visual test with editor toolbar"
      examplePath="components/Toolbar/Visual/ToolbarExampleOverflowPositioning"
    />
  </NonPublicSection>
);

export default Usage;
