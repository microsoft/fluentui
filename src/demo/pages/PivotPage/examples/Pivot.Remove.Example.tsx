import * as React from 'react';
import {
  Label,
  Button,
  Pivot,
  PivotItem,
  PivotLinkFormat,
  PivotLinkSize,
  IPivotItemProps
} from '../../../../index';

export interface IPivotOnChangeExampleState {
  shouldShowFirstPivotItem: boolean;
}

export class PivotRemoveExample extends React.Component<any, IPivotOnChangeExampleState> {
  private _shouldShowFirstPivotItem;

  constructor(props: any) {
    super(props);

    this._shouldShowFirstPivotItem = true;
    this.state = {
      shouldShowFirstPivotItem: true
    };

    this._handleClick = this._handleClick.bind(this);
  }
  public render() {
    let pivotArray: React.ReactElement<IPivotItemProps>[] = [];

    if (this.state.shouldShowFirstPivotItem) {
      pivotArray.push(
        <PivotItem linkText='Foo' itemKey='Foo' key='Foo'>
          <Label>Click the button below to show/hide this pivot item.</Label>
          <Label>The selected item will not change when the number of pivot items changes.</Label>
          <Label>If the selected item was removed, the new first item will be selected.</Label>
        </PivotItem>
      );
    }

    pivotArray = pivotArray.concat(
      (
        <PivotItem linkText='Bar' itemKey='Bar' key='Bar'>
          <Label>Pivot #2</Label>
        </PivotItem>
      ),
      (
        <PivotItem linkText='Bas' itemKey='Bas' key='Bas'>
          <Label>Pivot #3</Label>
        </PivotItem>
      ),
      (
        <PivotItem linkText='Biz' itemKey='Biz' key='Biz'>
          <Label>Pivot #4</Label>
        </PivotItem>
      )
    );

    return (
      <div>
        <Pivot linkSize={ PivotLinkSize.large } linkFormat={ PivotLinkFormat.tabs }>
          { pivotArray }
        </Pivot>
        <div>
          <Button onClick={ this._handleClick }>
            { `${this.state.shouldShowFirstPivotItem ? 'Hide' : 'Show'} First Pivot Item` }
          </Button>
        </div>
      </div>
    );
  }

  private _handleClick(): void {
    this._shouldShowFirstPivotItem = !this._shouldShowFirstPivotItem;
    this.setState({
      shouldShowFirstPivotItem: this._shouldShowFirstPivotItem
    });
  }
}
