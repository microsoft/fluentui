import * as React from 'react';
import ComponentExample from '../../../../components/ComponentDoc/ComponentExample';
import ExampleSection from '../../../../components/ComponentDoc/ExampleSection';

const Content = () => (
  <ExampleSection title="Content">
    <ComponentExample
      title="Header"
      description="List items can contain a header."
      examplePath="components/List/Content/ListExampleHeader"
    />
    <ComponentExample
      title="Content"
      description="List items can contain content."
      examplePath="components/List/Content/ListExampleContent"
    />
    <ComponentExample
      title="Header & Content"
      description="List items can contain a header and content."
      examplePath="components/List/Content/ListExampleHeaderContent"
    />
    <ComponentExample
      title="Media"
      description="List items can contain a piece of media."
      examplePath="components/List/Content/ListExampleMedia"
    />
    <ComponentExample
      title="Header Media"
      description="List items can contain a header with its own media."
      examplePath="components/List/Content/ListExampleHeaderMedia"
    />
    <ComponentExample
      title="Content Media"
      description="List items can contain content with its own media."
      examplePath="components/List/Content/ListExampleContentMedia"
    />
    <ComponentExample
      title="End Media"
      description="List items can contain a piece of media at the end of the item."
      examplePath="components/List/Content/ListExampleEndMedia"
    />
  </ExampleSection>
);

export default Content;
