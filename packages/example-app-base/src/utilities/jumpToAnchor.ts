import { extractAnchorLink } from './extractAnchorLink';

const SCROLL_DISTANCE = 52;

/**
 * Scroll to and focus an element, similar to native functionality for jumping to an anchor link.
 *
 * @param anchor - ID of the element to jump to. This element should be programmatically focusable
 * (set tabIndex=-1 if not natively focusable) to fully simulate the native jumping behavior.
 * @param scrollDistance - Offset from the top
 */
export function jumpToAnchor(anchor?: string, scrollDistance: number = SCROLL_DISTANCE): void {
  const windowLink = typeof window !== 'undefined' ? extractAnchorLink(window.location.hash) : undefined;
  const hash = anchor || windowLink;
  const el = hash && document.getElementById(hash);
  if (hash && el) {
    const elRect = el.getBoundingClientRect();
    const windowY = window.scrollY || window.pageYOffset;
    const currentScrollPosition = windowY + elRect.top;
    const top = currentScrollPosition - scrollDistance;
    if (window.scrollTo) {
      if (window.navigator.userAgent.indexOf('rv:11.0') > -1 || window.navigator.userAgent.indexOf('Edge') > -1) {
        // Edge currently has a bug that jumps to the top of the page if window.scrollTo is passed an oject.
        window.scrollTo(0, top);
      } else {
        window.scrollTo({
          top,
          behavior: 'smooth',
        });
      }
    }
    el.focus();
  }
}
