/* tslint:disable:no-unused-variable */
import * as React from 'react';
import * as ReactDOM from 'react-dom';
/* tslint:enable:no-unused-variable */
import * as PropTypes from 'prop-types';
import {
  autobind,
  BaseComponent,
  classNamesFunction,
  customizable
} from '../../Utilities';
import {
  IScrollablePane,
  IScrollablePaneProps,
  IScrollablePaneStyles,
  IScrollablePaneStyleProps
} from './ScrollablePane.types';
import { Sticky } from '../../Sticky';

export interface IScrollablePaneContext {
  scrollablePane: PropTypes.Requireable<object>;
}

const getClassNames = classNamesFunction<IScrollablePaneStyleProps, IScrollablePaneStyles>();

@customizable('ScrollablePane', ['theme'])
export class ScrollablePaneBase extends BaseComponent<IScrollablePaneProps, {}> implements IScrollablePane {
  public static childContextTypes: React.ValidationMap<IScrollablePaneContext> = {
    scrollablePane: PropTypes.object
  };

  public root: HTMLElement;
  public stickyContainer: HTMLElement;
  public stickyAbove: HTMLElement;
  public stickyBelow: HTMLElement;
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
    this._events.on(this.root, 'scroll', this.notifySubscribers);
    this._events.on(window, 'resize', this._onWindowResize);
    this._async.setTimeout(() => {
      this._resizeContainer();
      if (this.stickyContainer.parentElement && this.root.parentElement) {
        this.stickyContainer.parentElement.removeChild(this.stickyContainer);
        this.root.parentElement.insertBefore(this.stickyContainer, this.root.nextSibling);
        this.notifySubscribers();
      }
    }, 500);
  }

  public componentWillUnmount() {
    this._events.off(this.root);
    this._events.off(window);
    if (this.stickyContainer.parentElement) {
      this.stickyContainer.parentElement.removeChild(this.stickyContainer);
    }
  }

  public render() {
    const { className, theme, getStyles } = this.props;
    const classNames = getClassNames(getStyles!,
      {
        theme: theme!,
        className
      }
    );

    return (
      <div
        ref={ this._resolveRef('root') }
        className={ classNames.root }
        data-is-scrollable={ true }
      >
        <div ref={ this._resolveRef('stickyContainer') } className={ classNames.stickyContainer }>
          <div ref={ this._resolveRef('stickyAbove') } className={ classNames.stickyAbove } />
          <div ref={ this._resolveRef('stickyBelow') } className={ classNames.stickyBelow } />
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
    this._addSticky(sticky, this._stickyAbove, this.stickyAbove, () => {
      this.stickyAbove.appendChild(sticky.content);
    });
  }

  @autobind
  public addStickyFooter(sticky: Sticky) {
    this._addSticky(sticky, this._stickyBelow, this.stickyBelow, () => {
      this.stickyBelow.insertBefore(sticky.content, this.stickyBelow.firstChild);
    });
  }

  @autobind
  public removeStickyHeader(sticky: Sticky) {
    this._removeSticky(sticky, this._stickyAbove, this.stickyAbove);
  }

  @autobind
  public removeStickyFooter(sticky: Sticky) {
    this._removeSticky(sticky, this._stickyBelow, this.stickyBelow);
  }

  @autobind
  public notifySubscribers(sort?: boolean): void {
    this._subscribers.forEach((handle) => {
      handle(this.stickyAbove.getBoundingClientRect(), this.stickyBelow.getBoundingClientRect());
    });
    if (this._stickyAbove.size > 1) {
      this._sortStickies(this._stickyAbove, this.stickyAbove);
    }
    if (this._stickyBelow.size > 1) {
      this._sortStickies(this._stickyBelow, this.stickyBelow);
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
        this._async.setTimeout(() => {
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
    this._async.setTimeout(() => {
      this._resizeContainer();
      this.notifySubscribers();
      this._setPlaceholderHeights(this._stickyAbove);
      this._setPlaceholderHeights(this._stickyBelow);
    }, 5);
  }

  private _resizeContainer() {
    const { stickyContainer, root } = this;
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
  private _setPlaceholderHeights(stickies: Set<Sticky>) {
    stickies.forEach((sticky, idx) => {
      sticky.setPlaceholderHeight(sticky.content.clientHeight);
    });
  }

  private _sortStickies(stickyList: Set<Sticky>, container: HTMLElement): void {
    let stickyArr = Array.from(stickyList);
    stickyArr = stickyArr.sort((a, b) => {
      const aOffset = this._calculateOffsetParent(a.root);
      const bOffset = this._calculateOffsetParent(b.root);
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
    while (ele.offsetParent !== this.root.offsetParent) {
      offset += ele.offsetTop;
      if (ele.parentElement) {
        ele = ele.parentElement;
      }
    }
    return offset;
  }
}