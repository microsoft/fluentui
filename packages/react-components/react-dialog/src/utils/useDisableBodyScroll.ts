import { makeStaticStyles } from '@griffel/react';

const disableScrollingClassName = 'disableScrolling' as const;
const fluentDisableScrollCountProp = '__fluentDisableScrollCount' as const;

const useStaticStyles = makeStaticStyles({
  [`.${disableScrollingClassName}`]: {
    overflowY: 'hidden',
  },
});

type FluentDisableScrollElement = HTMLElement & {
  [fluentDisableScrollCountProp]: number;
};

export function useDisableScroll() {
  useStaticStyles();
  return disableScroll;
}

/**
 * disables scrolling from a given element through `overflow: hidden` CSS property
 * @param target - element to disable scrolling from
 * @returns a method for enabling scrolling again
 */
function disableScroll(target: HTMLElement) {
  assertDisableScrollElement(target);
  target.classList.add(disableScrollingClassName);
  target[fluentDisableScrollCountProp]++;
  return () => {
    target[fluentDisableScrollCountProp]--;
    if (target[fluentDisableScrollCountProp] === 0) {
      target.classList.remove(disableScrollingClassName);
    }
  };
}

/**
 * asserts a given HTMLElement has the proper initial value
 * @param element element to be asserted
 */
function assertDisableScrollElement(element: HTMLElement): asserts element is FluentDisableScrollElement {
  (element as FluentDisableScrollElement)[fluentDisableScrollCountProp] ??= 0;
}
