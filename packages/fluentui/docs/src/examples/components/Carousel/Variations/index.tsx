import * as React from 'react';
import ComponentExample from '../../../../components/ComponentDoc/ComponentExample';
import ExampleSection from '../../../../components/ComponentDoc/ExampleSection';

const Variations = () => (
  <ExampleSection title="Variations">
    <ComponentExample
      title="Circular"
      description="A Carousel's items navigation can be circular."
      examplePath="components/Carousel/Variations/CarouselCircularExample"
    />

    <ComponentExample
      title="Carousel with actionable elements"
      description="A Carousel can have actionable elements inside."
      examplePath="components/Carousel/Variations/CarouselExampleWithFocusableElements"
    />
  </ExampleSection>
);

export default Variations;
