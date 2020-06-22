import * as React from 'react';
import { Pivot, PivotItem, Label, Toggle } from '@fluentui/react-next';

const onChange = (setValue: (val: boolean) => void) =>
  React.useCallback((_event: unknown, value: boolean) => setValue(value), []);

export const PivotOverflowMenuExample: React.FunctionComponent = () => {
  const [overflow, setOverflow] = React.useState<boolean>(true);
  const [rtl, setRTL] = React.useState<boolean>(false);

  return (
    <>
      <Toggle label="overflow" offText="none" onText="menu" checked={overflow} onChange={onChange(setOverflow)} />
      <Toggle label="direction" offText="ltr" onText="rtl" checked={rtl} onChange={onChange(setRTL)} />
      <Pivot
        aria-label="Pivot Overflow Menu Example"
        linkFormat="tabs"
        headerOverflow={overflow ? 'menu' : 'none'}
        dir={rtl ? 'rtl' : 'ltr'}
      >
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
    </>
  );
};
