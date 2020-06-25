import * as React from 'react';
import ComponentExample from '../../../../components/ComponentDoc/ComponentExample';
import ExampleSection from '../../../../components/ComponentDoc/ExampleSection';

const Types = () => (
  <ExampleSection title="Types">
    <ComponentExample title="Default" description="A default Chat." examplePath="components/Chat/Types/ChatExample" />
    <ComponentExample
      title="Content position"
      description="A ChatItem can position it's content at the start or at the end of the container."
      examplePath="components/Chat/Types/ChatExampleContentPosition"
    />
    <ComponentExample
      title="Styled Chat Item"
      description="A Chat item with custom styles for every slot."
      examplePath="components/Chat/Types/ChatMessageExampleStyled"
    />
    <ComponentExample
      title="Badge"
      description="A Chat message may contained badge positioned at the start or end of the message."
      examplePath="components/Chat/Types/ChatMessageExampleBadge"
    />
    <ComponentExample
      title="Edited and Translated"
      description="A Chat message may contained Edited and/or Translated."
      examplePath="components/Chat/Types/ChatExampleDetails"
    />
  </ExampleSection>
);

export default Types;
