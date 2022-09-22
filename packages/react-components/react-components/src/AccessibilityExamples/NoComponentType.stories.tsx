import * as React from 'react';

import { Button, Text, Divider } from '@fluentui/react-components';
import { Mic24Regular } from '@fluentui/react-icons';

import { Scenario } from './utils';

export const AvoidComponentTypeExample = () => {
  return (
    <Scenario pageTitle="Avoid component type in accessibility name">
      <h1>Avoid component type in accessibility name</h1>
      <h2>Bad example</h2>
      <Button aria-label="Mute microphone button" size="small" icon={<Mic24Regular />}></Button>
      <Text block>
        <Text weight="semibold">Added aria label:</Text> aria-label="Mute microphone button"
      </Text>
      <Text block>
        <h3>Screen reader narration</h3>
        <Text weight="semibold">JAWS: </Text>"Mute microphone button button"
      </Text>
      <h3>Implementation details</h3>
      <ul>
        <li>aria-label="Mute microphone button" was applied on the component.</li>
      </ul>
      <Divider appearance="strong" />
      <h2>Good example</h2>
      <Button aria-label="Mute microphone" size="small" icon={<Mic24Regular />}></Button>
      <Text block>
        <h3>Screen reader narration</h3>
        <Text weight="semibold">JAWS: </Text>"Mute microphone button"
      </Text>
      <h3>Implementation details</h3>
      <ul>
        <li>aria-label="Mute microphone" was applied on the component</li>
      </ul>
      <Divider appearance="strong" />
      <h2>Problem explanation</h2>
      <ul>
        <li>
          Adding the component type (such as "button") to the component accessible name duplicates information that is
          already automatically narrated by the screen reader when the component is focused.
        </li>
        <li>
          Verify the component uses the proper HTML element or the proper ARIA role, so that the component type can be
          recognized and automatically narrated by the screen reader.
        </li>
      </ul>
    </Scenario>
  );
};
