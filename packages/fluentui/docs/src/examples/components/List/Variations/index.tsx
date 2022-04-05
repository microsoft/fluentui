import * as React from 'react';

import ComponentExample from '../../../../components/ComponentDoc/ComponentExample';
import ExampleSection from '../../../../components/ComponentDoc/ExampleSection';
import NonPublicSection from '../../../../components/ComponentDoc/NonPublicSection';

const Variations = () => (
  <>
    <ExampleSection title="Variations">
      <ComponentExample
        title="Truncate"
        description="A list can truncate the header and content of items items."
        examplePath="components/List/Variations/ListExampleTruncate"
      />
      <ComponentExample
        title="Horizontal"
        description="A list can align it's items horizontally."
        examplePath="components/List/Variations/ListExampleHorizontal"
      />
    </ExampleSection>
    <NonPublicSection title="Variations for visual tests">
      <ComponentExample examplePath="components/List/Variations/ListExampleFixedTruncate" />
    </NonPublicSection>
  </>
);

export default Variations;
