import * as React from 'react';
import ComponentExample from '../../../../components/ComponentDoc/ComponentExample';
import ExampleSection from '../../../../components/ComponentDoc/ExampleSection';

const States = () => (
  <ExampleSection title="States">
    <ComponentExample
      title="Disabled"
      description="The disabled state for a Text component."
      examplePath="components/Text/States/TextExampleDisabled"
    />
    <ComponentExample
      title="Error"
      description="The error state for a Text component."
      examplePath="components/Text/States/TextExampleError"
    />
    <ComponentExample
      title="Success"
      description="The success state for a Text component."
      examplePath="components/Text/States/TextExampleSuccess"
    />
    <ComponentExample
      title="Temporary"
      description="A text can be used to signify a temporary state."
      examplePath="components/Text/States/TextExampleTemporary"
    />
    <ComponentExample
      title="Truncated"
      description="Truncated text in a Text component."
      examplePath="components/Text/States/TextExampleTruncated"
    />
  </ExampleSection>
);

export default States;
