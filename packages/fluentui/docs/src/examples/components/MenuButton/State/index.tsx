import * as React from 'react';

import ComponentExample from '../../../../components/ComponentDoc/ComponentExample';
import ExampleSection from '../../../../components/ComponentDoc/ExampleSection';

const State = () => (
  <ExampleSection title="State">
    <ComponentExample
      title="Open"
      description="Note that if MenuButton is controlled, then its 'open' prop value could be changed either by parent component, or by user actions (e.g. key press) - thus it is necessary to handle 'onOpenChange' event."
      examplePath="components/MenuButton/State/MenuButtonExampleOpen"
    />
  </ExampleSection>
);

export default State;
