import * as React from 'react';
import ComponentExample from '../../../../components/ComponentDoc/ComponentExample';
import ExampleSection from '../../../../components/ComponentDoc/ExampleSection';

const States = () => (
  <ExampleSection title="States">
    <ComponentExample
      title="Disabled"
      description="A text area that is read-only."
      examplePath="components/TextArea/States/TextAreaDisabledExample"
    />
    <ComponentExample
      title="Value"
      description="A text area with a value."
      examplePath="components/TextArea/States/TextAreaValueExample"
    />
  </ExampleSection>
);

export default States;
