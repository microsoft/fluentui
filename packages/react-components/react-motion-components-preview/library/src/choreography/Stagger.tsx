import * as React from 'react';
import { useStaggeredReveal, UseStaggeredRevealParams } from './useStaggeredReveal';
import { toElementArray } from './toElementArray';

const defaultEasingFn = (t: number) => t;

export interface StaggerProps extends Omit<UseStaggeredRevealParams, 'direction' | 'count'> {
  children: React.ReactNode;
  visible?: boolean; // true = enter, false = exit (defaults to false)
  reverse?: boolean;
}

type StaggerComponent = React.FC<StaggerProps> & {
  In: typeof Stagger;
  Out: typeof Stagger;
};

const StaggerBase: React.FC<StaggerProps> = ({
  children,
  visible = false,
  delay = 100,
  itemDuration = 0,
  easingFn = defaultEasingFn,
  reverse = false,
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
    reverse,
    onMotionFinish,
  });

  return (
    <>
      {elementArray.map((child, idx) =>
        visibility[idx] ? React.cloneElement(child, { key: child.key ?? idx }) : null,
      )}
    </>
  );
};

const StaggerIn: React.FC<Omit<StaggerProps, 'visible'>> = props => <StaggerBase {...props} visible={true} />;

const StaggerOut: React.FC<Omit<StaggerProps, 'visible'>> = props => <StaggerBase {...props} visible={false} />;

/**
 * Stagger is a component that manages the staggered entrance and exit of its children.
 * The `children` can be React elements.
 * The `visible` prop determines whether the staggered animation is entering or exiting.
 * The `reverse` prop determines whether the staggered animation is reversed.
 * The `delay`, `itemDuration`, and `easingFn` props control the timing and easing of the staggered animation.
 * The `onMotionFinish` prop is called when the staggered animation finishes.
 * The `In` and `Out` components are used to specify the entrance and exit animations respectively.
 */
export const Stagger = Object.assign(StaggerBase, {
  In: StaggerIn,
  Out: StaggerOut,
}) as StaggerComponent;
