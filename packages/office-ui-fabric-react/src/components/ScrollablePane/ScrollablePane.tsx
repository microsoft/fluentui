/* tslint:disable:no-unused-variable */
import * as React from 'react';
import * as ReactDOM from 'react-dom';
/* tslint:enable:no-unused-variable */
import * as PropTypes from 'prop-types';
import {
  autobind,
  BaseComponent,
  css
} from '../../Utilities';
import { IScrollablePaneProps } from './ScrollablePane.Props';
import { Sticky } from '../../Sticky';
import * as stylesImport from './ScrollablePane.scss';
const styles: any = stylesImport;

export interface IScrollablePaneContext {
  scrollablePane: PropTypes.Requireable<object>;
}

export class ScrollablePane extends BaseComponent<IScrollablePaneProps, {}> {
  public static childContextTypes: IScrollablePaneContext = {
    scrollablePane: PropTypes.object
  };

  public refs: {
    root: HTMLElement;
    stickyContainer: HTMLElement;
    stickyAbove: HTMLElement;
    stickyBelow: HTMLElement;
  };

  private _subscribers: Function[];
  private _stickyAbove: Sticky[];
  private _stickyBelow: Sticky[];

  constructor(props: IScrollablePaneProps) {
    super(props);
    this._subscribers = [];
    this._stickyAbove = [];
    this._stickyBelow = [];
  }

  public getChildContext() {
    return {
      scrollablePane: {
        subscribe: this.subscribe,
        addStickyHeader: this.addStickyHeader,
        removeStickyHeader: this.removeStickyHeader,
        addStickyFooter: this.addStickyFooter,
        removeStickyFooter: this.removeStickyFooter,
      }
    };
  }

  public componentDidMount() {
    const { root, stickyContainer, stickyAbove, stickyBelow } = this.refs;

    this._events.on(root, 'scroll', this._notifySubscribers);
    this._events.on(window, 'resize', this._onWindowResize);
    setTimeout(() => {
      this._resizeContainer();
      if (stickyContainer.parentElement && root.parentElement) {
        stickyContainer.parentElement.removeChild(stickyContainer);
        root.parentElement.insertBefore(stickyContainer, root.nextSibling);
        this._notifySubscribers();
        if (this._stickyAbove.length > 1) {
          this._sortStickies(this._stickyAbove, stickyAbove);
        }
        if (this._stickyBelow.length > 1) {
          this._sortStickies(this._stickyBelow, stickyBelow);
        }
      }
    }, 500);
  }

  public componentWillUnmount() {
    this._events.off(this.refs.root);
    this._events.off(window);
  }

  public render() {
    const { className } = this.props;

    return (
      <div
        ref='root'
        className={ css('ms-ScrollablePane', styles.root, className) }
        data-is-scrollable={ true }>
        <div ref='stickyContainer' className={ styles.stickyContainer }>
          <div ref='stickyAbove' className={ styles.stickyAbove } />
          <div ref='stickyBelow' className={ styles.stickyBelow } />
        </div>
        { this.props.children }
      </div>
    );
  }

  @autobind
  public subscribe(handler: (headerBound: ClientRect, footerBound: ClientRect) => void) {
    this._subscribers = this._subscribers.concat(handler);
  }

  @autobind
  public addStickyHeader(sticky: Sticky) {
    const { stickyAbove } = this.refs;
    this._addSticky(sticky, this._stickyAbove, stickyAbove, () => {
      stickyAbove.appendChild(sticky.content);
    });
  }

  @autobind
  public addStickyFooter(sticky: Sticky) {
    const { stickyBelow } = this.refs;
    this._addSticky(sticky, this._stickyBelow, stickyBelow, () => {
      stickyBelow.insertBefore(sticky.content, stickyBelow.firstChild);
    });
  }

  @autobind
  public removeStickyHeader(sticky: Sticky) {
    this._removeSticky(sticky, this._stickyAbove, this.refs.stickyAbove);
  }

  @autobind
  public removeStickyFooter(sticky: Sticky) {
    this._removeSticky(sticky, this._stickyBelow, this.refs.stickyBelow);
  }

  private _addSticky(sticky: Sticky, stickyList: Sticky[], container: HTMLElement, addStickyToContainer: () => void) {
    if (stickyList.indexOf(sticky) < 0) {
      stickyList.push(sticky);
      addStickyToContainer();
      sticky.content.addEventListener('transitionend',
        this._setPlaceholderHeights.bind(null, stickyList, container),
        false);
      if (sticky.props.stickyClassName) {
        setTimeout(() => {
          if (sticky.props.stickyClassName) {
            sticky.content.children[0].classList.add(sticky.props.stickyClassName);
          }
        }, 1);
      }
      this._notifySubscribers();
      this._setPlaceholderHeights(stickyList, container);
    }
  }

  private _removeSticky(sticky: Sticky, stickyList: Sticky[], container: HTMLElement) {
    const indexOfSticky = stickyList.indexOf(sticky);
    if (indexOfSticky >= 0) {
      sticky.content.removeEventListener('transitionend',
        this._setPlaceholderHeights.bind(null, stickyList, container));
      stickyList.splice(indexOfSticky, 1);
    }
  }

  private _onWindowResize() {
    const { stickyAbove, stickyBelow } = this.refs;
    setTimeout(() => {
      this._resizeContainer();
      this._notifySubscribers();
      this._setPlaceholderHeights(this._stickyAbove, stickyAbove);
      this._setPlaceholderHeights(this._stickyBelow, stickyBelow);
    }, 5);
  }

  private _resizeContainer() {
    const { stickyContainer, root } = this.refs;
    const { borderTopWidth, borderLeftWidth } = getComputedStyle(root);
    stickyContainer.style.height = root.clientHeight + 'px';
    stickyContainer.style.width = root.clientWidth + 'px';
    if (borderTopWidth) {
      stickyContainer.style.top = root.offsetTop + parseInt(borderTopWidth, 10) + 'px';
    }
    if (borderLeftWidth) {
      stickyContainer.style.left = root.offsetLeft + parseInt(borderLeftWidth, 10) + 'px';
    }
  }

  @autobind
  private _setPlaceholderHeights(stickies: Sticky[], element: HTMLElement) {
    const { stickyAbove, stickyBelow } = this.refs;
    stickies.forEach((sticky, idx) => {
      sticky.setPlaceholderHeight(element.children[idx].clientHeight);
    });
  }

  private _sortStickies(stickyList: Sticky[], container: HTMLElement): void {
    stickyList.sort((a, b) => {
      return a.refs.root.offsetTop - b.refs.root.offsetTop;
    });
    while (container.lastChild) {
      this.refs.stickyBelow.removeChild(container.lastChild);
    }
    stickyList.forEach((sticky) => {
      container.appendChild(sticky.content);
    });
  }

  private _notifySubscribers() {
    const { stickyAbove, stickyBelow } = this.refs;
    this._subscribers.forEach((handle) => {
      handle(stickyAbove.getBoundingClientRect(), stickyBelow.getBoundingClientRect());
    });
  }
}