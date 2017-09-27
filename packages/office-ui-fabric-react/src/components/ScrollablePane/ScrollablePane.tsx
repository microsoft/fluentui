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
    const { root, stickyContainer } = this.refs;

    this._events.on(root, 'scroll', this.notifySubscribers);
    this._events.on(window, 'resize', this._onWindowResize);
    setTimeout(() => {
      this._resizeContainer();
      if (stickyContainer.parentElement && root.parentElement) {
        stickyContainer.parentElement.removeChild(stickyContainer);
        root.parentElement.insertBefore(stickyContainer, root.nextSibling);
        this.notifySubscribers();
      }
    }, 500);
  }

  public componentWillUnmount() {
    const { stickyContainer } = this.refs;
    this._events.off(this.refs.root);
    this._events.off(window);
    if (stickyContainer.parentElement) {
      stickyContainer.parentElement.removeChild(stickyContainer);
    }
  }

  public render() {
    const { className } = this.props;

    return (
      <div
        ref='root'
        className={ css('ms-ScrollablePane', styles.root, className) }
        data-is-scrollable={ true }
      >
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
    this._subscribers.add(handler);
  }

  @autobind
  public unsubscribe(handler: (headerBound: ClientRect, footerBound: ClientRect) => void) {
    this._subscribers.delete(handler);
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

  @autobind
  public notifySubscribers(sort?: boolean): void {
    const { stickyAbove, stickyBelow } = this.refs;
    this._subscribers.forEach((handle) => {
      handle(stickyAbove.getBoundingClientRect(), stickyBelow.getBoundingClientRect());
    });
    if (this._stickyAbove.size > 1) {
      this._sortStickies(this._stickyAbove, stickyAbove);
    }
    if (this._stickyBelow.size > 1) {
      this._sortStickies(this._stickyBelow, stickyBelow);
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
  private _setPlaceholderHeights(stickies: Set<Sticky>) {
    stickies.forEach((sticky, idx) => {
      sticky.setPlaceholderHeight(sticky.content.clientHeight);
    });
  }

  private _sortStickies(stickyList: Set<Sticky>, container: HTMLElement): void {
    let stickyArr = Array.from(stickyList);
    stickyArr = stickyArr.sort((a, b) => {
      const [aParent, bParent] = [a.refs.root, b.refs.root].map((parent) => {
        return this._findScrollablePaneParent(parent);
      });
      return aParent.offsetTop - bParent.offsetTop;
    });
    while (container.lastChild) {
      container.removeChild(container.lastChild);
    }
    stickyArr.forEach((sticky) => {
      container.appendChild(sticky.content);
    });
  }

  private _findScrollablePaneParent(element: HTMLElement): HTMLElement {
    while (element.parentElement !== this.refs.root && element.parentElement !== null) {
      element = element.parentElement;
    }
    return element;
  }
}