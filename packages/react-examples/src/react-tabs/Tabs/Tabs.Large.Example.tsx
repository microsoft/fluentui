import * as React from 'react';
import { Label } from '@fluentui/react';
import { Tabs, TabItem } from '@fluentui/react-tabs';

export const TabsLargeExample = () => (
  <div>
    <Tabs aria-label="Large Tab Size Tabs Example" tabSize="large">
      <TabItem headerText="My Files">
        <Label>Tab #1</Label>
      </TabItem>
      <TabItem headerText="Recent">
        <Label>Tab #2</Label>
      </TabItem>
      <TabItem headerText="Shared with me">
        <Label>Tab #3</Label>
      </TabItem>
    </Tabs>
  </div>
);
