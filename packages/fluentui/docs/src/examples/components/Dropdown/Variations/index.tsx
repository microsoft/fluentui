import * as React from 'react';
import ComponentExample from '../../../../components/ComponentDoc/ComponentExample';
import ExampleSection from '../../../../components/ComponentDoc/ExampleSection';

const Variations = () => (
  <ExampleSection title="Variations">
    <ComponentExample
      title="Multiple Search with Image and Content"
      description="A multiple search dropdown which items have header, content and image."
      examplePath="components/Dropdown/Variations/DropdownExampleSearchMultipleImageAndContent"
    />
    <ComponentExample
      title="Multiple Search Fluid"
      description="A multiple search dropdown that fits the width of the container."
      examplePath="components/Dropdown/Variations/DropdownExampleSearchMultipleFluid"
    />
    <ComponentExample
      title="Multiple Search Using French Language"
      description="A multiple search dropdown that overrides visual and accessibility texts with French equivalents."
      examplePath="components/Dropdown/Variations/DropdownExampleSearchMultipleFrenchLanguage"
    />
    <ComponentExample
      title="Alignment and Position"
      description="A dropdown can be positioned around its trigger and aligned relative to the trigger's margins. Click on a button to open a dropdown on a specific position and alignment."
      examplePath="components/Dropdown/Variations/DropdownExamplePosition"
    />
    <ComponentExample
      title="Offset"
      description="Dropdown position could be further customized by providing offset value. Note that percentage values of both trigger and dropdown elements' lengths are supported."
      examplePath="components/Dropdown/Variations/DropdownExampleOffset"
    />
  </ExampleSection>
);

export default Variations;
