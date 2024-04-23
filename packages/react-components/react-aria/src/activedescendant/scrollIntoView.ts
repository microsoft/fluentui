const getIntValueOfComputedStyle = (computedStyle: string) => {
  return computedStyle ? parseInt(computedStyle, 10) : 0;
};

const getScrollMargins = (element: HTMLElement) => {
  const computedStyles = getComputedStyle(element);
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
    return scrollParent.offsetTop * -1;
  }

  return element.offsetTop + getTotalOffsetTop(element.offsetParent as HTMLElement, scrollParent);
};

export const scrollIntoView = (target: HTMLElement | null | undefined) => {
  if (!target || !parent) {
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
