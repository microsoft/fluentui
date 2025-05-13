import * as React from 'react';
import { useStaggeredReveal, UseStaggeredRevealParams } from './useStaggeredReveal';
import { toElementArray } from './toElementArray';

const defaultEasingFn = (t: number) => t;

export interface PresenceStaggerProps extends Omit<UseStaggeredRevealParams, 'direction' | 'count'> {
  children: React.ReactNode; // Presence components must accept a `visible` boolean prop
  visible?: boolean; // true = enter, false = exit (defaults to false)
  reverse?: boolean; // run sequence backward
}

// TODO: Try to automatically detect the presence component type in the children
// and set the `visible` prop on them, otherwise show/hide non-presence children
// by not rendering them.
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

const PresenceStaggerIn: React.FC<Omit<PresenceStaggerProps, 'visible'>> = props => (
  <PresenceStaggerBase {...props} visible={true} />
);

const PresenceStaggerOut: React.FC<Omit<PresenceStaggerProps, 'visible'>> = props => (
  <PresenceStaggerBase {...props} visible={false} />
);

export const PresenceStagger = Object.assign(PresenceStaggerBase, {
  In: PresenceStaggerIn,
  Out: PresenceStaggerOut,
}) as PresenceStaggerComponent;
