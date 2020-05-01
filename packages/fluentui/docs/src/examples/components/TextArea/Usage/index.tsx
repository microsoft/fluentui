import * as React from 'react';
import ComponentExample from '../../../../components/ComponentDoc/ComponentExample';
import ExampleSection from '../../../../components/ComponentDoc/ExampleSection';

const Usage = () => (
  <ExampleSection title="Usage">
    <ComponentExample
      title="Maximum character length"
      description="A text area with a limited character length allowed."
      examplePath="components/TextArea/Usage/TextAreaExampleMaxLength"
    />
    <ComponentExample
      title="Custom height"
      description="A text area can have a custom height."
      examplePath="components/TextArea/Usage/TextAreaExampleHeight"
    />
    <ComponentExample
      title="Resize"
      description="A text area can be resized either horizontally, vertically, or in both directions. (Not supported in IE)"
      examplePath="components/TextArea/Usage/TextAreaExampleResize"
    />
  </ExampleSection>
);

export default Usage;
