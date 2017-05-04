import * as React from 'react';
import { Label } from 'office-ui-fabric-react/lib/Label';
import { Button } from 'office-ui-fabric-react/lib/Button';
import { Pivot, PivotItem } from 'office-ui-fabric-react/lib/Pivot';
import { autobind } from 'office-ui-fabric-react/lib/Utilities';

export class PivotSeparateExample extends React.Component<any, any> {
  public state = { selectedKey: 'rectangleRed' };

  public render() {
    return (
      <div>
        <div
          aria-labelledby={ this._getTabId(this.state.selectedKey) }
          role='tabitem'
          style={ {
            float: 'left',
            width: 100,
            height: this.state.selectedKey === 'squareRed' ? 100 : 200,
            background: this.state.selectedKey === 'rectangleGreen' ? 'green' : 'red'
          } } />
        <Pivot
          selectedKey={ this.state.selectedKey }
          onLinkClick={ this._handleLinkClick }
          headersOnly={ true }
          getTabId={ this._getTabId }>
          <PivotItem linkText='Rectangle red' itemKey='rectangleRed' />
          <PivotItem linkText='Square red' itemKey='squareRed' />
          <PivotItem linkText='Rectangle green' itemKey='rectangleGreen' />
        </Pivot>
      </div>
    );
  }

  @autobind
  private _handleLinkClick(item: PivotItem): void {
    this.setState({
      selectedKey: item.props.itemKey
    });
  }

  @autobind
  private _getTabId(itemKey: string): string {
    return `ShapeColorPivot_${itemKey}`;
  }
}
