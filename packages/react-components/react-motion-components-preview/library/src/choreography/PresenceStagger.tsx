import * as React from 'react';
import { childrenOrFragmentToArray } from './childrenOrFragmentToArray';
import { useStaggeredReveal } from './useStaggeredReveal';

/**
 * A PresenceStagger is a component that accepts Presence motion components
 * and renders them in a staggered manner with a set delay.
 * The difference from Stagger is that PresenceStagger wraps shows/hides its Presence children
 * by toggling their `visible` properties, whereas Stagger works with regular JSX children,
 * and it shows/hides them by adding/removing from the DOM.
 * An advantage of PresenceStagger is that the because the children remain in the DOM,
 * they can occupy space while they are hidden, preventing layout shifts.
 */
export const PresenceStagger: React.FC<{
  children: React.ReactNode;
  delay?: number;
  visible?: boolean;

  // TODO: refactor to a `visible` Boolean prop similar to Presence
  // mode?: 'enter' | 'exit' | 'enterReverse' | 'exitReverse';
  // exit?: boolean;
  reverse?: boolean;
  onMotionFinish?: () => void;
  // }> = ({ children, delay = 500, visible = false, exit = false, reverse = false, mode = 'enter', onMotionFinish }) => {
}> = ({ children, delay = 500, visible = false, reverse = false, onMotionFinish }) => {
  let mode = visible ? 'enter' : 'exit';
  if (reverse) {
    mode += 'Reverse';
  }

  const components = childrenOrFragmentToArray(children);
  // TODO: useStaggeredIndex instead?
  const visibleCount = useStaggeredReveal({ count: components.length, delay, onMotionFinish });

  const index = visibleCount - 1;

  // return all components up to the current index
  return (
    <>
      {components.map((component, i) => {
        let componentIsVisible = false;

        // if (!reverse) {
        //   componentIsVisible = i <= index;
        // } else {
        //   componentIsVisible = !(components.length - i > index + 1);
        // }
        // if (!visible) {
        //   componentIsVisible = !componentIsVisible;
        // }

        if (mode === 'enter') {
          componentIsVisible = i <= index;
        } else if (mode === 'exit') {
          componentIsVisible = !(i <= index);
        } else if (mode === 'exitReverse') {
          componentIsVisible = components.length - i > index + 1;
        } else if (mode === 'enterReverse') {
          componentIsVisible = !(components.length - i > index + 1);
        }

        return React.cloneElement(component, { key: i, visible: componentIsVisible });
      })}
    </>
  );
};
