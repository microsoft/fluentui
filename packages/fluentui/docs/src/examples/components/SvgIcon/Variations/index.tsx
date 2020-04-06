import * as React from 'react';
import ComponentExample from '../../../../components/ComponentDoc/ComponentExample';
import ExampleSection from '../../../../components/ComponentDoc/ExampleSection';

const Variations = () => (
  <ExampleSection title="Variations">
    <ComponentExample
      title="Space"
      description="An icon can have space before, after or on both sides. 'none' value removes the default space around the icon."
      examplePath="components/SvgIcon/Variations/IconExampleSpace"
    />
    <ComponentExample
      title="Color"
      description="An icon is inheriting color by default, but can have a different color if provided by the user."
      examplePath="components/SvgIcon/Variations/IconExampleColor"
    />
    <ComponentExample
      title="Size"
      description="An icon can vary in size."
      examplePath="components/SvgIcon/Variations/IconExampleSize"
    />
    <ComponentExample
      title="Bordered"
      description="An icon can be formatted to appear with rectangular border."
      examplePath="components/SvgIcon/Variations/IconExampleBordered"
    />
    <ComponentExample
      title="Circular"
      description="An icon can be formatted to appear circular."
      examplePath="components/SvgIcon/Variations/IconExampleCircular"
    />
    <ComponentExample
      title="Rotate"
      description="An icon can be rotated by specified degrees."
      examplePath="components/SvgIcon/Variations/IconExampleRotate"
    />
  </ExampleSection>
);

export default Variations;
