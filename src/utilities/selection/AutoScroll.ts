import { EventGroup } from '../eventGroup/EventGroup';
import { findScrollableParent } from '../scrollUtilities';

const SCROLL_ITERATION_DELAY = 30;
const SCROLL_GUTTER_HEIGHT = 100;
const MAX_SCROLL_VELOCITY = 20;

export class AutoScroll {
  private _events: EventGroup;
  private _scrollableParent: HTMLElement;
  private _scrollVelocity: number;
  private _intervalId: number;

  constructor(element: HTMLElement) {
    this._events = new EventGroup(this);
    this._scrollableParent = findScrollableParent(element);

    if (this._scrollableParent) {
      this._events.on(window, 'mousemove', this._onMouseMove, true);
    }
  }

  public dispose() {
    this._events.dispose();
    this._stopInterval();
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
      this._startInterval();
    } else {
      this._stopInterval();
    }
  }

  private _startInterval() {
    if (!this._intervalId) {
      this._intervalId = setInterval(() => {
        this._scrollableParent.scrollTop += this._scrollVelocity;
      }, SCROLL_ITERATION_DELAY);
    }
  }

  private _stopInterval() {
    if (this._intervalId) {
      clearInterval(this._intervalId);
      delete this._intervalId;
    }
  }
}