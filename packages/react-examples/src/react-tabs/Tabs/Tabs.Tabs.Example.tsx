import * as React from 'react';
import { Label } from '@fluentui/react';
import { Tabs, TabItem } from '@fluentui/react-tabs';

export const TabsTabsExample = () => (
  <div>
    <Tabs aria-label="Tabs of Tab Style Tabs Example" tabFormat="tabs">
      <TabItem headerText="Foo">
        <Label>Tab #1</Label>
      </TabItem>
      <TabItem headerText="Bar">
        <Label>Tab #2</Label>
      </TabItem>
      <TabItem headerText="Bas">
        <Label>Tab #3</Label>
      </TabItem>
      <TabItem headerText="Biz">
        <Label>Tab #4</Label>
      </TabItem>
    </Tabs>
  </div>
);
