import * as React from 'react';
import ComponentExample from '../../../../components/ComponentDoc/ComponentExample';
import ExampleSection from '../../../../components/ComponentDoc/ExampleSection';

const Usage = () => (
  <ExampleSection title="Usage">
    <ComponentExample
      title="Default"
      description="A default skeleton."
      examplePath="components/Skeleton/Usage/SkeletonExampleDefault"
    />
    <ComponentExample
      title="Card"
      description="A skeleton in a card."
      examplePath="components/Skeleton/Usage/SkeletonExampleCard"
    />
  </ExampleSection>
);

export default Usage;
