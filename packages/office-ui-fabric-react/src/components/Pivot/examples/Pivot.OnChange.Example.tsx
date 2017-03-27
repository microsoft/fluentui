import * as React from 'react';
import {
  Pivot,
  PivotItem,
  PivotLinkFormat,
  PivotLinkSize
} from 'office-ui-fabric-react/lib/Pivot';
import { Label } from 'office-ui-fabric-react/lib/Label';

export class PivotOnChangeExample extends React.Component<any, any> {
  public render() {
    return (
      <div>
        <Pivot linkSize={ PivotLinkSize.large } linkFormat={ PivotLinkFormat.tabs } onLinkClick={ this.onLinkClick.bind(this) }>
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

  public onLinkClick(item: PivotItem): void {
    alert(item.props.linkText);
  }
}
