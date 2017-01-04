import * as React from 'react';
import {
  Label,
  Button,
  Pivot,
  PivotItem
} from '../../../../index';

export class PivotOverrideExample extends React.Component<any, any> {
  constructor(props: any) {
    super(props);

    this.state = {
      selectedKey: 0
    };

    this._handleClick = this._handleClick.bind(this);
  }

  public render() {
    return (
      <div>
        <Pivot selectedKey={`${this.state.selectedKey}`}>
          <PivotItem linkText='My Files' itemKey='0'>
            <Label>Pivot #1</Label>
          </PivotItem>
          <PivotItem linkText='Recent' itemKey='1'>
            <Label>Pivot #2</Label>
          </PivotItem>
          <PivotItem linkText='Shared with me' itemKey='2'>
            <Label>Pivot #3</Label>
          </PivotItem>
        </Pivot>
        <Button onClick={ this._handleClick }>
          Select next item
        </Button>
      </div>
    );
  }

  private _handleClick(): void {
    this.setState({ selectedKey: (this.state.selectedKey + 1) % 3 });
  }
}
