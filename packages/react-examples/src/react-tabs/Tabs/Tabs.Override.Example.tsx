import * as React from 'react';
import { Label } from '@fluentui/react';
import { DefaultButton } from '@fluentui/react/lib/compat/Button';
import { Tabs, TabItem } from '@fluentui/react-tabs';

export const TabsOverrideExample = () => {
  const [selectedKey, setSelectedKey] = React.useState(0);
  const onButtonClick = () => {
    setSelectedKey((selectedKey + 1) % 3);
  };
  return (
    <div>
      <Tabs aria-label="Override Selected Item Tabs Example" selectedKey={String(selectedKey)}>
        <TabItem headerText="My Files" itemKey="0">
          <Label>Tab #1</Label>
        </TabItem>
        <TabItem headerText="Recent" itemKey="1">
          <Label>Tab #2</Label>
        </TabItem>
        <TabItem headerText="Shared with me" itemKey="2">
          <Label>Tab #3</Label>
        </TabItem>
      </Tabs>
      {/* eslint-disable-next-line react/jsx-no-bind */}
      <DefaultButton onClick={onButtonClick}>Select next item</DefaultButton>
    </div>
  );
};
