import * as React from 'react';
import { Label } from '@fluentui/react-next/lib/Label';
import { Pivot, PivotItem } from '@fluentui/react-next/lib/Pivot';

export const PivotOverflowExample: React.FunctionComponent = () => {
  return (
    <Pivot aria-label="Pivot Overflow Example" linkFormat="tabs">
      <PivotItem headerText="1. This Pivot">
        <Label>Pivot #1</Label>
      </PivotItem>
      <PivotItem headerText="2. Has many tabs">
        <Label>Pivot #2</Label>
      </PivotItem>
      <PivotItem headerText="3. To demonstrate">
        <Label>Pivot #3</Label>
      </PivotItem>
      <PivotItem headerText="4. What happens when">
        <Label>Pivot #4</Label>
      </PivotItem>
      <PivotItem headerText="5. Not all of the tabs can fit">
        <Label>Pivot #5</Label>
      </PivotItem>
      <PivotItem headerText="6. Onscreen">
        <Label>Pivot #6</Label>
      </PivotItem>
      <PivotItem headerText="7. At the same time">
        <Label>Pivot #7</Label>
      </PivotItem>
      <PivotItem headerText="8. This tab has a relatively long title">
        <Label>Pivot #8</Label>
      </PivotItem>
      <PivotItem headerText="9. Last tab">
        <Label>Pivot #9</Label>
      </PivotItem>
    </Pivot>
  );
};
