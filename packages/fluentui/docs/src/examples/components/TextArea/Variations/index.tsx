import * as React from 'react';
import ComponentExample from '../../../../components/ComponentDoc/ComponentExample';
import ExampleSection from '../../../../components/ComponentDoc/ExampleSection';

const Types = () => (
  <ExampleSection title="Variations">
    <ComponentExample
      title="Inverted colors"
      description="A text area can show an inverted background color."
      examplePath="components/TextArea/Variations/TextAreaExampleInverted"
    />
    <ComponentExample
      title="Fluid"
      description="A text area can take up the entire horizontal space of its parent container."
      examplePath="components/TextArea/Variations/TextAreaExampleFluid"
    />
  </ExampleSection>
);

export default Types;
