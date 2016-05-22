import * as React from 'react';
import {
  CommandBar,
  IContextualMenuItem
} from '../../../../index';
import { items, farItems } from './data';

export interface IChangingItemsCommandBarState {
  items?: IContextualMenuItem[];
  farItems?: IContextualMenuItem[];
}

export class CommandBarRandomItemsExample extends React.Component<any, IChangingItemsCommandBarState> {
  private _changeTimerId;

  constructor() {
    super();

    this.state = {
      items: items,
      farItems: farItems
    };

  };

  public componentDidMount() {
    this._changeTimerId = window.setInterval(this._updateItems.bind(this), 5000);
  }

  public componentWillUnmount() {
    if (this._changeTimerId) {
      window.clearInterval(this._changeTimerId);
    }
  }

  public render() {

    return (
      <div className='ms-ChangedItemsCommandBarExample'>
        <CommandBar
          items={ this.state.items }
          farItems={ this.state.farItems }
          />
      </div>
    );
  }

  private _updateItems() {
    this.setState({
      items: _getRandomizedArray(items, 2),
      farItems: _getRandomizedArray(farItems, 1)
    });
  }
}

function _getRandomizedArray(array: any[], min: number) {
  let count = min + Math.round(Math.random() * (array.length - min));
  let itemsLeft = [].concat(array);
  let newArray = [];

  for (let i = 0; i < count; i++) {
    newArray = newArray.concat(itemsLeft.splice(Math.floor(Math.random() * itemsLeft.length), 1));
  }

  return newArray;
}
