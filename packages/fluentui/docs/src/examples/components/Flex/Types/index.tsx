import * as React from 'react';
import ComponentExample from '../../../../components/ComponentDoc/ComponentExample';
import ExampleSection from '../../../../components/ComponentDoc/ExampleSection';

const Types = () => (
  <ExampleSection title="Types">
    <ComponentExample
      title="Media Card"
      description="Flex items alignment options."
      examplePath="components/Flex/Types/FlexExampleMediaCard"
    />
    <ComponentExample
      title="Input"
      description="Flex items alignment options."
      examplePath="components/Flex/Types/FlexExampleInput"
    />
    <ComponentExample
      title="Nav Menu"
      description="Flex items alignment options."
      examplePath="components/Flex/Types/FlexExampleNavMenu"
    />
    <ComponentExample
      title="Items Alignment"
      description="Flex items alignment options."
      examplePath="components/Flex/Types/FlexExampleItemsAlignment"
    />
    <ComponentExample
      title="Mixed Alignment"
      description="Flex mixed alignment feature."
      examplePath="components/Flex/Types/FlexExampleMixedAlignment"
    />
    <ComponentExample
      title="Columns (item size)"
      description="Flex columns example."
      examplePath="components/Flex/Types/FlexExampleColumns"
    />
  </ExampleSection>
);

export default Types;
