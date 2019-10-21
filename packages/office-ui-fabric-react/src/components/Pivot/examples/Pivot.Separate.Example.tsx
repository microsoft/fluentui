import * as React from 'react';
import { Pivot, PivotItem } from 'office-ui-fabric-react/lib/Pivot';

export class PivotSeparateExample extends React.Component<any, any> {
  public state = { selectedKey: 'rectangleRed' };

  public render(): JSX.Element {
    return (
      <div>
        <div
          aria-labelledby={this._getTabId(this.state.selectedKey)}
          role="tabpanel"
          style={{
            float: 'left',
            width: 100,
            height: this.state.selectedKey === 'squareRed' ? 100 : 200,
            background: this.state.selectedKey === 'rectangleGreen' ? 'green' : 'red'
          }}
        />
        <Pivot selectedKey={this.state.selectedKey} onLinkClick={this._handleLinkClick} headersOnly={true} getTabId={this._getTabId}>
          <PivotItem headerText="Rectangle red" itemKey="rectangleRed" />
          <PivotItem headerText="Square red" itemKey="squareRed" />
          <PivotItem headerText="Rectangle green" itemKey="rectangleGreen" />
        </Pivot>
      </div>
    );
  }

  private _handleLinkClick = (item: PivotItem): void => {
    this.setState({
      selectedKey: item.props.itemKey
    });
  };

  private _getTabId = (itemKey: string): string => {
    return `ShapeColorPivot_${itemKey}`;
  };
}
