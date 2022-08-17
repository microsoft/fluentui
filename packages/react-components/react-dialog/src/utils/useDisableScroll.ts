import * as React from 'react';

export function useDisableScroll() {
  const previousOverflowStyle = React.useRef<string>('');
  /**
   * disables scrolling from a given element through `overflow: hidden` CSS property
   * @param target - element to disable scrolling from
   * @returns a method for enabling scrolling again
   */
  return (target: HTMLElement) => {
    previousOverflowStyle.current = target.style.overflow;
    target.style.overflow = 'hidden';
    return () => {
      target.style.overflow = previousOverflowStyle.current;
    };
  };
}
