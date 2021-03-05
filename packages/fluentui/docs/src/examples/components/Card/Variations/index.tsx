import * as React from 'react';

import ComponentExample from '../../../../components/ComponentDoc/ComponentExample';
import ExampleSection from '../../../../components/ComponentDoc/ExampleSection';

const Variations = () => (
  <ExampleSection title="Variations">
    <ComponentExample
      title="Elevated"
      description="Card can have elevation styles"
      examplePath="components/Card/Variations/CardExampleElevated"
    />
    <ComponentExample
      title="Inverted"
      description="Card with styles for lighter background"
      examplePath="components/Card/Variations/CardExampleInverted"
    />
    <ComponentExample
      title="Ghost"
      description="Card with ghost styles"
      examplePath="components/Card/Variations/CardExampleQuiet"
    />
    <ComponentExample
      title="Centered"
      description="Centered card"
      examplePath="components/Card/Variations/CardExampleCentered"
    />
    <ComponentExample
      title="Horizontal"
      description="Horizontal card"
      examplePath="components/Card/Variations/CardExampleHorizontal"
    />
    <ComponentExample
      title="Sizes"
      description="A card can have assorted sizes"
      examplePath="components/Card/Variations/CardExampleSize"
    />
    <ComponentExample
      title="Fluid"
      description="A card can take up the width and height of its container"
      examplePath="components/Card/Variations/CardExampleFluid"
    />
  </ExampleSection>
);

export default Variations;
