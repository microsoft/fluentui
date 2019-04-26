import * as React from 'react';
import { Pivot, PivotItem } from 'office-ui-fabric-react/lib/Pivot';
import { IconButton } from 'office-ui-fabric-react/lib/Button';

export class PivotSeparateNoSelectedKeyExample extends React.Component<any, any> {
  public state = { selectedKey: 'Settings' };

  public render(): JSX.Element {
    const pivotItems = { Thing1: <div>thing 1</div>, Thing2: <div>thing 2</div>, Thing3: <div>thing 3</div> };
    const items: { [key: string]: React.ReactElement<any> } = {
      ...pivotItems,
      Settings: <div>settings</div>
    };

    return (
      <div style={{ width: '50%', maxWidth: '500px' }}>
        Current selectedKey: {this.state.selectedKey || 'null'}
        <div
          style={{
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <Pivot
            style={{ flexGrow: 1 }}
            selectedKey={Object.keys(pivotItems).indexOf(this.state.selectedKey) >= 0 ? this.state.selectedKey : null}
            onLinkClick={this._handleLinkClick}
            headersOnly={true}
            getTabId={this._getTabId}
          >
            {Object.keys(pivotItems).map(name => (
              <PivotItem key={`pivotItemKey_${name}`} headerText={name} itemKey={name} />
            ))}
          </Pivot>
          <IconButton
            iconProps={{ iconName: 'Settings', style: { color: this.state.selectedKey === 'Settings' ? 'blue' : 'black' } }}
            onClick={this._handleSettingsIconClick}
          />
        </div>
        {items[this.state.selectedKey]}
      </div>
    );
  }

  private _handleSettingsIconClick = () => this.setState({ selectedKey: 'Settings' });

  private _handleLinkClick = (item: PivotItem): void => {
    this.setState({
      selectedKey: item.props.itemKey
    });
  };

  private _getTabId = (itemKey: string): string => {
    return `ShapeColorPivot_${itemKey}`;
  };
}
