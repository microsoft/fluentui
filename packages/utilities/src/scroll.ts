import { getDocument } from './dom/getDocument';
import { mergeStyles } from '@uifabric/merge-styles';
import { EventGroup } from './EventGroup';

let _scrollbarWidth: number;
let _bodyScrollDisabledCount = 0;

const DisabledScrollClassName = mergeStyles({
  overflow: 'hidden !important' as 'hidden'
});

/**
 * Placing this attribute on scrollable divs optimizes detection to know
 * if the div is scrollable or not (given we can avoid expensive operations
 * like getComputedStyle.)
 *
 * @public
 */
export const DATA_IS_SCROLLABLE_ATTRIBUTE = 'data-is-scrollable';

const _makeElementScrollAllower = () => {
  let _previousClientY = 0;
  let _element: Element | null = null;

  // remember the clientY for future calls of _preventOverscrolling
  const _saveClientY = (event: TouchEvent): void => {
    if (event.targetTouches.length === 1) {
      _previousClientY = event.targetTouches[0].clientY;
    }
  };

  // prevent the body from scrolling when the user attempts
  // to scroll past the top or bottom of the element
  const _preventOverscrolling = (event: TouchEvent): void => {
    // only respond to a single-finger touch
    if (event.targetTouches.length !== 1) {
      return;
    }

    // prevent the body touchmove handler from firing
    // so that scrolling is allowed within the element
    event.stopPropagation();

    if (!_element) {
      return;
    }

    const clientY = event.targetTouches[0].clientY - _previousClientY;

    const scrollableParent = findScrollableParent(event.target as HTMLElement);
    if (scrollableParent) {
      _element = scrollableParent;
    }

    // if the element is scrolled to the top,
    // prevent the user from scrolling up
    if (_element.scrollTop === 0 && clientY > 0) {
      event.preventDefault();
    }

    // if the element is scrolled to the bottom,
    // prevent the user from scrolling down
    if (_element.scrollHeight - _element.scrollTop <= _element.clientHeight && clientY < 0) {
      event.preventDefault();
    }
  };

  return (element: HTMLElement | null, events: EventGroup): void => {
    if (!element) {
      return;
    }

    events.on(element, 'touchstart', _saveClientY, { passive: false });
    events.on(element, 'touchmove', _preventOverscrolling, { passive: false });

    _element = element;
  };
};

/**
 * Allows the user to scroll within a element,
 * while preventing the user from scrolling the body
 */
export const allowScrollOnElement = _makeElementScrollAllower();

const _disableIosBodyScroll = (event: TouchEvent) => {
  event.preventDefault();
};

/**
 * Disables the body scrolling.
 *
 * @public
 */
export function disableBodyScroll(): void {
  let doc = getDocument();

  if (doc && doc.body && !_bodyScrollDisabledCount) {
    doc.body.classList.add(DisabledScrollClassName);
    doc.body.addEventListener('touchmove', _disableIosBodyScroll, { passive: false, capture: false });
  }

  _bodyScrollDisabledCount++;
}

/**
 * Enables the body scrolling.
 *
 * @public
 */
export function enableBodyScroll(): void {
  if (_bodyScrollDisabledCount > 0) {
    let doc = getDocument();

    if (doc && doc.body && _bodyScrollDisabledCount === 1) {
      doc.body.classList.remove(DisabledScrollClassName);
      doc.body.removeEventListener('touchmove', _disableIosBodyScroll);
    }

    _bodyScrollDisabledCount--;
  }
}

/**
 * Calculates the width of a scrollbar for the browser/os.
 *
 * @public
 */
export function getScrollbarWidth(): number {
  if (_scrollbarWidth === undefined) {
    let scrollDiv: HTMLElement = document.createElement('div');
    scrollDiv.style.setProperty('width', '100px');
    scrollDiv.style.setProperty('height', '100px');
    scrollDiv.style.setProperty('overflow', 'scroll');
    scrollDiv.style.setProperty('position', 'absolute');
    scrollDiv.style.setProperty('top', '-9999px');
    document.body.appendChild(scrollDiv);
    // Get the scrollbar width
    _scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;

    // Delete the DIV
    document.body.removeChild(scrollDiv);
  }

  return _scrollbarWidth;
}

/**
 * Traverses up the DOM for the element with the data-is-scrollable=true attribute, or returns
 * document.body.
 *
 * @public
 */
export function findScrollableParent(startingElement: HTMLElement | null): HTMLElement | null {
  let el: HTMLElement | null = startingElement;

  // First do a quick scan for the scrollable attribute.
  while (el && el !== document.body) {
    if (el.getAttribute(DATA_IS_SCROLLABLE_ATTRIBUTE) === 'true') {
      return el;
    }
    el = el.parentElement;
  }

  // If we haven't found it, the use the slower method: compute styles to evaluate if overflow is set.
  el = startingElement;

  while (el && el !== document.body) {
    if (el.getAttribute(DATA_IS_SCROLLABLE_ATTRIBUTE) !== 'false') {
      const computedStyles = getComputedStyle(el);
      let overflowY = computedStyles ? computedStyles.getPropertyValue('overflow-y') : '';

      if (overflowY && (overflowY === 'scroll' || overflowY === 'auto')) {
        return el;
      }
    }

    el = el.parentElement;
  }

  // Fall back to window scroll.
  if (!el || el === document.body) {
    // tslint:disable-next-line:no-any
    el = window as any;
  }

  return el;
}
