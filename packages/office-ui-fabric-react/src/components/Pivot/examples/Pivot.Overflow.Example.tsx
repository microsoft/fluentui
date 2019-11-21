import * as React from 'react';
import { Label, ILabelStyles } from 'office-ui-fabric-react/lib/Label';
import { Pivot, PivotItem } from 'office-ui-fabric-react/lib/Pivot';
import { IStyleSet } from 'office-ui-fabric-react/lib/Styling';

const labelStyles: Partial<IStyleSet<ILabelStyles>> = {
  root: { marginTop: 10 }
};

export const PivotOverflowExample: React.FunctionComponent = () => {
  return (
    <div style={{ width: '30%' }}>
      <Pivot
        styles={{
          root: {
            // Show where the edge of the pivot is at to indicate where it should be cutting off elements
            border: '1px solid black'
          }
        }}
      >
        <PivotItem
          headerText="My Files"
          headerButtonProps={{
            'data-order': 1,
            'data-title': 'My Files Title'
          }}
        >
          <Label styles={labelStyles}>Pivot #1</Label>
        </PivotItem>
        <PivotItem headerText="Recent">
          <Label styles={labelStyles}>Pivot #2</Label>
        </PivotItem>
        <PivotItem headerText="Shared with me">
          <Label styles={labelStyles}>Pivot #3</Label>
        </PivotItem>
        <PivotItem headerText="Other 1">
          <Label styles={labelStyles}>Pivot #4</Label>
        </PivotItem>
        <PivotItem headerText="Other 2">
          <Label styles={labelStyles}>Pivot #5</Label>
        </PivotItem>
        <PivotItem headerText="Other 3">
          <Label styles={labelStyles}>Pivot #6</Label>
        </PivotItem>
        <PivotItem headerText="Other 4">
          <Label styles={labelStyles}>Pivot #7</Label>
        </PivotItem>
        <PivotItem headerText="Other 5">
          <Label styles={labelStyles}>Pivot #8</Label>
        </PivotItem>
      </Pivot>
    </div>
  );
};
