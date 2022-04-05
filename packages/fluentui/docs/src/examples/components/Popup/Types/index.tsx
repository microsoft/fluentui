import * as React from 'react';

import ComponentExample from '../../../../components/ComponentDoc/ComponentExample';
import ExampleSection from '../../../../components/ComponentDoc/ExampleSection';

const Types = () => (
  <ExampleSection title="Types">
    <ComponentExample
      title="Default"
      description="A default popup."
      examplePath="components/Popup/Types/PopupExample"
    />
    <ComponentExample
      title="Pointing"
      description="A popup can have a pointer."
      examplePath="components/Popup/Types/PopupExamplePointing"
    />
    <ComponentExample
      title="Controlled"
      description="Note that if Popup is controlled, then its 'open' prop value could be changed either by parent component, or by user actions (e.g. key press) - thus it is necessary to handle 'onOpenChange' event. Try to type some text into popup's input field and press ESC to see the effect."
      examplePath="components/Popup/Types/PopupControlledExample"
    />
    <ComponentExample
      title="Focus Trap"
      description="Popup content traps focus on appearance by using dedicated accessibility behavior."
      examplePath="components/Popup/Types/PopupFocusTrapExample"
    />
    <ComponentExample
      title="Custom Target"
      description="By default Popup uses trigger element as the one it is displayed for, but it is possible to provide any DOM element as popup's target."
      examplePath="components/Popup/Types/PopupCustomTargetExample"
    />
    <ComponentExample
      title="Inline"
      description="The content of the popup can be rendered next to the trigger element instead of the body."
      examplePath="components/Popup/Types/PopupExampleInline"
    />
  </ExampleSection>
);

export default Types;
