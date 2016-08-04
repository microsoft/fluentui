import { EventGroup } from '../eventGroup/EventGroup';
import { findScrollableParent } from '../scrollUtilities';

const SCROLL_ITERATION_DELAY = 30;
const SCROLL_GUTTER_HEIGHT = 100;
const MAX_SCROLL_VELOCITY = 20;

export class AutoScroll {
  private _events: EventGroup;
  private _scrollableParent: HTMLElement;
  private _scrollVelocity: number;
  private _timeoutId: number;

  constructor(element: HTMLElement) {
    this._events = new EventGroup(this);
    this._scrollableParent = findScrollableParent(element);
    this._incrementScroll = this._incrementScroll.bind(this);

    if (this._scrollableParent) {
      this._events.on(window, 'mousemove', this._onMouseMove, true);
    }
  }

  public dispose() {
    this._events.dispose();
    this._stopScroll();
  }

  private _onMouseMove(ev: MouseEvent) {
    let scrollRect = this._scrollableParent.getBoundingClientRect();
    let scrollClientBottom = scrollRect.top + scrollRect.height - SCROLL_GUTTER_HEIGHT;

    if (ev.clientY < (scrollRect.top + SCROLL_GUTTER_HEIGHT)) {
      this._scrollVelocity = Math.max(
        -MAX_SCROLL_VELOCITY,
        -MAX_SCROLL_VELOCITY * ((SCROLL_GUTTER_HEIGHT - (ev.clientY - scrollRect.top)) / SCROLL_GUTTER_HEIGHT
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