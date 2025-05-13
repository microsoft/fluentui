import * as React from 'react';
import { useStaggeredReveal, UseStaggeredRevealParams } from './useStaggerHook';
import { toElementArray } from './toElementArray';

export interface PresenceStaggerProps extends Omit<UseStaggeredRevealParams, 'direction' | 'count'> {
  children: React.ReactNode; // Presence components must accept a `visible` boolean prop
  visible?: boolean; // true = enter, false = exit (defaults to false)
  reverse?: boolean; // run sequence backward
}

export const PresenceStagger: React.FC<PresenceStaggerProps> = ({
  children,
  visible = false,
  delay = 100,
  itemDuration = 0,
  easingFn = t => t,
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
      {elements.map((child, idx) =>
        React.cloneElement(child, {
          key: child.key ?? idx,
          visible: visibility[idx],
        }),
      )}
    </>
  );
};
