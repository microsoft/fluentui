import * as React from 'react';
import { DefaultButton } from '@fluentui/react/lib/Button';
import { Label, Pivot, PivotItem } from '@fluentui/react';

export const PivotOverrideExample = () => {
  const [selectedKey, setSelectedKey] = React.useState(0);
  const onButtonClick = () => {
    setSelectedKey((selectedKey + 1) % 3);
  };
  return (
    <div>
      <Pivot aria-label="Override Selected Item Pivot Example" selectedKey={String(selectedKey)}>
        <PivotItem headerText="My Files" itemKey="0">
          <Label>Pivot #1</Label>
        </PivotItem>
        <PivotItem headerText="Recent" itemKey="1">
          <Label>Pivot #2</Label>
        </PivotItem>
        <PivotItem headerText="Shared with me" itemKey="2">
          <Label>Pivot #3</Label>
        </PivotItem>
      </Pivot>
      {/* eslint-disable-next-line react/jsx-no-bind */}
      <DefaultButton onClick={onButtonClick}>Select next item</DefaultButton>
    </div>
  );
};
