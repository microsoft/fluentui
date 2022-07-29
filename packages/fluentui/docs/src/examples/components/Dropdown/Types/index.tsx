import * as React from 'react';
import ComponentExample from '../../../../components/ComponentDoc/ComponentExample';
import ExampleSection from '../../../../components/ComponentDoc/ExampleSection';

const Types = () => (
  <ExampleSection title="Types">
    <ComponentExample
      title="Selection"
      description="A dropdown can be used to select between choices in a form."
      examplePath="components/Dropdown/Types/DropdownExample"
    />
    <ComponentExample
      title="Multiple Selection"
      description="A dropdown can be used to select multiple items from a form."
      examplePath="components/Dropdown/Types/DropdownExampleMultiple"
    />
    <ComponentExample
      title="Search Selection"
      description="A dropdown can be searchable."
      examplePath="components/Dropdown/Types/DropdownExampleSearch"
    />
    <ComponentExample
      title="Search Multiple Selection"
      description="A dropdown can be searchable and allow a multiple selection."
      examplePath="components/Dropdown/Types/DropdownExampleSearchMultiple"
    />
    <ComponentExample
      title="Inverted"
      description="A dropdown can show an inverted background color."
      examplePath="components/Dropdown/Types/DropdownExampleInverted"
    />
    <ComponentExample
      title="Clearable"
      description="A dropdown can be clearable and let users remove their selection."
      examplePath="components/Dropdown/Types/DropdownExampleClearable"
    />
    <ComponentExample
      title="Inline"
      description="A dropdown can be used inline with text."
      examplePath="components/Dropdown/Types/DropdownExampleInline"
    />
    <ComponentExample
      title="Freeform"
      description="A dropdown allows free form input."
      examplePath="components/Dropdown/Types/DropdownExampleFreeform"
    />
  </ExampleSection>
);

export default Types;
