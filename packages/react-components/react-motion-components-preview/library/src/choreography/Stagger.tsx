import * as React from 'react';
import { toElementArray, useStaggerItemsVisibility } from './stagger-utils';

export interface StaggerProps {
  children: React.ReactNode;
  visible?: boolean; // true = enter, false = exit (defaults to false)
  delay?: number;
  itemDuration?: number;
  reversed?: boolean; // run sequence backward (defaults to false)
  presence?: boolean; // If true, always render children and control via `visible` prop. If false, unmount when not visible.
  onMotionFinish?: () => void;
}

// TODO: support a render prop for custom rendering of children
const StaggerBase: React.FC<StaggerProps> = ({
  children,
  visible = false,
  delay = 100,
  itemDuration = 200,
  reversed = false,
  onMotionFinish,
  presence = false,
}) => {
  const elements = toElementArray(children);

  const { itemsVisibility: visibility } = useStaggerItemsVisibility({
    itemCount: elements.length,
    delay,
    itemDuration,
    direction: visible ? 'enter' : 'exit',
    reversed,
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
 * The `reversed` prop determines whether the staggered animation is reversed.
 * The `delay` and `itemDuration` props control the timing of the staggered animation.
 * The `onMotionFinish` prop is called when the staggered animation finishes.
 * The `presence` prop determines whether the children are always rendered or unmounted when not visible.
 * The `In` and `Out` components are used to specify the entrance and exit animations respectively.
 */
export const Stagger = Object.assign(StaggerBase, {
  In: StaggerIn,
  Out: StaggerOut,
});
