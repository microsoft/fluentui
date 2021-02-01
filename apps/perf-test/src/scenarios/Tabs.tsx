import * as React from 'react';
import { Tabs, TabItem } from '@fluentui/react-tabs';

const Scenario = () => (
  <Tabs aria-label="Basic Tabs Example">
    <TabItem
      headerText="My Files"
      headerButtonProps={{
        'data-order': 1,
        'data-title': 'My Files Title',
      }}
    >
      <div>Tab #1</div>
    </TabItem>
    <TabItem headerText="Recent">
      <div>Tab #2</div>
    </TabItem>
    <TabItem headerText="Shared with me">
      <div>Tab #3</div>
    </TabItem>
  </Tabs>
);

export default Scenario;
