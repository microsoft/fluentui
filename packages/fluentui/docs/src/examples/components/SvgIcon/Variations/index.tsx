import * as React from 'react';
import ComponentExample from '../../../../components/ComponentDoc/ComponentExample';
import ExampleSection from '../../../../components/ComponentDoc/ExampleSection';

const Variations = () => (
  <ExampleSection title="Variations">
    <ComponentExample
      title="Space"
      description="An icon can have space before, after or on both sides. 'none' value removes the default space around the icon."
      examplePath="components/SvgIcon/Variations/SvgIconExampleSpace"
    />
    <ComponentExample
      title="Color"
      description="An icon is inheriting color by default."
      examplePath="components/SvgIcon/Variations/SvgIconExampleColor"
    />
    <ComponentExample
      title="Size"
      description="An icon can vary in size."
      examplePath="components/SvgIcon/Variations/SvgIconExampleSize"
    />
    <ComponentExample
      title="Bordered"
      description="An icon can be formatted to appear with rectangular border."
      examplePath="components/SvgIcon/Variations/SvgIconExampleBordered"
    />
    <ComponentExample
      title="Circular"
      description="An icon can be formatted to appear circular."
      examplePath="components/SvgIcon/Variations/SvgIconExampleCircular"
    />
    <ComponentExample
      title="Rotate"
      description="An icon can be rotated by specified degrees."
      examplePath="components/SvgIcon/Variations/SvgIconExampleRotate"
    />
  </ExampleSection>
);

export default Variations;
