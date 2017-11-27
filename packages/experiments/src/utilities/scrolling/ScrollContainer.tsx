import * as React from 'react';
import { BaseComponent, autobind } from '../../Utilities';
import { IScrollContainerProps } from './ScrollContainer.Props';

export interface IVisibleCallback {
  (scrollTop: number): void;
}

export interface IScrollContainer {
  observe(element: Element): void;

  unobserve(element: Element): void;

  registerVisibleCallback(callback: IVisibleCallback): void;
}

export interface IScrollContainerContext {
  scrollContainer: IScrollContainer;
}

export const ScrollContainerContextTypes = {
  scrollContainer: React.PropTypes.object.isRequired
};

// Work around typescript definition file issue
declare var IntersectionObserver: any;

export class ScrollContainer extends BaseComponent<IScrollContainerProps> implements IScrollContainer {
  public static childContextTypes = ScrollContainerContextTypes;

  private _observer: IntersectionObserver;

  private _root: HTMLDivElement;

  private _callbacks: IVisibleCallback[] = [];
  private _pendingElements: Element[] = [];

  public getChildContext(): IScrollContainerContext {
    return {
      scrollContainer: this
    };
  }

  public observe(element: Element): void {
    if (this._observer) {
      this._observer.observe(element);
    } else {
      this._pendingElements.push(element);
    }
  }

  public unobserve(element: Element): void {
    if (this._observer) {
      this._observer.unobserve(element);
    }
  }

  public registerVisibleCallback(callback: IVisibleCallback): void {
    this._callbacks.push(callback);
  }

  public render(): JSX.Element {
    const { children } = this.props;

    return (
      <div data-is-scrollable={ true } ref={ this._resolveRoot } style={ { height: 800, overflow: 'auto' } } >
        { children as JSX.Element }
      </div>
    );
  }

  public componentWillUnmount() {
    if (this._observer) {
      this._observer.disconnect();
    }
  }

  @autobind
  private _resolveRoot(element: HTMLDivElement): void {
    if (element) {
      this._root = element;
      this._init();
    }
  }

  @autobind
  private _onIntersection(entries: IntersectionObserverEntry[], observer: IntersectionObserver) {
    for (const entry of entries) {
      if ((entry as any).isIntersecting || entry.intersectionRatio > 0) {
        // Schedule callbacks on next frame
        this._async.requestAnimationFrame(() => {
          const scrollTop = this._root.scrollTop;
          for (const callback of this._callbacks) {
            callback(scrollTop);
          }
        });

        // Only need to call callbacks for on entry
        return;
      }
    }
  }

  private _init() {
    if (typeof IntersectionObserver !== 'undefined') {
      const threshold: number[] = [];
      for (let i = 0; i < 100; ++i) {
        threshold.push(i / 100.0);
      }

      this._observer = new IntersectionObserver(
        this._onIntersection as IntersectionObserverCallback,
        {
          root: this._root,
          // rootMargin: '100% 0%',
          threshold
        } as IntersectionObserverInit
      );

      // If there were attempts to observe elements before the observer was ready, add them now
      if (this._pendingElements.length > 0) {
        for (const pendingElement of this._pendingElements) {
          this._observer.observe(pendingElement);
        }

        this._pendingElements = [];
      }
    } else {
      const { scrollDebounceDelay } = this.props;
      this._onScroll = this._async.debounce(this._onScroll, scrollDebounceDelay);

      // No intersection observer, rely on scroll event. Note: not all browsers support options, but since
      // we don't need capture, we can pass it and have it ignored if not supported
      this._root.addEventListener('scroll', this._onScroll, {
        passive: true
      } as any);
    }
  }

  @autobind
  private _onScroll(): void {
    const scrollTop = this._root.scrollTop;

    for (const callback of this._callbacks) {
      callback(scrollTop);
    }
  }
}