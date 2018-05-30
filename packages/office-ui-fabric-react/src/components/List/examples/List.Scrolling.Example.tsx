import * as React from 'react';
import {
  css
} from 'office-ui-fabric-react/lib/Utilities';
import {
  FocusZone,
  FocusZoneDirection
} from 'office-ui-fabric-react/lib/FocusZone';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { Dropdown, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';
import { List, ScrollToMode } from 'office-ui-fabric-react/lib/List';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import './List.Scrolling.Example.scss';

export interface IListScrollingExampleProps {
  items: any[];
}

export interface IListScrollingExampleState {
  selectedIndex: number;
  scrollToMode: ScrollToMode;
}

const evenItemHeight = 25;
const oddItemHeight = 50;
const numberOfItemsOnPage = 10;

export class ListScrollingExample extends React.Component<IListScrollingExampleProps, IListScrollingExampleState> {
  private _list: List;

  constructor(props: IListScrollingExampleProps) {
    super(props);

    this.state = {
      selectedIndex: 0,
      scrollToMode: ScrollToMode.auto
    };
  }

  public render() {
    const { items } = this.props;

    return (
      <FocusZone direction={ FocusZoneDirection.vertical }>
        <div>
          <DefaultButton onClick={ this._scrollRelative(-10) }>-10</DefaultButton>
          <DefaultButton onClick={ this._scrollRelative(-1) }>-1</DefaultButton>
          <DefaultButton onClick={ this._scrollRelative(1) }>+1</DefaultButton>
          <DefaultButton onClick={ this._scrollRelative(10) }>+10</DefaultButton>
        </div>
        <Dropdown
          placeHolder='Select an Option'
          label='Scroll To Mode:'
          id='Scrolldrop1'
          ariaLabel='Scroll To Mode'
          defaultSelectedKey={ 'auto' }
          options={
            [
              { key: 'auto', text: 'Auto' },
              { key: 'top', text: 'Top' },
              { key: 'bottom', text: 'Bottom' },
              { key: 'center', text: 'Center' },
            ]
          }
          onChanged={ this._onDropdownChanged }
        />
        <div>
          Scroll item index:
          <TextField
            value={ this.state.selectedIndex.toString(10) }
            onChanged={ this._onChangeText }
          />
        </div>

        <div className='ms-ListScrollingExample-container' data-is-scrollable={ true }>
          <List
            ref={ this._resolveList }
            items={ items }
            getPageHeight={ this._getPageHeight }
            onRenderCell={ this._onRenderCell }
          />
        </div>
      </FocusZone>
    );
  }

  private _getPageHeight(idx: number): number {
    let h = 0;
    for (let i = idx; i < idx + numberOfItemsOnPage; ++i) {
      const isEvenRow = i % 2 === 0;

      h += isEvenRow ? evenItemHeight : oddItemHeight;
    }
    return h;
  }

  private _onChangeText = (value: any): void => {
    this._scroll(parseInt(value, 10) || 0, this.state.scrollToMode);
  }

  private _onDropdownChanged = (option: IDropdownOption) => {
    let scrollMode = this.state.scrollToMode;
    switch (option.key) {
      case 'auto':
        scrollMode = ScrollToMode.auto;
        break;
      case 'top':
        scrollMode = ScrollToMode.top;
        break;
      case 'bottom':
        scrollMode = ScrollToMode.bottom;
        break;
      case 'center':
        scrollMode = ScrollToMode.center;
        break;
    }
    this._scroll(this.state.selectedIndex, scrollMode);
  }

  private _onRenderCell = (item: any, index: number): JSX.Element => {
    return (
      <div className='ms-ListScrollingExample-itemCell' data-is-focusable={ true }>
        <div
          className={ css(
            'ms-ListScrollingExample-itemContent',
            (index % 2 === 0) && 'ms-ListScrollingExample-itemContent-even',
            (index % 2 === 1) && 'ms-ListScrollingExample-itemContent-odd'
          ) }
        >
          { index } &nbsp; { item.name }
        </div>
      </div>
    );
  }

  private _scrollRelative = (delta: number): () => void => {
    return (): void => {
      this._scroll(this.state.selectedIndex + delta, this.state.scrollToMode);
    };
  }

  private _scroll = (index: number, scrollToMode: ScrollToMode): void => {
    const updatedSelectedIndex = Math.min(Math.max(index, 0), this.props.items.length - 1);

    this.setState({
      selectedIndex: updatedSelectedIndex,
      scrollToMode: scrollToMode
    }, () => {
      this._list.scrollToIndex(
        updatedSelectedIndex,
        (idx) => idx % 2 === 0 ? evenItemHeight : oddItemHeight,
        scrollToMode);
    });
  }

  private _resolveList = (list: List): void => {
    this._list = list;
  }
}
