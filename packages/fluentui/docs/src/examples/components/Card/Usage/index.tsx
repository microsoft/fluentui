import * as React from 'react';

import ComponentExample from '../../../../components/ComponentDoc/ComponentExample';
import ExampleSection from '../../../../components/ComponentDoc/ExampleSection';

const Usage = () => (
  <ExampleSection title="Usage">
    <ComponentExample
      title="Header"
      description="Simple card with header only"
      examplePath="components/Card/Usage/CardExampleSimpleOnlyHeader"
    />
    <ComponentExample title="Body" description="Simple card with body only" examplePath="components/Card/Usage/CardExampleSimpleOnlyBody" />
    <ComponentExample
      title="Footer"
      description="Simple card with footer only"
      examplePath="components/Card/Usage/CardExampleSimpleOnlyFooter"
    />
    <ComponentExample
      title="Preview"
      description="Simple card with preview media only"
      examplePath="components/Card/Usage/CardExampleSimpleOnlyPreview"
    />
    <ComponentExample
      title="Simple"
      description="Simple card with title, body and footer"
      examplePath="components/Card/Usage/CardExampleSimple"
    />
    <ComponentExample title="Centered" description="Centered card" examplePath="components/Card/Usage/CardExampleCentered" />
    <ComponentExample
      title="With preview and checkbox"
      description="Example of adding Checkbox in TopControls and setting up media preview"
      examplePath="components/Card/Usage/CardExamplePreview"
    />
    <ComponentExample title="Horizontal" description="Horizontal card" examplePath="components/Card/Usage/CardExampleHorizontal" />
  </ExampleSection>
);

export default Usage;
