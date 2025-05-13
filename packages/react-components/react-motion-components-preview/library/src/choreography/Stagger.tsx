import * as React from 'react';
import { useStaggeredReveal, UseStaggeredRevealParams } from './useStaggeredReveal';
import { toElementArray } from './toElementArray';

export interface StaggerProps extends Omit<UseStaggeredRevealParams, 'count'> {
  children: React.ReactNode;
}

export const Stagger: React.FC<StaggerProps> = ({
  children,
  delay,
  itemDuration,
  easingFn,
  direction,
  reverse,
  onMotionFinish,
}) => {
  const elementArray = toElementArray(children);
  const count = elementArray.length;

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
