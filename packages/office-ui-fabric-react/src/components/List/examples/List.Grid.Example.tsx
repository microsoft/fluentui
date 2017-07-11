import * as React from 'react';
import { FocusZone } from 'office-ui-fabric-react/lib/FocusZone';
import { List } from 'office-ui-fabric-react/lib/List';
import './List.Grid.Example.scss';
import { IRectangle } from '../../../Utilities';

export interface IListGridExampleProps {
  items: any[];
}

const ROWS_PER_PAGE = 3;
const MAX_ROW_HEIGHT = 250;

export class ListGridExample extends React.Component<IListGridExampleProps, any> {
  private _positions: any;
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
          renderedWindowsAhead={ 4 }
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
                    { `item ${index}` }
                  </span>
                </div>
              </div>
            </div>
          ) }
        />
      </FocusZone>
    );
  }

  private _getItemCountForPage(itemIndex: number, surfaceRect: IRectangle) {
    if (itemIndex === 0) {
      this._columnCount = Math.ceil(surfaceRect.width / MAX_ROW_HEIGHT);
      this._columnWidth = Math.floor(surfaceRect.width / this._columnCount);
      this._rowHeight = this._columnWidth;
    }

    return this._columnCount * ROWS_PER_PAGE;
  }

  private _getPageHeight(itemIndex: number, surfaceRect: IRectangle) {
    return this._rowHeight * ROWS_PER_PAGE;
  }
}