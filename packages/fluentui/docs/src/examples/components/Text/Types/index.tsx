import * as React from 'react';
import ComponentExample from '../../../../components/ComponentDoc/ComponentExample';
import ExampleSection from '../../../../components/ComponentDoc/ExampleSection';

const Types = () => (
  <ExampleSection title="Types">
    <ComponentExample
      title="Size"
      description="The Text component supports a number of text sizes."
      examplePath="components/Text/Types/TextSizesExample"
    />
    <ComponentExample
      title="Weight"
      description="The Text component supports a number of text weights."
      examplePath="components/Text/Types/TextWeightsExample"
    />
  </ExampleSection>
);

export default Types;
