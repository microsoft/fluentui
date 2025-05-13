import * as React from 'react';
import { useStaggeredReveal, UseStaggeredRevealParams } from './useStaggeredReveal';
import { toElementArray } from './toElementArray';

const defaultEasingFn = (t: number) => t;

export interface PresenceStaggerProps extends Omit<UseStaggeredRevealParams, 'direction' | 'count'> {
  children: React.ReactNode; // Presence components must accept a `visible` boolean prop
  visible?: boolean; // true = enter, false = exit (defaults to false)
  reversed?: boolean; // run sequence backward
}

type PresenceStaggerComponent = React.FC<PresenceStaggerProps> & {
  In: typeof PresenceStagger;
  Out: typeof PresenceStagger;
};

const PresenceStaggerBase: React.FC<PresenceStaggerProps> = ({
  children,
  visible = false,
  delay = 100,
  itemDuration = 0,
  easingFn = defaultEasingFn,
  reversed: reverse = false,
  onMotionFinish,
}) => {
  const elements = toElementArray(children);
  const count = elements.length;
  const direction = visible ? 'enter' : 'exit';

  const { visibility } = useStaggeredReveal({
    count,
    delay,
    itemDuration,
    easingFn,
    direction,
    reversed: reverse,
    onMotionFinish,
  });

  return (
    <>
      {elements.map((child, idx) =>
        React.cloneElement(child, {
          key: child.key ?? idx,
          visible: visibility[idx],
        }),
      )}
    </>
  );
};

const PresenceStaggerIn: React.FC<Omit<PresenceStaggerProps, 'visible'>> = props => (
  <PresenceStaggerBase {...props} visible={true} />
);

const PresenceStaggerOut: React.FC<Omit<PresenceStaggerProps, 'visible'>> = props => (
  <PresenceStaggerBase {...props} visible={false} />
);

/**
 * PresenceStagger is a component that manages the staggered entrance and exit of its children.
 * The `children` should be a collection of components that accept a `visible` prop to control their visibility.
 * The `visible` prop determines whether the staggered animation is entering or exiting.
 * The `reverse` prop can be used to reverse the order of the entrance/exit animations.
 * The `delay`, `itemDuration`, and `easingFn` props control the timing and easing of the animations.
 * The `onMotionFinish` callback is triggered when the animation finishes.
 * The `In` and `Out` components are used to specify the entrance and exit animations respectively.
 */
export const PresenceStagger = Object.assign(PresenceStaggerBase, {
  In: PresenceStaggerIn,
  Out: PresenceStaggerOut,
}) as PresenceStaggerComponent;
