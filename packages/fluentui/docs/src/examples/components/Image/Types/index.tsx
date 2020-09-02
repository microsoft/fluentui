import * as React from 'react';
import ComponentExample from '../../../../components/ComponentDoc/ComponentExample';
import ExampleSection from '../../../../components/ComponentDoc/ExampleSection';

const Types = () => (
  <ExampleSection title="Types">
    <ComponentExample
      title="Default"
      description="A default Image."
      examplePath="components/Image/Types/ImageExample"
    />
    <ComponentExample
      title="Avatar"
      description="An image may be formatted to appear inline with text as an avatar."
      examplePath="components/Image/Types/ImageExampleAvatar"
    />
  </ExampleSection>
);

export default Types;
