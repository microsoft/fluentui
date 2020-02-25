import * as React from 'react';

import ComponentExample from '../../../../components/ComponentDoc/ComponentExample';
import ExampleSection from '../../../../components/ComponentDoc/ExampleSection';

const States = () => (
  <ExampleSection title="States">
    <ComponentExample
      title="Open"
      description="The Tooltip's open state can be controlled. Note that if Tooltip is controlled, then its 'open' prop value could be changed either by parent component, or by user actions (e.g. key press) - thus it is necessary to handle 'onOpenChange' event."
      examplePath="components/Tooltip/States/TooltipOpenControlledExample"
    />
  </ExampleSection>
);

export default States;
