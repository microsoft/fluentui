import * as React from 'react';
import ComponentExample from '../../../../components/ComponentDoc/ComponentExample';
import ExampleSection from '../../../../components/ComponentDoc/ExampleSection';

const Variations = () => (
  <ExampleSection title="Variations">
    <ComponentExample
      title="Icon"
      description="An input can have an icon."
      examplePath="components/Input/Variations/InputExampleIcon"
    />
    <ComponentExample
      title="Icon position"
      description="The icon inside the input can be positioned at the start of the input."
      examplePath="components/Input/Variations/InputExampleIconPosition"
    />
    <ComponentExample
      title="Fluid"
      description="An input can take the full width of the parent element."
      examplePath="components/Input/Variations/InputExampleFluid"
    />
    <ComponentExample
      title="Clearable"
      description="An input can be clearable."
      examplePath="components/Input/Variations/InputExampleClearable"
    />
    <ComponentExample
      title="Clearable with icon"
      description="An input with a given icon can be clearable (the given icon will change into clear button on typing)."
      examplePath="components/Input/Variations/InputExampleIconClearable"
    />
    <ComponentExample
      title="Inline"
      description="An input can be used inline with text."
      examplePath="components/Input/Variations/InputExampleInline"
    />
    <ComponentExample
      title="Inline, clearable with icon"
      description="An input can be clearable, with icon and inlined into text."
      examplePath="components/Input/Variations/InputExampleInlineIconClearable"
    />
    <ComponentExample
      title="Input slot"
      description="The 'input' slot targets the input element and overrides input related props passed to the root."
      examplePath="components/Input/Variations/InputExampleInputSlot"
    />
    <ComponentExample
      title="Wrapper slot"
      description="The 'wrapper' slot targets the wrapper element and overrides wrapper related props passed to the root."
      examplePath="components/Input/Variations/InputExampleWrapperSlot"
    />
    <ComponentExample
      title="Targeting slots"
      description="An input can handle both input and wrapper slots for targetting the input and wrapper elements, respectively."
      examplePath="components/Input/Variations/InputExampleTargeting"
    />
  </ExampleSection>
);

export default Variations;
