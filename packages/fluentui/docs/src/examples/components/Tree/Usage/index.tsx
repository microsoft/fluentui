import * as React from 'react';

import ComponentExample from '../../../../components/ComponentDoc/ComponentExample';
import ExampleSection from '../../../../components/ComponentDoc/ExampleSection';

const Usage = () => (
  <ExampleSection title="Usage">
    <ComponentExample
      title="Custom Title"
      description="A Tree with customized title rendering."
      examplePath="components/Tree/Usage/TreeTitleCustomizationExample"
    />
    <ComponentExample
      title="Initially Open"
      description="A Tree with some items initially open."
      examplePath="components/Tree/Usage/TreeInitiallyOpenExample"
    />
    <ComponentExample
      title="As a List"
      description="A Tree with list accessibility roles."
      examplePath="components/Tree/Usage/TreeAsListExample"
    />
    <ComponentExample
      title="Basic Multi Select"
      description="A basic multiselect Tree."
      examplePath="components/Tree/Usage/TreeMultiselectBasicExample"
    />
    <ComponentExample
      title="Multi select"
      description="A multiselect Tree."
      examplePath="components/Tree/Usage/TreeMultiselectExample"
    />
    <ComponentExample
      title="Multi select As a List"
      description="A multiselect Tree with list accessibility roles."
      examplePath="components/Tree/Usage/TreeMultiselectAsListExample"
    />
  </ExampleSection>
);

export default Usage;
