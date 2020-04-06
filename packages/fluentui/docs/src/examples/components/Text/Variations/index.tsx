import * as React from 'react';
import ComponentExample from '../../../../components/ComponentDoc/ComponentExample';
import ExampleSection from '../../../../components/ComponentDoc/ExampleSection';

const Variations = () => (
  <ExampleSection title="Variations">
    <ComponentExample
      title="Align"
      description="Text may be aligned to the start, end, center or justify."
      examplePath="components/Text/Variations/TextExampleAlign"
    />
    <ComponentExample
      title="Color"
      description="A Text component can have different colors."
      examplePath="components/Text/Variations/TextExampleColor"
    />
    <ComponentExample
      title="@ mention"
      description="A Text component for @ mentions."
      examplePath="components/Text/Variations/TextExampleAtMention"
    />
    <ComponentExample
      title="Timestamp"
      description="A Text component for timestamps."
      examplePath="components/Text/Variations/TextExampleTimestamp"
    />
    <ComponentExample
      title="Important"
      description="A text can appear more important and draw user's attention."
      examplePath="components/Text/Variations/TextExampleImportant"
    />
  </ExampleSection>
);

export default Variations;
