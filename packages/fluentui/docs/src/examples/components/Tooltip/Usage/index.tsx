import * as React from 'react';

import ComponentExample from '../../../../components/ComponentDoc/ComponentExample';
import ExampleSection from '../../../../components/ComponentDoc/ExampleSection';

const Usage = () => (
  <ExampleSection title="Usage">
    <ComponentExample
      title="Custom Target"
      description="By default Tooltip uses trigger element as the one it is displayed for, but it is possible to provide any DOM element as tooltip's target."
      examplePath="components/Tooltip/Usage/TooltipExampleTarget"
    />
    <ComponentExample
      title="Disabled Trigger"
      description="When the tooltip should appear on a disabled element, it should be added on the wrapper on the element. Accessibility behavior is not applied to the wrapping element by default this case, it is recommended to test accessibility aspects manually."
      examplePath="components/Tooltip/Usage/TooltipExampleDisabledTrigger"
    />
    <ComponentExample
      title="Tooltip in a Dialog"
      description="A toopltip appears correctly in other overlay elements such as dialogs."
      examplePath="components/Tooltip/Usage/TooltipExampleDialogContent"
    />
  </ExampleSection>
);

export default Usage;
