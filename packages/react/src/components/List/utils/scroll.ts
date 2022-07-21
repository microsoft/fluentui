export const getScrollHeight = (el?: HTMLElement | Window): number => {
  if (el === undefined) {
    return 0;
  }

  let scrollHeight = 0;
  if ('scrollHeight' in el) {
    scrollHeight = el.scrollHeight;
  } else if ('document' in el) {
    scrollHeight = el.document.documentElement.scrollHeight;
  }

  // No need to round as scrollHeight is already rounded for us.
  // See: https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollHeight
  return scrollHeight;
};

export const getScrollYPosition = (el?: HTMLElement | Window): number => {
  if (el === undefined) {
    return 0;
  }

  let scrollPos = 0;
  if ('scrollTop' in el) {
    scrollPos = el.scrollTop;
  } else if ('scrollY' in el) {
    scrollPos = el.scrollY;
  }

  // Round this value to an integer as it may be fractional.
  // See: https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollTop
  // See: https://developer.mozilla.org/en-US/docs/Web/API/Window/scrollY
  return Math.ceil(scrollPos);
};

export const setScrollYPosition = (el: HTMLElement | Window, pos: number): void => {
  if ('scrollTop' in el) {
    el.scrollTop = pos;
  } else if ('scrollY' in el) {
    el.scrollTo(el.scrollX, pos);
  }
};
