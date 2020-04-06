import * as React from 'react';
import ComponentExample from '../../../../components/ComponentDoc/ComponentExample';
import ExampleSection from '../../../../components/ComponentDoc/ExampleSection';

const Variations = () => (
  <ExampleSection title="Variations">
    <ComponentExample
      title="Inverted"
      description="A segment can have its colors inverted for contrast."
      examplePath="components/Segment/Variations/SegmentExampleInverted"
    />
    <ComponentExample
      title="Color"
      description="A segment can have different colors."
      examplePath="components/Segment/Variations/SegmentExampleColor"
    />
  </ExampleSection>
);

export default Variations;
