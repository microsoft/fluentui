import * as React from 'react';
import {
  FocusZone,
  List,
  Image,
  ImageFit
} from '../../../../index';
import './List.Grid.Example.scss';

export interface IListGridExampleProps {
  items: any[];
}

const ROWS_PER_PAGE = 1;

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
                width: this._columnWidth,
                height: this._rowHeight,
                backgroundColor: `rgba(${ 4 * (index % 32) + 127 }, ${ 4 * (index % 32) + 127 }, ${ 4 * (index % 32) + 127 }, 1)`
              } }>
              <Image
                className='ms-ListGridExample-image'
                src={ this._getThumbnail(item, this._rowHeight) }
                imageFit={ ImageFit.cover }
                width={ this._rowHeight }
                height={ this._rowHeight } />
              <span className='ms-ListGridExample-label'>
              { `item ${ index }` }
              </span>
            </div>
          ) }
        />
      </FocusZone>
    );
  }

  private _getThumbnail(item, rowHeight) {
    const aspectRatio = item.width / item.height;

    if (item.width >= item.height) {
      return `//placekitten.com/${ Math.round( aspectRatio * rowHeight) }/${ rowHeight }`;
    } else {
      return `//placekitten.com/${ rowHeight }/${ Math.round(rowHeight / aspectRatio) }`;
    }
  }

  private _getItemCountForPage(itemIndex: number, surfaceRect) {
    if (itemIndex === 0) {
      this._columnCount = Math.ceil(surfaceRect.width / 200);
      this._columnWidth = Math.round(surfaceRect.width / this._columnCount);
      this._rowHeight = this._columnWidth;
    }

    return this._columnCount * ROWS_PER_PAGE;
  }

  private _getPageHeight(itemIndex: number, surfaceRect) {
    return this._rowHeight;
  }
}