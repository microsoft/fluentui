import * as React from 'react';

import ComponentExample from '../../../../components/ComponentDoc/ComponentExample';
import ExampleSection from '../../../../components/ComponentDoc/ExampleSection';

const Variations = () => (
  <ExampleSection title="Variations">
    <ComponentExample
      title="Alignment & Position"
      description="A tooltip can be positioned around its trigger and aligned relative to the trigger's margins. Click on a button to open a tooltip on a specific position and alignment."
      examplePath="components/Tooltip/Variations/TooltipExamplePosition"
    />
  </ExampleSection>
);

export default Variations;
