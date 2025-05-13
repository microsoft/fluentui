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

export const Stagger = Object.assign(StaggerBase, {
  In: StaggerIn,
  Out: StaggerOut,
}) as StaggerComponent;
