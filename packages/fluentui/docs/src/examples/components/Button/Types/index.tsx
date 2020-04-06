import * as React from 'react';
import ComponentExample from '../../../../components/ComponentDoc/ComponentExample';
import ExampleSection from '../../../../components/ComponentDoc/ExampleSection';

const Types = () => (
  <ExampleSection title="Types">
    <ComponentExample
      title="Default"
      description="A default button."
      examplePath="components/Button/Types/ButtonExample"
    />
    <ComponentExample
      title="Emphasis"
      description="A button can be formatted to show different levels of emphasis."
      examplePath="components/Button/Types/ButtonExampleEmphasis"
    />
    <ComponentExample
      title="Inverted Button"
      description="A button that inherits its background."
      examplePath="components/Button/Types/ButtonExampleInverted"
    />
    <ComponentExample
      title="Text"
      description="A button can be shown in form of a text to indicate some less-pronounced actions."
      examplePath="components/Button/Types/ButtonExampleText"
    />
    <ComponentExample
      title="Icon Only"
      description="A button can be formatted differently if it indicate that it contains only an icon."
      examplePath="components/Button/Types/ButtonExampleIconOnly"
    />
  </ExampleSection>
);

export default Types;
