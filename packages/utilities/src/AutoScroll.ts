import { EventGroup } from './EventGroup';
import { findScrollableParent } from './scroll';
import { getRect } from './dom';
import { IRectangle } from './IRectangle';

declare function setTimeout(cb: Function, delay: number): number;

const SCROLL_ITERATION_DELAY = 16;
const SCROLL_GUTTER_HEIGHT = 100;
const SCROLL_GUTTER_WIDTH = 100;
const MAX_SCROLL_VELOCITY = 15;

/**
 * AutoScroll simply hooks up mouse events given a parent element, and scrolls the container
 * up/down depending on how close the mouse is to the top/bottom of the container.
 *
 * Once you don't want autoscroll any more, just dispose the helper and it will unhook events.
 *
 * @public
 */
export class AutoScroll {
  private _events: EventGroup;
  private _scrollableParent: HTMLElement | null;
  private _scrollRect: IRectangle | undefined;
  private _verticalScrollVelocity: number;
  private _verticalScrollTimeoutId: number;
  private _horizontalScrollVelocity: number;
  private _horizontalScrollTimeoutId: number;

  constructor(element: HTMLElement) {
    this._events = new EventGroup(this);
    this._scrollableParent = findScrollableParent(element);
    this._incrementVerticalScroll = this._incrementVerticalScroll.bind(this);
    this._incrementHorizontalScroll = this._incrementHorizontalScroll.bind(this);
    this._scrollRect = getRect(this._scrollableParent);

    // tslint:disable-next-line:no-any
    if (this._scrollableParent === (window as any)) {
      this._scrollableParent = document.body;
    }

    if (this._scrollableParent) {
      this._events.on(window, 'mousemove', this._onMouseMove, true);
      this._events.on(window, 'touchmove', this._onTouchMove, true);
      this._events.on(window, 'dragover', this._onMouseMove, true);
    }
  }

  public dispose(): void {
    this._events.dispose();
    this._stopVerticalScroll();
    this._stopHorizontalScroll();
  }

  private _onMouseMove(ev: MouseEvent): void {
    this._computeVerticalScrollVelocity(ev.clientY);
    this._computeHorizontalScrollVelocity(ev.clientX);
  }

  private _onTouchMove(ev: TouchEvent): void {
    if (ev.touches.length > 0) {
      this._computeVerticalScrollVelocity(ev.touches[0].clientY);
      this._computeHorizontalScrollVelocity(ev.touches[0].clientX);
    }
  }

  private _computeVerticalScrollVelocity(clientY: number): void {
    if (!this._scrollRect) {
      return;
    }

    let scrollRectTop = this._scrollRect.top;
    let scrollClientBottom = scrollRectTop + this._scrollRect.height - SCROLL_GUTTER_HEIGHT;

    if (clientY < scrollRectTop + SCROLL_GUTTER_HEIGHT) {
      this._verticalScrollVelocity = Math.max(
        -MAX_SCROLL_VELOCITY,
        -MAX_SCROLL_VELOCITY * ((SCROLL_GUTTER_HEIGHT - (clientY - scrollRectTop)) / SCROLL_GUTTER_HEIGHT)
      );
    } else if (clientY > scrollClientBottom) {
      this._verticalScrollVelocity = Math.min(
        MAX_SCROLL_VELOCITY,
        MAX_SCROLL_VELOCITY * ((clientY - scrollClientBottom) / SCROLL_GUTTER_HEIGHT)
      );
    } else {
      this._verticalScrollVelocity = 0;
    }

    if (this._verticalScrollVelocity) {
      this._startVerticalScroll();
    } else {
      this._stopVerticalScroll();
    }
  }

  private _computeHorizontalScrollVelocity(clientX: number): void {
    if (!this._scrollRect) {
      return;
    }

    let scrollRectLeft = this._scrollRect.left;
    let scrollClientRight = scrollRectLeft + this._scrollRect.width - SCROLL_GUTTER_WIDTH;

    if (clientX < scrollRectLeft + SCROLL_GUTTER_WIDTH) {
      this._horizontalScrollVelocity = Math.max(
        -MAX_SCROLL_VELOCITY,
        -MAX_SCROLL_VELOCITY * ((SCROLL_GUTTER_WIDTH - (clientX - scrollRectLeft)) / SCROLL_GUTTER_WIDTH)
      );
    } else if (clientX > scrollClientRight) {
      this._horizontalScrollVelocity = Math.min(
        MAX_SCROLL_VELOCITY,
        MAX_SCROLL_VELOCITY * ((clientX - scrollClientRight) / SCROLL_GUTTER_WIDTH)
      );
    } else {
      this._horizontalScrollVelocity = 0;
    }

    if (this._horizontalScrollVelocity) {
      this._startHorizontalScroll();
    } else {
      this._stopHorizontalScroll();
    }
  }

  private _startVerticalScroll(): void {
    if (!this._verticalScrollTimeoutId) {
      this._incrementVerticalScroll();
    }
  }

  private _startHorizontalScroll(): void {
    if (!this._horizontalScrollTimeoutId) {
      this._incrementHorizontalScroll();
    }
  }

  private _incrementVerticalScroll(): void {
    if (this._scrollableParent) {
      this._scrollableParent.scrollTop += Math.round(this._verticalScrollVelocity);
    }

    this._verticalScrollTimeoutId = setTimeout(this._incrementVerticalScroll, SCROLL_ITERATION_DELAY);
  }

  private _incrementHorizontalScroll(): void {
    if (this._scrollableParent) {
      this._scrollableParent.scrollLeft += Math.round(this._horizontalScrollVelocity);
    }

    this._horizontalScrollTimeoutId = setTimeout(this._incrementHorizontalScroll, SCROLL_ITERATION_DELAY);
  }

  private _stopVerticalScroll(): void {
    if (this._verticalScrollTimeoutId) {
      clearTimeout(this._verticalScrollTimeoutId);
      delete this._verticalScrollTimeoutId;
    }
  }

  private _stopHorizontalScroll(): void {
    if (this._horizontalScrollTimeoutId) {
      clearTimeout(this._horizontalScrollTimeoutId);
      delete this._horizontalScrollTimeoutId;
    }
  }
}
