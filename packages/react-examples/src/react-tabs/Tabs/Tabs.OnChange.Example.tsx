import * as React from 'react';
import { Label } from '@fluentui/react';
import { TabItemProps, Tabs, TabItem } from '@fluentui/react-tabs';

export const TabsOnChangeExample = () => {
  const [lastTab, setLastTab] = React.useState<{ props: TabItemProps } | undefined>(undefined);

  return (
    <div>
      <Label>Last onTabClick from: {lastTab?.props.headerText}</Label>
      <Tabs aria-label="OnChange Tabs Example" tabSize="large" tabFormat="tabs" onTabClick={setLastTab}>
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
};
