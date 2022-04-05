import * as React from 'react';
import ComponentExample from '../../../../components/ComponentDoc/ComponentExample';
import ExampleSection from '../../../../components/ComponentDoc/ExampleSection';

const Variations = () => (
  <ExampleSection title="Variations">
    <ComponentExample
      title="Description"
      description="Headers may contain description."
      examplePath="components/Header/Variations/HeaderExampleDescription"
    />
    <ComponentExample
      title="Description customizations"
      description="Descriptions can be customize according to the needs of the user."
      examplePath="components/Header/Variations/HeaderExampleDescriptionCustomization"
    />
    <ComponentExample
      title="Align"
      description="Headers may be aligned to the start, end, center or justify."
      examplePath="components/Header/Variations/HeaderExampleAlign"
    />
    <ComponentExample
      title="Color"
      description="Headers and descriptions can have colors."
      examplePath="components/Header/Variations/HeaderExampleColor"
    />
  </ExampleSection>
);

export default Variations;
