import * as React from 'react';
import { toElementArray, useStaggeredReveal } from './stagger-utils';

// const defaultEasingFn = (t: number) => t;

export interface StaggerProps {
  children: React.ReactNode;
  visible?: boolean; // true = enter, false = exit (defaults to false)
  delay?: number;
  itemDuration?: number;
  // TODO: support easing functions in CSS string format
  // easingFn?: (t: number) => number;
  // TODO: use a clearer name like `fromEnd` because `reverse` is ambiguous as 'exit' is the reverse of 'enter'
  reversed?: boolean; // run sequence backward (defaults to false)
  onMotionFinish?: () => void;
  presence?: boolean; // If true, always render children and control via `visible` prop. If false, unmount when not visible.
}

type StaggerComponent = React.FC<StaggerProps> & {
  In: typeof Stagger;
  Out: typeof Stagger;
};

// TODO: support a render prop for custom rendering of children
const StaggerBase: React.FC<StaggerProps> = ({
  children,
  visible = false,
  delay = 100,
  itemDuration = 0,
  // easingFn = defaultEasingFn,
  reversed: reverse = false,
  onMotionFinish,
  presence = false,
}) => {
  const elements = toElementArray(children);
  const count = elements.length;
  const direction = visible ? 'enter' : 'exit';

  const { visibility } = useStaggeredReveal({
    count,
    delay,
    itemDuration,
    // easingFn,
    direction,
    reversed: reverse,
    onMotionFinish,
  });

  return (
    <>
      {elements.map((child, idx) => {
        const key = child.key ?? idx;
        if (presence) {
          // Always render, control visibility via prop
          return React.cloneElement(child, { key, visible: visibility[idx] });
        } else {
          // Only render when visible
          return visibility[idx] ? React.cloneElement(child, { key }) : null;
        }
      })}
    </>
  );
};

const StaggerIn: React.FC<Omit<StaggerProps, 'visible'>> = props => <StaggerBase {...props} visible={true} />;
const StaggerOut: React.FC<Omit<StaggerProps, 'visible'>> = props => <StaggerBase {...props} visible={false} />;

/**
 * Stagger is a component that manages the staggered entrance and exit of its children.
 * The `children` can be React elements or presence components that accept a `visible` prop to be shown or hidden.
 * Stagger's own `visible` prop determines whether the staggered animation is entering or exiting.
 * The `reverse` prop determines whether the staggered animation is reversed.
 * The `delay` and `itemDuration` props control the timing of the staggered animation.
 * The `onMotionFinish` prop is called when the staggered animation finishes.
 * The `presence` prop determines whether the children are always rendered or unmounted when not visible.
 * The `In` and `Out` components are used to specify the entrance and exit animations respectively.
 */
export const Stagger = Object.assign(StaggerBase, {
  In: StaggerIn,
  Out: StaggerOut,
});
