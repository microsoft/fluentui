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
import { IScrollablePane, IScrollablePaneProps } from './ScrollablePane.types';
import { Sticky } from '../../Sticky';
import * as stylesImport from './ScrollablePane.scss';
const styles: any = stylesImport;

export interface IScrollablePaneContext {
  scrollablePane: PropTypes.Requireable<object>;
}

export class ScrollablePane extends BaseComponent<IScrollablePaneProps, {}> implements IScrollablePane {
  public static childContextTypes: IScrollablePaneContext = {
    scrollablePane: PropTypes.object
  };

  private _root: HTMLDivElement;
  private _stickyContainer: HTMLDivElement;
  private _stickyAboveElement: HTMLElement;
  private _stickyBelowElement: HTMLElement;

  private _subscribers: Set<Function>;
  private _stickyAbove: Set<Sticky>;
  private _stickyBelow: Set<Sticky>;

  constructor(props: IScrollablePaneProps) {
    super(props);
    this._subscribers = new Set<Function>();
    this._stickyAbove = new Set<Sticky>();
    this._stickyBelow = new Set<Sticky>();
  }

  public getChildContext() {
    return {
      scrollablePane: {
        subscribe: this.subscribe,
        unsubscribe: this.unsubscribe,
        addStickyHeader: this.addStickyHeader,
        removeStickyHeader: this.removeStickyHeader,
        addStickyFooter: this.addStickyFooter,
        removeStickyFooter: this.removeStickyFooter,
        notifySubscribers: this.notifySubscribers
      }
    };
  }

  public componentDidMount() {
    const { _root, _stickyContainer } = this;

    this._events.on(_root, 'scroll', this.notifySubscribers);
    this._events.on(window, 'resize', this._onWindowResize);
    setTimeout(() => {
      this._resizeContainer();
      if (_stickyContainer.parentElement && _root.parentElement) {
        _stickyContainer.parentElement.removeChild(_stickyContainer);
        _root.parentElement.insertBefore(_stickyContainer, _root.nextSibling);
        this.notifySubscribers();
      }
    }, 500);
  }

  public componentWillUnmount() {
    const { _stickyContainer } = this;
    this._events.off(this._root);
    this._events.off(window);
    if (_stickyContainer.parentElement) {
      _stickyContainer.parentElement.removeChild(_stickyContainer);
    }
  }

  public render() {
    const { className } = this.props;

    return (
      <div
        ref={ this._resolveRef('_root') }
        className={ css('ms-ScrollablePane', styles.root, className) }
        data-is-scrollable={ true }
      >
        <div ref={ this._resolveRef('_stickyContainer') } className={ styles.stickyContainer }>
          <div ref={ this._resolveRef('_stickyAboveElement') } className={ styles.stickyAbove } />
          <div ref={ this._resolveRef('_stickyBelowElement') } className={ styles.stickyBelow } />
        </div>
        { this.props.children }
      </div>
    );
  }

  public forceLayoutUpdate() {
    this._onWindowResize();
  }

  @autobind
  public subscribe(handler: (headerBound: ClientRect, footerBound: ClientRect) => void) {
    this._subscribers.add(handler);
  }

  @autobind
  public unsubscribe(handler: (headerBound: ClientRect, footerBound: ClientRect) => void) {
    this._subscribers.delete(handler);
  }

  @autobind
  public addStickyHeader(sticky: Sticky) {
    this._addSticky(sticky, this._stickyAbove, this._stickyAboveElement, () => {
      this._stickyAboveElement.appendChild(sticky.content);
    });
  }

  @autobind
  public addStickyFooter(sticky: Sticky) {
    const { _stickyBelowElement } = this;
    this._addSticky(sticky, this._stickyBelow, _stickyBelowElement, () => {
      _stickyBelowElement.insertBefore(sticky.content, _stickyBelowElement.firstChild);
    });
  }

  @autobind
  public removeStickyHeader(sticky: Sticky) {
    this._removeSticky(sticky, this._stickyAbove, this._stickyAboveElement);
  }

  @autobind
  public removeStickyFooter(sticky: Sticky) {
    this._removeSticky(sticky, this._stickyBelow, this._stickyBelowElement);
  }

  @autobind
  public notifySubscribers(sort?: boolean): void {
    this._subscribers.forEach((handle) => {
      handle(this._stickyAboveElement.getBoundingClientRect(), this._stickyBelowElement.getBoundingClientRect());
    });
    if (this._stickyAbove.size > 1) {
      this._sortStickies(this._stickyAbove, this._stickyAboveElement);
    }
    if (this._stickyBelow.size > 1) {
      this._sortStickies(this._stickyBelow, this._stickyBelowElement);
    }
  }

  private _addSticky(sticky: Sticky, stickyList: Set<Sticky>, container: HTMLElement, addStickyToContainer: () => void) {
    if (!stickyList.has(sticky)) {
      stickyList.add(sticky);
      addStickyToContainer();
      sticky.content.addEventListener('transitionend',
        this._setPlaceholderHeights.bind(null, stickyList),
        false);
      if (sticky.props.stickyClassName) {
        setTimeout(() => {
          if (sticky.props.stickyClassName) {
            sticky.content.children[0].classList.add(sticky.props.stickyClassName);
          }
        }, 1);
      }
      this.notifySubscribers();
      this._setPlaceholderHeights(stickyList);
    }
  }

  private _removeSticky(sticky: Sticky, stickyList: Set<Sticky>, container: HTMLElement) {
    if (stickyList.has(sticky)) {
      sticky.content.removeEventListener('transitionend',
        this._setPlaceholderHeights.bind(null, stickyList, container));
      stickyList.delete(sticky);
    }
  }

  private _onWindowResize() {
    setTimeout(() => {
      this._resizeContainer();
      this.notifySubscribers();
      this._setPlaceholderHeights(this._stickyAbove);
      this._setPlaceholderHeights(this._stickyBelow);
    }, 5);
  }

  private _resizeContainer() {
    const { _stickyContainer, _root } = this;
    const { borderTopWidth, borderLeftWidth } = getComputedStyle(_root);
    _stickyContainer.style.height = _root.clientHeight + 'px';
    _stickyContainer.style.width = _root.clientWidth + 'px';
    if (borderTopWidth) {
      _stickyContainer.style.top = _root.offsetTop + parseInt(borderTopWidth, 10) + 'px';
    }
    if (borderLeftWidth) {
      _stickyContainer.style.left = _root.offsetLeft + parseInt(borderLeftWidth, 10) + 'px';
    }
  }

  @autobind
  private _setPlaceholderHeights(stickies: Set<Sticky>) {
    stickies.forEach((sticky, idx) => {
      sticky.setPlaceholderHeight(sticky.content.clientHeight);
    });
  }

  private _sortStickies(stickyList: Set<Sticky>, container: HTMLElement): void {
    let stickyArr = Array.from(stickyList);
    stickyArr = stickyArr.sort((a, b) => {
      const aOffset = this._calculateOffsetParent(a._root);
      const bOffset = this._calculateOffsetParent(b._root);
      return aOffset - bOffset;
    });
    while (container.lastChild) {
      container.removeChild(container.lastChild);
    }
    stickyArr.forEach((sticky) => {
      container.appendChild(sticky.content);
    });
  }

  private _calculateOffsetParent(ele: HTMLElement): number {
    let offset = 0;
    while (ele.offsetParent !== this._root.offsetParent) {
      offset += ele.offsetTop;
      if (ele.parentElement) {
        ele = ele.parentElement;
      }
    }
    return offset;
  }
}