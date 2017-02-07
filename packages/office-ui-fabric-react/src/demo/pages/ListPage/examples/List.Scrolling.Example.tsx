import * as React from 'react';
import {
  css,
  autobind
} from '@uifabric/utilities';
import {
  FocusZone,
  FocusZoneDirection,
  Button,
  TextField,
  List
} from '../../../../index';
import './List.Scrolling.Example.scss';

export interface IListScrollingExampleProps {
  items: any[];
}

export interface IListScrollingExampleState {
  selectedIndex: number;
}

const evenItemHeight = 25;
const oddItemHeight = 50;
const numberOfItemsOnPage = 10;

export class ListScrollingExample extends React.Component<IListScrollingExampleProps, IListScrollingExampleState> {
  private _list: List;

  constructor(props) {
    super(props);

    this.state = {
      selectedIndex: 0
    };
  }

  public render() {
    let { items } = this.props;

    return (
      <FocusZone direction={ FocusZoneDirection.vertical }>
        <div>
          <Button onClick={ () => this._scrollRelative(-10) }>-10</Button>
          <Button onClick={ () => this._scrollRelative(-1) }>-1</Button>
          <Button onClick={ () => this._scrollRelative(1) }>+1</Button>
          <Button onClick={ () => this._scrollRelative(10) }>+10</Button>
        </div>

        <div>
          Scroll item index:
          <TextField value={ this.state.selectedIndex.toString(10) } onChanged={ (value) => {
            this._scroll(parseInt(value, 10) || 0);
          } } />
        </div>

        <div className='ms-ListScrollingExample-container' data-is-scrollable={ true }>
          <List
            ref={ this._resolveList }
            items={ items }
            getPageHeight={ (idx) => {
              let h = 0;
              for (let i = idx; i < idx + numberOfItemsOnPage; ++i) {
                const isEvenRow = i % 2 === 0;

                h += isEvenRow ? evenItemHeight : oddItemHeight;
              }
              return h;
            } }
            onRenderCell={ (item, index) => (
              <div className='ms-ListScrollingExample-itemCell' data-is-focusable={ true }>
                <div className={ css('ms-ListScrollingExample-itemContent', {
                  'ms-ListScrollingExample-itemContent-even': index % 2 === 0,
                  'ms-ListScrollingExample-itemContent-odd': index % 2 === 1
                }) }>
                  { index } &nbsp; { item.name }
                </div>
              </div>
            ) }
            />
        </div>
      </FocusZone>
    );
  }

  private _scrollRelative(delta: number): void {
    this._scroll(this.state.selectedIndex + delta);
  }

  private _scroll(index: number) {
    const updatedSelectedIndex = Math.min(Math.max(index, 0), this.props.items.length - 1);

    this.setState({
      selectedIndex: updatedSelectedIndex
    }, () => {
      this._list.scrollToIndex(updatedSelectedIndex, (idx) => idx % 2 === 0 ? evenItemHeight : oddItemHeight);
    });
  }

  @autobind
  private _resolveList(list: List) {
    this._list = list;
  }
}
