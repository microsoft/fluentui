import * as React from 'react';
import { Pivot, PivotItem, PivotLinkFormat, PivotLinkSize } from 'office-ui-fabric-react/lib/Pivot';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { Label } from 'office-ui-fabric-react/lib/Label';
import { useBoolean } from '@uifabric/react-hooks';

export const PivotRemoveExample = () => {
  const [showFirstItem, { toggle: toggleShowFirstItem }] = useBoolean(true);
  return (
    <div>
      <Pivot aria-label="Remove Pivot Example" linkSize={PivotLinkSize.large} linkFormat={PivotLinkFormat.tabs}>
        {showFirstItem && (
          <PivotItem headerText="Foo" itemKey="Foo" key="Foo">
            <Label>Click the button below to show/hide this pivot item.</Label>
            <Label>The selected item will not change when the number of pivot items changes.</Label>
            <Label>If the selected item was removed, the new first item will be selected.</Label>
          </PivotItem>
        )}
        <PivotItem headerText="Bar" itemKey="Bar" key="Bar">
          <Label>Pivot #2</Label>
        </PivotItem>
        <PivotItem headerText="Bas" itemKey="Bas" key="Bas">
          <Label>Pivot #3</Label>
        </PivotItem>
        <PivotItem headerText="Biz" itemKey="Biz" key="Biz">
          <Label>Pivot #4</Label>
        </PivotItem>
      </Pivot>
      <div>
        <DefaultButton
          aria-live="polite"
          onClick={toggleShowFirstItem}
          text={`${showFirstItem ? 'Hide' : 'Show'} First Pivot Item`}
        />
      </div>
    </div>
  );
};
