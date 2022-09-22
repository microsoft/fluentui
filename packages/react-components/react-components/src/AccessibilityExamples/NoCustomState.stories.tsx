import * as React from 'react';

import { Text, Divider, TabList, Tab, Link } from '@fluentui/react-components';

import { Scenario } from './utils';

export const AvoidStateExample = () => {
  return (
    <Scenario pageTitle="Avoid state in accessibility name">
      <h1>Avoid state in accessibility name</h1>
      <h2>Bad example</h2>
      <TabList defaultSelectedValue="Files">
        <Tab value="Chat">Chat</Tab>
        <Tab value="Files" aria-label="Files tab is active">
          Files
        </Tab>
        <Tab value="Activity">Activity</Tab>
      </TabList>
      <Text block>
        <h3>Screen reader narration</h3>
        <Text weight="semibold">JAWS: </Text>"Files tab is active tab selected 2 of 3"
      </Text>
      <h3>Implementation details</h3>
      <ul>
        <li>The aria-label="Files tab is active" attribute was applied on the "Files" tab</li>
      </ul>
      <Divider appearance="strong" />
      <h2>Good example</h2>
      <TabList defaultSelectedValue="Files">
        <Tab value="Chat">Chat</Tab>
        <Tab value="Files">Files</Tab>
        <Tab value="Activity">Activity</Tab>
      </TabList>
      <Text block>
        <h3>Screen reader narration</h3>
        <Text weight="semibold">JAWS: </Text>"Files tab selected 2 of 3"
      </Text>
      <h3>Implementation details</h3>
      <ul>
        <li>no aria-label attribute is needed for the "Files" tab</li>
      </ul>
      <Divider appearance="strong" />
      <h2>Problem explanation</h2>
      <ul>
        <li>
          Adding a custom hard-coded state to the accessible name of the component is not required, because this
          information will be provided by the screen reader if the component has the proper state attribute.
        </li>
        <li>
          If the state of component is not narrated by the screen reader, verify the proper ARIA state attribute is
          used, such as "aria-checked" or "aria-selected". See aria documentation for{' '}
          <Link href="https://www.w3.org/TR/wai-aria-1.1/#aria-selected" inline>
            aria-selected
          </Link>{' '}
          or{' '}
          <Link href="https://www.w3.org/TR/wai-aria-1.1/#aria-checked" inline>
            aria-checked
          </Link>{' '}
          attribute to find out which attribute should be used.
        </li>
      </ul>
    </Scenario>
  );
};
