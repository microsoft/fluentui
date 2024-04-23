const getScrollContainerAndOffset = (
  element: HTMLElement | null,
  offsetTop: number = 0,
): { scrollParent: HTMLElement | null; cumulativeOffsetTop: number } => {
  if (element && element.offsetHeight >= element.scrollHeight) {
    return getScrollContainerAndOffset(element.parentElement, offsetTop + element.offsetTop);
  }

  return { scrollParent: element, cumulativeOffsetTop: offsetTop - (element?.offsetTop ?? 0) };
};

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

export const scrollIntoView = (target: HTMLElement | null | undefined, parent: HTMLElement | null | undefined) => {
  if (!target || !parent) {
    return;
  }

  const { scrollParent, cumulativeOffsetTop } = getScrollContainerAndOffset(parent);
  if (scrollParent === null) {
    return;
  }

  const { offsetHeight, offsetTop: targetOffsetTop } = target;
  const offsetTop = targetOffsetTop - cumulativeOffsetTop;

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
