import * as React from 'react';
import ComponentExample from '../../../../components/ComponentDoc/ComponentExample';
import ExampleSection from '../../../../components/ComponentDoc/ExampleSection';

const Types = () => (
  <ExampleSection title="Types">
    <ComponentExample
      title="Default"
      description="A default Divider."
      examplePath="components/Divider/Types/DividerExample"
    />
    <ComponentExample
      title="Divider with content"
      description="A Divider can contain text or other content displayed alongside with the line."
      examplePath="components/Divider/Types/DividerExampleContent"
    />
  </ExampleSection>
);

export default Types;
