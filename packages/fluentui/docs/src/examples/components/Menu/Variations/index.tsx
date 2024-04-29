import * as React from 'react';
import ComponentExample from '../../../../components/ComponentDoc/ComponentExample';
import ExampleSection from '../../../../components/ComponentDoc/ExampleSection';
import NonPublicSection from '../../../../components/ComponentDoc/NonPublicSection';

const Variations = () => (
  <ExampleSection title="Variations">
    <ComponentExample
      title="Vertical"
      description="A vertical menu displays elements vertically."
      examplePath="components/Menu/Variations/MenuExampleVertical"
    />
    <ComponentExample
      title="Vertical &amp; Pointing"
      examplePath="components/Menu/Variations/MenuExampleVerticalPointing"
    />
    <ComponentExample
      title="Fluid"
      description="A vertical menu can be fluid which takes up the full space of its container. A horizontal menu does this by default."
      examplePath="components/Menu/Variations/MenuExampleFluid"
    />
    <NonPublicSection title="Visual tests">
      <ComponentExample examplePath="components/Menu/Variations/MenuExampleVerticalPrimary" />
    </NonPublicSection>
  </ExampleSection>
);

export default Variations;
