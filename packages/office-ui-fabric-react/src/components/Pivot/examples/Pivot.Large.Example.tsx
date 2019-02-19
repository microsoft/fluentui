import * as React from 'react';
import { Label } from 'office-ui-fabric-react/lib/Label';
import { Pivot, PivotItem, PivotLinkSize } from 'office-ui-fabric-react/lib/Pivot';

export class PivotLargeExample extends React.Component<any, any> {
  public render(): JSX.Element {
    return (
      <div>
        <Pivot linkSize={PivotLinkSize.large}>
          <PivotItem headerText="My Files">
            <Label>Pivot #1</Label>
          </PivotItem>
          <PivotItem headerText="Recent">
            <Label>Pivot #2</Label>
          </PivotItem>
          <PivotItem headerText="Shared with me">
            <Label>Pivot #3</Label>
          </PivotItem>
        </Pivot>
      </div>
    );
  }
}
