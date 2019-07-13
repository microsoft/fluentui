import * as React from 'react';
import { Pivot, PivotItem, PivotLinkFormat, PivotLinkSize } from 'office-ui-fabric-react/lib/Pivot';
import { Label } from 'office-ui-fabric-react/lib/Label';

export class PivotOnChangeExample extends React.Component<any, any> {
  public render(): JSX.Element {
    return (
      <div>
        <Pivot linkSize={PivotLinkSize.large} linkFormat={PivotLinkFormat.tabs} onLinkClick={this.onLinkClick}>
          <PivotItem headerText="Foo">
            <Label>Pivot #1</Label>
          </PivotItem>
          <PivotItem headerText="Bar">
            <Label>Pivot #2</Label>
          </PivotItem>
          <PivotItem headerText="Bas">
            <Label>Pivot #3</Label>
          </PivotItem>
          <PivotItem headerText="Biz">
            <Label>Pivot #4</Label>
          </PivotItem>
        </Pivot>
      </div>
    );
  }

  public onLinkClick(item: PivotItem): void {
    alert(item.props.headerText);
  }
}
