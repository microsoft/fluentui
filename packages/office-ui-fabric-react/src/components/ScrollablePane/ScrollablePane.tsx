/* tslint:disable:no-unused-variable */
import * as React from 'react';
import * as ReactDOM from 'react-dom';
/* tslint:enable:no-unused-variable */

import {
  BaseComponent,
  autobind,
  css,
  findScrollableParent
  // getId
} from '../../Utilities';
import { Layer } from '../Layer/Layer';
import { LayerHost } from '../Layer/LayerHost';
import { IScrollablePaneProps, IContentArea } from './ScrollablePane.Props';
import * as stylesImport from './ScrollablePane.scss';
const styles: any = stylesImport;

export interface IScrollablePaneState {
  contentAreasAbove: IContentArea[];
  contentAreasVisible: IContentArea[];
  contentAreasBelow: IContentArea[];
}

export class ScrollablePane extends BaseComponent<IScrollablePaneProps, IScrollablePaneState> {
  public static defaultProps: IScrollablePaneProps = {
    contentAreas: []
  };

  public refs: {
    root: HTMLElement;
    stickyContainer: HTMLElement;
    scrollCopy: HTMLElement;
    topHeaders: HTMLElement;
    bottomHeaders: HTMLElement;
  };

  private _scrollElement: HTMLElement;
  private _contentAreas: JSX.Element[];

  constructor(props: IScrollablePaneProps) {
    super(props);

    this._contentAreas = [];
    this.state = {
      contentAreasAbove: [],
      contentAreasVisible: [],
      contentAreasBelow: []
    };
  }

  public componentDidMount() {
    this._scrollElement = findScrollableParent(this.refs.root);
    this._checkContentAreasPosition();
    if (this._scrollElement) {
      this._events.on(this._scrollElement, 'scroll', this._checkContentAreasPosition);
    }
  }

  @autobind
  public componentWillReceiveProps(newProps: IScrollablePaneProps) {
    console.log('receive props');
  }

  public componentDidUpdate(prevProps: IScrollablePaneProps, prevState: IScrollablePaneState) {
    console.log('udpate');
    this.refs.scrollCopy.style.height = this._scrollElement.clientHeight + 'px';
    this.refs.scrollCopy.style.width = this._scrollElement.clientWidth + 'px';
  }

  public render() {
    const { contentAreasAbove, contentAreasBelow } = this.state;
    const { className, contentAreas } = this.props;

    return (
      <div className={ css('ms-ScrollablePane', styles.root, className) }
        ref='root'>

        <div className={ styles.scrollCopy }
          ref='scrollCopy'>
          <div className={ styles.layerHostTop }>
            <div className={ styles.fixed } ref='topHeaders'>
              {
                contentAreasAbove.map((contentArea: IContentArea, index: number) => {
                  return contentArea.header;
                })
              }
            </div>
          </div>
          <div className={ styles.layerHostBottom }>
            <div className={ styles.fixed } ref='bottomHeaders'>
              {
                contentAreasBelow.map((contentArea: IContentArea, index: number) => {
                  return contentArea.header;
                })
              }
            </div>
          </div>
        </div>

        <div className={ styles.scrollRegion }>
          { contentAreas.map((contentArea: IContentArea, index: number) => {
            const elem = (
              <div
                ref={ index.toString() }
                className={ styles.contentArea }
                key={ index }>
                <div>
                  { contentArea.header }
                </div>
                { contentArea.content }
              </div>
            );
            this._contentAreas.push(elem);
            return (
              elem
            );
          }) }
        </div>
      </div>
    );
  }

  /*
        <div ref='stickyContainer' className={ styles.stickyContainer }>
          { this._renderTopSticky() }
          { this._renderBottomSticky() }
        </div>
        */

  private _renderTopSticky() {
    return (
      <div className={ styles.topSticky }>
        TOP STICKYS
      </div>
    );
  }

  private _renderBottomSticky() {
    return (
      <div className={ styles.bottomSticky }>
        bottomSticky
      </div>
    );
  }

  private _checkContentAreasPosition() {
    const { contentAreas } = this.props;
    let contentAreasAbove: IContentArea[] = [];
    let contentAreasVisible: IContentArea[] = [];
    let contentAreasBelow: IContentArea[] = [];
    if (this._scrollElement) {
      const scrollBounds: ClientRect = this._scrollElement.getBoundingClientRect();
      const topBound = scrollBounds.top + this.refs.topHeaders.clientHeight;
      contentAreas.forEach((content, idx) => {
        const currAreaBounds: ClientRect = this.refs[idx].getBoundingClientRect();
        if (currAreaBounds.top < topBound) {
          contentAreasAbove.push(content);
        } else if (currAreaBounds.top >= topBound && currAreaBounds.top <= scrollBounds.bottom) {
          contentAreasVisible.push(content);
        } else {
          contentAreasBelow.push(content);
        }
      });
      this.setState({
        contentAreasAbove: contentAreasAbove,
        contentAreasVisible: contentAreasVisible,
        contentAreasBelow: contentAreasBelow
      });
    }
  }
}
