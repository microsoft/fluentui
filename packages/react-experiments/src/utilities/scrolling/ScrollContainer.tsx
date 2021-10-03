import * as React from 'react';
import * as PropTypes from 'prop-types';
import { css, Async, initializeComponentRef } from '@fluentui/react/lib/Utilities';

import * as ScrollContainerStyles from './ScrollContainer.scss';
import type { IScrollContainerProps } from './ScrollContainer.types';

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
  scrollContainer: PropTypes.object.isRequired,
};

export class ScrollContainer extends React.Component<IScrollContainerProps> implements IScrollContainer {
  public static childContextTypes: typeof ScrollContainerContextTypes = ScrollContainerContextTypes;

  private _observer: IntersectionObserver;

  private _root: HTMLDivElement;

  private _callbacks: IVisibleCallback[] = [];
  private _pendingElements: Element[] = [];

  private _async: Async;

  constructor(props: IScrollContainerProps) {
    super(props);

    this._async = new Async(this);
    initializeComponentRef(this);
  }

  public getChildContext(): IScrollContainerContext {
    return {
      scrollContainer: this,
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
    const { children, className } = this.props;

    return (
      <div
        className={css('ms-ScrollContainer', ScrollContainerStyles.root, className)}
        data-is-scrollable={true}
        ref={this._resolveRoot}
      >
        {children as JSX.Element}
      </div>
    );
  }

  public componentWillUnmount(): void {
    if (this._observer) {
      this._observer.disconnect();
    }

    this._async.dispose();
  }

  private _resolveRoot = (element: HTMLDivElement): void => {
    if (element) {
      this._root = element;
      this._init();
    }
  };

  private _onIntersection = (entries: IntersectionObserverEntry[], observer: IntersectionObserver): void => {
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
  };

  private _init(): void {
    if (typeof IntersectionObserver !== 'undefined') {
      const threshold: number[] = [];
      for (let i = 0; i < 100; ++i) {
        threshold.push(i / 100.0);
      }

      this._observer = new IntersectionObserver(
        this._onIntersection as IntersectionObserverCallback,
        {
          root: this._root,
          threshold,
        } as IntersectionObserverInit,
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
        passive: true,
      } as any);
    }
  }

  private _onScroll = (): void => {
    const scrollTop = this._root.scrollTop;

    for (const callback of this._callbacks) {
      callback(scrollTop);
    }
  };
}
