export const scrollIntoView = (target: HTMLElement | null | undefined) => {
  if (!target) {
    return;
  }

  const scrollParent = findScrollableParent(target.parentElement as HTMLElement);
  if (!scrollParent) {
    return;
  }

  const { offsetHeight } = target;
  const offsetTop = getTotalOffsetTop(target, scrollParent);

  const { scrollMarginTop, scrollMarginBottom } = getScrollMargins(target);

  const { offsetHeight: parentOffsetHeight, scrollTop } = scrollParent;

  const isAbove = offsetTop - scrollMarginTop < scrollTop;
  const isBelow = offsetTop + offsetHeight + scrollMarginBottom > scrollTop + parentOffsetHeight;

  const buffer = 2;

  if (isAbove) {
    scrollParent.scrollTo(0, offsetTop - scrollMarginTop - buffer);
  } else if (isBelow) {
    scrollParent.scrollTo(0, offsetTop + offsetHeight + scrollMarginBottom - parentOffsetHeight + buffer);
  }
};

const findScrollableParent = (element: HTMLElement | null): HTMLElement | null => {
  if (!element) {
    return null;
  }

  if (element.scrollHeight > element.offsetHeight) {
    return element;
  }

  return findScrollableParent(element.parentElement);
};

const getTotalOffsetTop = (element: HTMLElement, scrollParent: HTMLElement): number => {
  if (!element || element === scrollParent) {
    return 0;
  }

  if (element.contains(scrollParent)) {
    // subtract the scroll parent's offset top from the running total if the offsetParent is above it
    return scrollParent.offsetTop * -1;
  }

  return element.offsetTop + getTotalOffsetTop(element.offsetParent as HTMLElement, scrollParent);
};

const getScrollMargins = (element: HTMLElement) => {
  const win = element.ownerDocument?.defaultView;
  if (!win) {
    return {
      scrollMarginTop: 0,
      scrollMarginBottom: 0,
    };
  }

  const computedStyles = win.getComputedStyle(element);
  const scrollMarginTop =
    getIntValueOfComputedStyle(computedStyles.scrollMarginTop) ??
    getIntValueOfComputedStyle(computedStyles.scrollMarginBlockStart);
  const scrollMarginBottom =
    getIntValueOfComputedStyle(computedStyles.scrollMarginBottom) ??
    getIntValueOfComputedStyle(computedStyles.scrollMarginBlockEnd);
  return {
    scrollMarginTop,
    scrollMarginBottom,
  };
};

const getIntValueOfComputedStyle = (computedStyle: string) => {
  return computedStyle ? parseInt(computedStyle, 10) : 0;
};
