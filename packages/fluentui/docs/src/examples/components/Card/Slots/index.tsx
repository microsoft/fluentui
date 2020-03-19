import * as React from 'react';

import ComponentExample from '../../../../components/ComponentDoc/ComponentExample';
import ExampleSection from '../../../../components/ComponentDoc/ExampleSection';

const Slots = () => (
  <ExampleSection title="Slots">
    <ComponentExample
      title="Header"
      description="A card can contain a header slot."
      examplePath="components/Card/Slots/CardExampleHeader"
    />
    <ComponentExample title="Body" description="A card can contain a header slot." examplePath="components/Card/Slots/CardExampleBody" />
    <ComponentExample
      title="Footer"
      description="A card can contain a header slot."
      examplePath="components/Card/Slots/CardExampleFooter"
    />
    <ComponentExample
      title="Preview"
      description="A card can contain a header slot."
      examplePath="components/Card/Slots/CardExamplePreview"
    />
  </ExampleSection>
);

export default Slots;
