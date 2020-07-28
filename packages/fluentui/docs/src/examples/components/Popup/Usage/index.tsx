import * as React from 'react';

import ComponentExample from '../../../../components/ComponentDoc/ComponentExample';
import ExampleSection from '../../../../components/ComponentDoc/ExampleSection';

const Usage = () => (
  <ExampleSection title="Usage">
    <ComponentExample
      title="Async popup position update"
      description="A popup can be forced to update its position - this comes in handy in async data loading scenarios."
      examplePath="components/Popup/Usage/PopupExampleAsync"
    />
    <ComponentExample
      title="Triggering popup on different actions"
      description="A popup can be triggered on click, hover or focus."
      examplePath="components/Popup/Usage/PopupExampleOn"
    />
    <ComponentExample
      title="Using the focus trap behavior"
      description="Combining the triggers with popup focus trap behavior, will focus the first focusable element inside the content of the popup."
      examplePath="components/Popup/Usage/PopupExampleOnWithFocusTrap"
    />
    <ComponentExample
      title="Combined triggering actions"
      description="The triggering actions can be combined."
      examplePath="components/Popup/Usage/PopupExampleOnMultiple"
    />
    <ComponentExample
      title="Popup context on element"
      description="Context poup can be applied on a non-focusable element if the element contains focusable children."
      examplePath="components/Popup/Usage/PopupExampleContextOnElement"
    />
    <ComponentExample
      title="Nested"
      description="Popups can be nested."
      examplePath="components/Popup/Usage/PopupExampleNested"
    />
    <ComponentExample
      title="With close button"
      description="Popups can have close button."
      examplePath="components/Popup/Usage/PopupExampleCloseButton"
    />
  </ExampleSection>
);

export default Usage;
