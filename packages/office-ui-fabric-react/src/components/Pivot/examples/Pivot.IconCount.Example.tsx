import * as React from 'react';
import { Label } from 'office-ui-fabric-react/lib/Label';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { PivotItem, IPivotItemProps, Pivot } from 'office-ui-fabric-react/lib/Pivot';

export class PivotIconCountExample extends React.Component<any, any> {
  public render(): JSX.Element {
    return (
      <div>
        <Pivot>
          <PivotItem headerText="My Files" itemCount={42} itemIcon="Emoji2">
            <Label>Pivot #1</Label>
          </PivotItem>
          <PivotItem itemCount={23} itemIcon="Recent">
            <Label>Pivot #2</Label>
          </PivotItem>
          <PivotItem itemIcon="Globe">
            <Label>Pivot #3</Label>
          </PivotItem>
          <PivotItem headerText="Shared with me" itemIcon="Ringer" itemCount={1}>
            <Label>Pivot #4</Label>
          </PivotItem>
          <PivotItem headerText="Customized Rendering" itemIcon="Globe" itemCount={10} onRenderItemLink={this._customRenderer}>
            <Label>Customized Rendering</Label>
          </PivotItem>
        </Pivot>
      </div>
    );
  }

  private _customRenderer(link: IPivotItemProps, defaultRenderer: (link: IPivotItemProps) => JSX.Element): JSX.Element {
    return (
      <span>
        {defaultRenderer(link)}
        <Icon iconName="Airplane" style={{ color: 'red' }} />
      </span>
    );
  }
}
