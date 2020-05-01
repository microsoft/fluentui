import * as React from 'react';
import ComponentExample from '../../../../components/ComponentDoc/ComponentExample';
import ExampleSection from '../../../../components/ComponentDoc/ExampleSection';

const Types = () => (
  <ExampleSection title="Types">
    <ComponentExample title="Default" description="A default List." examplePath="components/List/Types/ListExample" />
    <ComponentExample
      title="Selectable list"
      description="A list can be formatted to indicate that its items can be selected."
      examplePath="components/List/Types/ListExampleSelectable"
    />
    <ComponentExample
      title="Controlled selectable list"
      description="List can handle selected index in controlled mode."
      examplePath="components/List/Types/ListExampleSelectableControlled"
    />
    <ComponentExample
      title="Navigable list"
      description="List can allow the user to navigate through the list items"
      examplePath="components/List/Types/ListExampleNavigable"
    />
  </ExampleSection>
);

export default Types;
