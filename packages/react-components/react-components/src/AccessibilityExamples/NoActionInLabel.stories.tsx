import * as React from 'react';

import { Button, Text, Divider } from '@fluentui/react-components';
import { Send24Regular } from '@fluentui/react-icons';

import { Scenario } from './utils';

export const AvoidActionExample = () => {
  return (
    <Scenario pageTitle="Avoid action in accessibility name">
      <h1>Avoid action in accessibility name</h1>

      <h2>Bad example</h2>
      <Button aria-label="Click here to send message " size="small" icon={<Send24Regular />}></Button>
      <Text block>
        <h3>Screen reader narration</h3>
        <Text weight="semibold">JAWS: </Text>"Click here to send message button"
      </Text>
      <h3>Implementation details</h3>
      <ul>
        <li>aria-label="Click here to send message" was applied on the component.</li>
      </ul>
      <Divider appearance="strong" />
      <h2>Good example</h2>
      <Button aria-label="Send message" size="small" icon={<Send24Regular />}></Button>
      <Text block>
        <h3>Screen reader narration</h3>
        <Text weight="semibold">JAWS: </Text>"Send message button"
      </Text>
      <h3>Implementation details</h3>
      <ul>
        <li>aria-label="Send message " was applied on the component.</li>
      </ul>
      <Divider appearance="strong" />
      <h2>Problem explanation</h2>
      <ul>
        <li>
          Adding the action instruction (such as "Click here to...") to the component accessible name prolongs the name
          narration by the screen reader when the component is focused. This information is already known to the screen
          reader user based on the type of component beeing used, i.e. a button in this case.
        </li>
        <li>
          Verify the component uses the proper HTML element or the proper ARIA role, so that the component type can be
          recognized by the screen reader.
        </li>
      </ul>
    </Scenario>
  );
};
