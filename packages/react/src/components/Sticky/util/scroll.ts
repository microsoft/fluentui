export type GetScrollTopInRange = (el: HTMLElement, range: number) => number;

export type ScrollUtils = {
  getScrollTopInRange: GetScrollTopInRange;
};

export const getScrollUtils: () => ScrollUtils = () => {
  const scrollTopElements = new Map<HTMLElement, number>();

  const getScrollTopInRange: GetScrollTopInRange = (el, range) => {
    const currentScrollTop = el.scrollTop;
    const prevScrollTop = scrollTopElements.get(el) ?? NaN;

    if (prevScrollTop - range <= currentScrollTop && prevScrollTop + range >= currentScrollTop) {
      return prevScrollTop;
    }

    scrollTopElements.set(el, currentScrollTop);
    return currentScrollTop;
  };

  return {
    getScrollTopInRange,
  };
};
