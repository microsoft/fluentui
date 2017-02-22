import * as React from 'react';
import {
  Pivot,
  PivotItem,
  PivotLinkFormat,
  PivotLinkSize
} from 'office-ui-fabric-react/lib/Pivot';
import { Label } from 'office-ui-fabric-react/lib/Label';

export class PivotTabsLargeExample extends React.Component<any, any> {
  public render() {
    return (
      <div>
        <Pivot linkFormat={ PivotLinkFormat.tabs } linkSize={ PivotLinkSize.large }>
          <PivotItem linkText='Foo'>
            <Label>Pivot #1</Label>
          </PivotItem>
          <PivotItem linkText='Bar'>
            <Label>Pivot #2</Label>
          </PivotItem>
          <PivotItem linkText='Bas'>
            <Label>Pivot #3</Label>
          </PivotItem>
          <PivotItem linkText='Biz'>
            <Label>Pivot #4</Label>
          </PivotItem>
          <div>
            content not in a PivotItem
            </div>
        </Pivot>
      </div>
    );
  }
}
