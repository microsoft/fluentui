import * as React from 'react';
import {
  FocusZone,
  List
} from '../../../../index';
import './List.Grid.Example.scss';

export interface IListGridExampleProps {
  items: any[];
}

const ROWS_PER_PAGE = 3;
const MAX_ROW_HEIGHT = 250;

export class ListGridExample extends React.Component<IListGridExampleProps, any> {
  private _positions;
  private _columnCount: number;
  private _columnWidth: number;
  private _rowHeight: number;

  constructor() {
    super();

    this._positions = {};
    this._getItemCountForPage = this._getItemCountForPage.bind(this);
    this._getPageHeight = this._getPageHeight.bind(this);
  }

  public render() {
    return (
      <FocusZone>
        <List
          className='ms-ListGridExample'
          items={ this.props.items }
          getItemCountForPage={ this._getItemCountForPage }
          getPageHeight={ this._getPageHeight }
          onRenderCell={ (item, index) => (
            <div
              className='ms-ListGridExample-tile'
              data-is-focusable={ true }
              style={ {
                width: (100 / this._columnCount) + '%'
              } }>
                <div className='ms-ListGridExample-sizer'>
                  <div className='msListGridExample-padder'>
                    <img src={ item.thumbnail } className='ms-ListGridExample-image' />
                    <span className='ms-ListGridExample-label'>
                    { `item ${ index }` }
                    </span>
                  </div>
                </div>
            </div>
          ) }
        />
      </FocusZone>
    );
  }
//                backgroundColor: `rgba(${ 4 * (index % 32) + 127 }, ${ 4 * (index % 32) + 127 }, ${ 4 * (index % 32) + 127 }, 1)`

  private _getItemCountForPage(itemIndex: number, surfaceRect) {
    if (itemIndex === 0) {
      this._columnCount = Math.ceil(surfaceRect.width / MAX_ROW_HEIGHT);
      this._columnWidth = Math.floor(surfaceRect.width / this._columnCount);
      this._rowHeight = this._columnWidth;
    }

    return this._columnCount * ROWS_PER_PAGE;
  }

  private _getPageHeight(itemIndex: number, surfaceRect) {
    return this._rowHeight * ROWS_PER_PAGE;
  }
}