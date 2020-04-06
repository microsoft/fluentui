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
  </ExampleSection>
);

export default Usage;
