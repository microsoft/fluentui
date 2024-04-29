import * as React from 'react';
import ComponentExample from '../../../../components/ComponentDoc/ComponentExample';
import ExampleSection from '../../../../components/ComponentDoc/ExampleSection';

const Usage = () => (
  <ExampleSection title="Usage">
    <ComponentExample
      title="Controlled"
      description="A dropdown can handle open state in controlled mode."
      examplePath="components/Dropdown/Usage/DropdownExampleControlled"
    />
    <ComponentExample
      title="Render callbacks"
      description="You can customize rendered elements with render callbacks."
      examplePath="components/Dropdown/Usage/DropdownExampleRender"
    />
    <ComponentExample
      title="Custom list header"
      description="You can add a custom message as the list header."
      examplePath="components/Dropdown/Usage/DropdownExampleHeaderMessage"
    />
  </ExampleSection>
);

export default Usage;
