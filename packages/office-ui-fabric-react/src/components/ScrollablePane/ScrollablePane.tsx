/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */

import {
  BaseComponent,
  autobind,
  css,
  findScrollableParent
  // getId
} from '../../Utilities';
import { IScrollablePaneProps } from './ScrollablePane.Props';
import * as stylesImport from './ScrollablePane.scss';
const styles: any = stylesImport;

export interface IScrollablePaneState {
  contentAreasAbove: JSX.Element[];
  contentAreasVisible: JSX.Element[];
  contentAreasBelow: JSX.Element[];
}

export class ScrollablePane extends BaseComponent<IScrollablePaneProps, IScrollablePaneState> {
  public static defaultProps: IScrollablePaneProps = {
    contentAreas: []
  };

  public refs: {
    root: HTMLElement
  };

  private _scrollElement: HTMLElement;

  constructor(props: IScrollablePaneProps) {
    super(props);

    this.state = {
      contentAreasAbove: [],
      contentAreasVisible: [],
      contentAreasBelow: []
    };
  }

  public componentDidMount() {
    console.log('mount');
    this._checkContentAreaPosition();

    this._scrollElement = findScrollableParent(this.refs.root);
    console.log(this._scrollElement);
    if (this._scrollElement) {
      this._events.on(this._scrollElement, 'scroll', () => {
        console.log('scrolling');
      });
    }
  }

  @autobind
  public componentWillReceiveProps(newProps: IScrollablePaneProps) {
    console.log('receive props');
  }

  public render() {
    const { className, contentAreas } = this.props;
    console.log(contentAreas);
    return (
      <div className={ css('ms-ScrollablePane', styles.root, className) }
        ref='root'>
        { contentAreas.map((contentArea: JSX.Element, index: number) => {
          return (
            <div className={ styles.contentArea } key={ index }>
              { contentArea }
            </div>
          );
        }) }
      </div>
    );
  }

  private _checkContentAreaPosition() {
    const { contentAreas } = this.props;
    console.log(this.refs.root);
  }
}
