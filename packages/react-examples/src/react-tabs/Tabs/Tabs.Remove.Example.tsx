import * as React from 'react';
import { Label } from '@fluentui/react';
import { DefaultButton } from '@fluentui/react/lib/Button';
import { useBoolean } from '@fluentui/react-hooks';
import { Tabs, TabItem } from '@fluentui/react-tabs';

export const TabsRemoveExample = () => {
  const [showFirstItem, { toggle: toggleShowFirstItem }] = useBoolean(true);
  return (
    <div>
      <Tabs aria-label="Remove Tabs Example" tabSize="large" tabFormat="tabs">
        {showFirstItem && (
          <TabItem headerText="Foo" itemKey="Foo" key="Foo">
            <Label>Click the button below to show/hide this tab item.</Label>
            <Label>The selected item will not change when the number of tab items changes.</Label>
            <Label>If the selected item was removed, the new first item will be selected.</Label>
          </TabItem>
        )}
        <TabItem headerText="Bar" itemKey="Bar" key="Bar">
          <Label>Tab #2</Label>
        </TabItem>
        <TabItem headerText="Bas" itemKey="Bas" key="Bas">
          <Label>Tab #3</Label>
        </TabItem>
        <TabItem headerText="Biz" itemKey="Biz" key="Biz">
          <Label>Tab #4</Label>
        </TabItem>
      </Tabs>
      <div>
        <DefaultButton
          aria-live="polite"
          onClick={toggleShowFirstItem}
          text={`${showFirstItem ? 'Hide' : 'Show'} First Tab Item`}
        />
      </div>
    </div>
  );
};
