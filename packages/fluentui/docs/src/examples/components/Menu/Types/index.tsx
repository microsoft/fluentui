import * as React from 'react';
import ComponentExample from '../../../../components/ComponentDoc/ComponentExample';
import ExampleSection from '../../../../components/ComponentDoc/ExampleSection';

const Types = () => (
  <ExampleSection title="Types">
    <ComponentExample title="Default" description="A default menu." examplePath="components/Menu/Types/MenuExample" />
    <ComponentExample
      title="Pointing"
      description="A menu can point to show its relationship to nearby content."
      examplePath="components/Menu/Types/MenuExamplePointing"
    />
    <ComponentExample
      title="Underlined"
      description="A menu can underline the active element."
      examplePath="components/Menu/Types/MenuExampleUnderlined"
    />
  </ExampleSection>
);

export default Types;
