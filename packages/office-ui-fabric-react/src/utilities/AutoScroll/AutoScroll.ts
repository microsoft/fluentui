import { EventGroup } from '../eventGroup/EventGroup';
import { findScrollableParent } from '../scroll';
import { getRect } from '../dom';
import { IRectangle } from '../../common/IRectangle';

declare function setTimeout(cb: Function, delay: number): number;

const SCROLL_ITERATION_DELAY = 16;
const SCROLL_GUTTER_HEIGHT = 100;
const MAX_SCROLL_VELOCITY = 15;

/**
 * AutoScroll simply hooks up mouse events given a parent element, and scrolls the container
 * up/down depending on how close the mouse is to the top/bottom of the container.
 *
 * Once you don't want autoscroll any more, just dispose the helper and it will unhook events.
 */
export class AutoScroll {
  private _events: EventGroup;
  private _scrollableParent: HTMLElement;
  private _scrollRect: IRectangle;
  private _scrollVelocity: number;
  private _timeoutId: number;

  constructor(element: HTMLElement) {
    this._events = new EventGroup(this);
    this._scrollableParent = findScrollableParent(element);

    this._incrementScroll = this._incrementScroll.bind(this);
    this._scrollRect = getRect(this._scrollableParent);

    if (this._scrollableParent === window as any) {
      this._scrollableParent = document.body;
    }

    if (this._scrollableParent) {
      this._events.on(window, 'mousemove', this._onMouseMove, true);
    }
  }

  public dispose() {
    this._events.dispose();
    this._stopScroll();
  }

  private _onMouseMove(ev: MouseEvent) {
    let scrollRectTop = this._scrollRect.top;
    let scrollClientBottom = scrollRectTop + this._scrollRect.height - SCROLL_GUTTER_HEIGHT;

    if (ev.clientY < (scrollRectTop + SCROLL_GUTTER_HEIGHT)) {
      this._scrollVelocity = Math.max(
        -MAX_SCROLL_VELOCITY,
        -MAX_SCROLL_VELOCITY * ((SCROLL_GUTTER_HEIGHT - (ev.clientY - scrollRectTop)) / SCROLL_GUTTER_HEIGHT
      ));
    } else if (ev.clientY > scrollClientBottom) {
      this._scrollVelocity = Math.min(
        MAX_SCROLL_VELOCITY,
        MAX_SCROLL_VELOCITY * ((ev.clientY - scrollClientBottom) / SCROLL_GUTTER_HEIGHT
        ));
    } else {
      this._scrollVelocity = 0;
    }

    if (this._scrollVelocity) {
      this._startScroll();
    } else {
      this._stopScroll();
    }
  }

  private _startScroll() {
    if (!this._timeoutId) {
      this._incrementScroll();
    }
  }

  private _incrementScroll() {
    this._scrollableParent.scrollTop += Math.round(this._scrollVelocity);
    this._timeoutId = setTimeout(this._incrementScroll, SCROLL_ITERATION_DELAY);
  }

  private _stopScroll() {
    if (this._timeoutId) {
      clearTimeout(this._timeoutId);
      delete this._timeoutId;
    }
  }
}