import * as React from 'react';

import ComponentExample from '../../../../components/ComponentDoc/ComponentExample';
import ExampleSection from '../../../../components/ComponentDoc/ExampleSection';

const Types = () => (
  <ExampleSection title="Types">
    <ComponentExample
      title="Carousel"
      description="A carousel can display images."
      examplePath="components/Carousel/Types/CarouselExample"
    />
    <ComponentExample
      title="Carousel with Pagination"
      description="A carousel can have pagination instead of navigation."
      examplePath="components/Carousel/Types/CarouselPaginationExample"
    />
  </ExampleSection>
);

export default Types;
