import * as React from 'react';
import ComponentExample from '../../../../components/ComponentDoc/ComponentExample';
import ExampleSection from '../../../../components/ComponentDoc/ExampleSection';

const Content = () => (
  <ExampleSection title="Content">
    <ComponentExample
      title="Content"
      description="Item layout can contain content."
      examplePath="components/ItemLayout/Content/ItemLayoutExampleContent"
    />
    <ComponentExample
      title="Header"
      description="Item layout can contain a header."
      examplePath="components/ItemLayout/Content/ItemLayoutExampleHeader"
    />
    <ComponentExample
      title="Header & Content"
      description="Item layout can contain a header and content."
      examplePath="components/ItemLayout/Content/ItemLayoutExampleHeaderContent"
    />
    <ComponentExample
      title="Media"
      description="Item layout can contain a piece of media."
      examplePath="components/ItemLayout/Content/ItemLayoutExampleMedia"
    />
    <ComponentExample
      title="Header Media"
      description="Item layout can contain a header with its own media."
      examplePath="components/ItemLayout/Content/ItemLayoutExampleHeaderMedia"
    />
    <ComponentExample
      title="Content Media"
      description="Item layout can contain content with its own media."
      examplePath="components/ItemLayout/Content/ItemLayoutExampleContentMedia"
    />
    <ComponentExample
      title="End Media"
      description="Item layout can contain a piece of media at the end of the item."
      examplePath="components/ItemLayout/Content/ItemLayoutExampleEndMedia"
    />
  </ExampleSection>
);

export default Content;
