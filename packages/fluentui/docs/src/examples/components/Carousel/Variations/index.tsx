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
      title="Thumbnails"
      description="A Carousel's items navigation can be thumbnail."
      examplePath="components/Carousel/Variations/CarouselThumbnailsExample"
    />

    <ComponentExample
      title="Carousel with actionable elements"
      description="A Carousel can have actionable elements inside."
      examplePath="components/Carousel/Variations/CarouselExampleWithFocusableElements"
    />

    <ComponentExample
      title="Carousel with slide in/out animation"
      description="A Carousel can have configured animations."
      examplePath="components/Carousel/Variations/CarouselSlideAnimationExample"
    />
  </ExampleSection>
);

export default Variations;
