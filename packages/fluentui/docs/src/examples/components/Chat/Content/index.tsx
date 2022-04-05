import * as React from 'react';

import ComponentExample from '../../../../components/ComponentDoc/ComponentExample';
import ExampleSection from '../../../../components/ComponentDoc/ExampleSection';

const Content = () => (
  <ExampleSection title="Content">
    <ComponentExample
      title="Actions"
      description="A chat message can contain actions."
      examplePath="components/Chat/Content/ChatExampleActions"
    />
    <ComponentExample
      title="Reaction group"
      description="A chat message can contain group of reactions."
      examplePath="components/Chat/Content/ChatExampleReactionGroup"
    />
    <ComponentExample
      title="Header"
      description="A chat message can have a custom header."
      examplePath="components/Chat/Content/ChatExampleHeader"
    />
    <ComponentExample
      title="Override Header Styles"
      description="A chat message header can have styles override to fit one line."
      examplePath="components/Chat/Content/ChatExampleHeaderOverride"
    />
    <ComponentExample
      title="Read Status"
      description="A chat message can have a read status indicator"
      examplePath="components/Chat/Content/ChatExampleReadStatus"
    />
  </ExampleSection>
);

export default Content;
