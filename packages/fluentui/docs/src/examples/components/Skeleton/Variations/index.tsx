import * as React from 'react';
import ComponentExample from '../../../../components/ComponentDoc/ComponentExample';
import ExampleSection from '../../../../components/ComponentDoc/ExampleSection';

const Variations = () => (
  <ExampleSection title="Variations">
    <ComponentExample
      title="Animations"
      description="A Skeleton can have different animations"
      examplePath="components/Skeleton/Variations/SkeletonExampleAnimations"
    />
    <ComponentExample
      title="Components"
      description="Some components has its' own pre defined skeleton"
      examplePath="components/Skeleton/Variations/SkeletonExampleComponents"
    />
  </ExampleSection>
);

export default Variations;
