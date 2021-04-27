import * as React from 'react';

import ComponentExample from '../../../../components/ComponentDoc/ComponentExample';
import ExampleSection from '../../../../components/ComponentDoc/ExampleSection';

const Variations = () => (
  <ExampleSection title="Variations">
    <ComponentExample
      title="Sizes"
      description="A Pill can be sized."
      examplePath="components/Pill/Variations/PillExampleSizes"
    />
    <ComponentExample
      title="Appearance"
      description="A Pill can be filled, inverted or outlined."
      examplePath="components/Pill/Variations/PillExampleAppearance"
    />
    <ComponentExample
      title="Rectangular"
      description="A Pill can be rectangular."
      examplePath="components/Pill/Variations/PillExampleRectangular"
    />
    <ComponentExample
      title="Actionable"
      description="A Pill can be actionable."
      examplePath="components/Pill/Variations/PillExampleActionable"
    />
    <ComponentExample
      title="Image"
      description="A Pill can have an Image."
      examplePath="components/Pill/Variations/PillExampleImage"
    />
    <ComponentExample
      title="Icon"
      description="A Pill can have an Icon."
      examplePath="components/Pill/Variations/PillExampleIcon"
    />
    <ComponentExample
      title="Selectable"
      description="A Pill can be selectable."
      examplePath="components/Pill/Variations/PillExampleSelectable"
    />
  </ExampleSection>
);

export default Variations;
