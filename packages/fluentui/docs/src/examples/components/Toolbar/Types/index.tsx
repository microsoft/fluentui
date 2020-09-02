import * as React from 'react';
import ComponentExample from '../../../../components/ComponentDoc/ComponentExample';
import ExampleSection from '../../../../components/ComponentDoc/ExampleSection';

const Types = () => (
  <ExampleSection title="Types">
    <ComponentExample
      title="Default"
      description="A default Toolbar."
      examplePath="components/Toolbar/Types/ToolbarExample"
    />
    <ComponentExample
      title="Text editor toolbar"
      description="A Toolbar use case for a text editor."
      examplePath="components/Toolbar/Types/ToolbarExampleEditor"
    />
  </ExampleSection>
);

export default Types;
