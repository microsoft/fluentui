import { EventGroup } from './EventGroup';
import { findScrollableParent } from './scroll';
import { getRect } from './dom/getRect';
import type { IRectangle } from './IRectangle';
import { getWindow } from './dom';

declare function setTimeout(cb: Function, delay: number): number;

const SCROLL_ITERATION_DELAY = 16;
const SCROLL_GUTTER = 100;
const MAX_SCROLL_VELOCITY = 15;

/**
 * AutoScroll simply hooks up mouse events given a parent element, and scrolls the container
 * up/down depending on how close the mouse is to the top/bottom of the container.
 *
 * Once you don't want autoscroll any more, just dispose the helper and it will unhook events.
 *
 * @public
 * {@docCategory AutoScroll}
 */
export class AutoScroll {
  private _events: EventGroup;
  private _scrollableParent: HTMLElement | null;
  private _scrollRect: IRectangle | undefined;
  private _scrollVelocity!: number;
  private _isVerticalScroll!: boolean;
  private _timeoutId?: number;

  constructor(element: HTMLElement, win?: Window) {
    const theWin = win ?? getWindow(element)!;
    this._events = new EventGroup(this);
    this._scrollableParent = findScrollableParent(element) as HTMLElement;

    this._incrementScroll = this._incrementScroll.bind(this);
    this._scrollRect = getRect(this._scrollableParent, theWin);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (this._scrollableParent === (theWin as any)) {
      this._scrollableParent = theWin.document.body;
    }

    if (this._scrollableParent) {
      this._events.on(theWin, 'mousemove', this._onMouseMove, true);
      this._events.on(theWin, 'touchmove', this._onTouchMove, true);
    }
  }

  public dispose(): void {
    this._events.dispose();
    this._stopScroll();
  }

  private _onMouseMove(ev: MouseEvent): void {
    this._computeScrollVelocity(ev);
  }

  private _onTouchMove(ev: TouchEvent): void {
    if (ev.touches.length > 0) {
      this._computeScrollVelocity(ev);
    }
  }

  private _computeScrollVelocity(ev: MouseEvent | TouchEvent): void {
    if (!this._scrollRect) {
      return;
    }

    let clientX: number;
    let clientY: number;
    if ('clientX' in ev) {
      clientX = ev.clientX;
      clientY = ev.clientY;
    } else {
      clientX = ev.touches[0].clientX;
      clientY = ev.touches[0].clientY;
    }

    let scrollRectTop = this._scrollRect.top;
    let scrollRectLeft = this._scrollRect.left;
    let scrollClientBottom = scrollRectTop + this._scrollRect.height - SCROLL_GUTTER;
    let scrollClientRight = scrollRectLeft + this._scrollRect.width - SCROLL_GUTTER;

    // variables to use for alternating scroll direction
    let scrollRect;
    let clientDirection;
    let scrollClient;

    // if either of these conditions are met we are scrolling vertically else horizontally
    if (clientY < scrollRectTop + SCROLL_GUTTER || clientY > scrollClientBottom) {
      clientDirection = clientY;
      scrollRect = scrollRectTop;
      scrollClient = scrollClientBottom;
      this._isVerticalScroll = true;
    } else {
      clientDirection = clientX;
      scrollRect = scrollRectLeft;
      scrollClient = scrollClientRight;
      this._isVerticalScroll = false;
    }

    // calculate scroll velocity and direction
    if (clientDirection! < scrollRect + SCROLL_GUTTER) {
      this._scrollVelocity = Math.max(
        -MAX_SCROLL_VELOCITY,
        -MAX_SCROLL_VELOCITY * ((SCROLL_GUTTER - (clientDirection - scrollRect)) / SCROLL_GUTTER),
      );
    } else if (clientDirection > scrollClient) {
      this._scrollVelocity = Math.min(
        MAX_SCROLL_VELOCITY,
        MAX_SCROLL_VELOCITY * ((clientDirection - scrollClient) / SCROLL_GUTTER),
      );
    } else {
      this._scrollVelocity = 0;
    }

    if (this._scrollVelocity) {
      this._startScroll();
    } else {
      this._stopScroll();
    }
  }

  private _startScroll(): void {
    if (!this._timeoutId) {
      this._incrementScroll();
    }
  }

  private _incrementScroll(): void {
    if (this._scrollableParent) {
      if (this._isVerticalScroll) {
        this._scrollableParent.scrollTop += Math.round(this._scrollVelocity);
      } else {
        this._scrollableParent.scrollLeft += Math.round(this._scrollVelocity);
      }
    }

    this._timeoutId = setTimeout(this._incrementScroll, SCROLL_ITERATION_DELAY);
  }

  private _stopScroll(): void {
    if (this._timeoutId) {
      clearTimeout(this._timeoutId);
      delete this._timeoutId;
    }
  }
}
