import * as React from 'react';
import ComponentExample from '../../../../components/ComponentDoc/ComponentExample';
import ExampleSection from '../../../../components/ComponentDoc/ExampleSection';

const Types = () => (
  <ExampleSection title="Types">
    <ComponentExample
      title="Layout"
      description="A layout arranges content into areas."
      examplePath="components/Layout/Types/LayoutExample"
    />
    <ComponentExample
      title="Vertical"
      description="A layout can display its areas vertically."
      examplePath="components/Layout/Types/LayoutExampleVertical"
    />
  </ExampleSection>
);

export default Types;
