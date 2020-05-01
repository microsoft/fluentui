import * as React from 'react';
import { Label } from 'office-ui-fabric-react/lib/Label';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { Pivot, PivotItem } from 'office-ui-fabric-react/lib/Pivot';

export const PivotOverrideExample = () => {
  const [selectedKey, setSelectedKey] = React.useState(0);
  const DefaultButtonOnClick = () => {
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
      <DefaultButton onClick={DefaultButtonOnClick}>Select next item</DefaultButton>
    </div>
  );
};
