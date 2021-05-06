import * as React from 'react';

import ComponentExample from '../../../../components/ComponentDoc/ComponentExample';
import NonPublicSection from '../../../../components/ComponentDoc/NonPublicSection';

const Usage = () => (
  <NonPublicSection title="Visual tests">
    <ComponentExample examplePath="components/Toolbar/Visual/ToolbarExampleVariables" />
    <ComponentExample examplePath="components/Toolbar/Visual/ToolbarExampleOverflowPositioning" />
    <ComponentExample examplePath="components/Toolbar/Visual/ToolbarExampleChatMessage" />
    <ComponentExample examplePath="components/Toolbar/Visual/ToolbarExampleCompose" />
  </NonPublicSection>
);

export default Usage;
