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

export class ScrollablePane extends BaseComponent<IScrollablePaneProps, {}> {
  public static childContextTypes = {
    subscribe: PropTypes.func,
    addStickyHeader: PropTypes.func,
    removeStickyHeader: PropTypes.func,
    addStickyFooter: PropTypes.func,
    removeStickyFooter: PropTypes.func
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

  public getChildContext() {
    return {
      subscribe: this.subscribe,
      addStickyHeader: this.addStickyHeader,
      removeStickyHeader: this.removeStickyHeader,
      addStickyFooter: this.addStickyFooter,
      removeStickyFooter: this.removeStickyFooter,
    };
  }

  constructor(props: IScrollablePaneProps) {
    super(props);
    this._subscribers = [];
    this._stickyAbove = [];
    this._stickyBelow = [];
  }

  public componentDidMount() {
    const { root, stickyContainer } = this.refs;

    this._events.on(root, 'scroll', this._notifySubscribers);
    this._events.on(window, 'resize', this._onWindowResize);
    setTimeout(() => {
      this._resizeContainer();
      stickyContainer.parentElement.removeChild(stickyContainer);
      root.parentElement.insertBefore(stickyContainer, root.nextSibling);
      this._notifySubscribers();
      this._sortFooters();
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
  public subscribe(handler: (handler: Function) => void) {
    this._subscribers = this._subscribers.concat(handler);
  }

  @autobind
  public addStickyHeader(sticky: Sticky) {
    const { stickyAbove } = this.refs;
    if (this._stickyAbove.indexOf(sticky) < 0) {
      this._stickyAbove.push(sticky);
      stickyAbove.appendChild(sticky.content);
      // Add event listener to re calculate placeholder heights once animation ends
      sticky.content.addEventListener('transitionend',
        this._setPlaceholderHeights.bind(null, this._stickyAbove, stickyAbove),
        false);
      setTimeout(() => {
        sticky.content.children[0].classList.add(sticky.props.stickyClassName);
      }, 1);
      this._setPlaceholderHeights(this._stickyAbove, stickyAbove);
    }
  }

  @autobind
  public removeStickyHeader(sticky: Sticky) {
    const { stickyAbove } = this.refs;
    const indexOfHeader = this._stickyAbove.indexOf(sticky);
    if (indexOfHeader >= 0) {
      sticky.content.removeEventListener('transitionend',
        this._setPlaceholderHeights.bind(null, this._stickyAbove, stickyAbove));
      this._stickyAbove.splice(indexOfHeader, 1);
    }
  }

  @autobind
  public addStickyFooter(sticky: Sticky) {
    const { stickyBelow } = this.refs;
    if (this._stickyBelow.indexOf(sticky) < 0) {
      this._stickyBelow.push(sticky);
      stickyBelow.insertBefore(sticky.content, stickyBelow.firstChild);
      // Add event listener to re calculate placeholder heights once animation ends
      sticky.content.addEventListener('transitionend',
        this._setPlaceholderHeights.bind(null, this._stickyBelow, stickyBelow),
        false);
      setTimeout(() => {
        sticky.content.children[0].classList.add(sticky.props.stickyClassName);
      }, 1);
      this._setPlaceholderHeights(this._stickyBelow, stickyBelow);
    }
  }

  @autobind
  public removeStickyFooter(sticky: Sticky) {
    const { stickyBelow } = this.refs;
    const indexOfFooter = this._stickyBelow.indexOf(sticky);
    if (indexOfFooter >= 0) {
      sticky.content.removeEventListener('transitionend',
        this._setPlaceholderHeights.bind(null, this._stickyBelow, stickyBelow));
      this._stickyBelow.splice(indexOfFooter, 1);
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
    stickyContainer.style.height = root.clientHeight + 'px';
    stickyContainer.style.width = root.clientWidth + 'px';
    stickyContainer.style.top = root.offsetTop + parseInt(getComputedStyle(root, null).borderTopWidth, 10) + 'px';
    stickyContainer.style.left = root.offsetLeft + parseInt(getComputedStyle(root, null).borderLeftWidth, 10) + 'px';
  }

  @autobind
  private _setPlaceholderHeights(stickies: Sticky[], element: HTMLElement) {
    const { stickyAbove, stickyBelow } = this.refs;
    stickies.forEach((sticky, idx) => {
      sticky.setPlaceholderHeight(element.children[idx].clientHeight);
    });
  }

  private _sortFooters(): void {
    this._stickyBelow.sort((a, b) => {
      return a.refs.root.offsetTop - b.refs.root.offsetTop;
    });
    while (this.refs.stickyBelow.hasChildNodes()) {
      this.refs.stickyBelow.removeChild(this.refs.stickyBelow.lastChild);
    }
    this._stickyBelow.forEach((sticky) => {
      this.refs.stickyBelow.appendChild(sticky.content);
    });
  }

  private _notifySubscribers() {
    const { stickyAbove, stickyBelow } = this.refs;
    this._subscribers.forEach((handle) => {
      handle(stickyAbove.getBoundingClientRect(), stickyBelow.getBoundingClientRect());
    });
  }
}