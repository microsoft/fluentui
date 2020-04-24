import * as React from 'react';

import ComponentExample from '../../../../components/ComponentDoc/ComponentExample';
import ExampleSection from '../../../../components/ComponentDoc/ExampleSection';

const Usage = () => (
  <ExampleSection title="Usage">
    <ComponentExample
      title="Simple"
      description="Simple card with title, body and footer"
      examplePath="components/Card/Usage/CardExampleSimple"
    />
    <ComponentExample
      title="With preview and checkbox"
      description="Example of adding Checkbox in TopControls and setting up media preview"
      examplePath="components/Card/Usage/CardExampleWithPreview"
    />
    <ComponentExample
      title="Focusable card"
      description="Example of card which can be focused and clicked"
      examplePath="components/Card/Usage/CardExampleFocusable"
    />
    <ComponentExample
      title="Card with focusable children"
      description="Example of card which children can be focused and clicked"
      examplePath="components/Card/Usage/CardExampleFocusableChildren"
    />
  </ExampleSection>
);

export default Usage;
