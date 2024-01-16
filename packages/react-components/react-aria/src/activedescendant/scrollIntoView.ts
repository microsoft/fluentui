export const scrollIntoView = (
  target: HTMLElement | null | undefined,
  scrollParent: HTMLElement | null | undefined,
) => {
  if (!target || !scrollParent) {
    return;
  }

  if (scrollParent.offsetHeight >= scrollParent.scrollHeight) {
    return;
  }

  const { offsetHeight, offsetTop } = target;
  const { offsetHeight: parentOffsetHeight, scrollTop } = scrollParent;

  const isAbove = offsetTop < scrollTop;
  const isBelow = offsetTop + offsetHeight > scrollTop + parentOffsetHeight;

  const buffer = 2;

  if (isAbove) {
    scrollParent.scrollTo(0, offsetTop - buffer);
  }

  if (isBelow) {
    scrollParent.scrollTo(0, offsetTop - parentOffsetHeight + offsetHeight + buffer);
  }
};
