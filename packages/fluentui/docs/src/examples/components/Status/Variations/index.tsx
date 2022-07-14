import * as React from 'react';
import ComponentExample from '../../../../components/ComponentDoc/ComponentExample';
import ExampleSection from '../../../../components/ComponentDoc/ExampleSection';

const Variations = () => (
  <ExampleSection title="Variations">
    <ComponentExample
      title="Color"
      description="A status can have colors."
      examplePath="components/Status/Variations/StatusColorExample"
    />
    <ComponentExample
      title="Icon"
      description="A status can have an icon."
      examplePath="components/Status/Variations/StatusIconExample"
    />
    <ComponentExample
      title="Size"
      description="A status can have sizes."
      examplePath="components/Status/Variations/StatusSizeExample"
    />
    <ComponentExample
      title="Custom"
      description="A status can be used to show different colors and icons."
      examplePath="components/Status/Variations/StatusCustomExample"
    />
  </ExampleSection>
);

export default Variations;
