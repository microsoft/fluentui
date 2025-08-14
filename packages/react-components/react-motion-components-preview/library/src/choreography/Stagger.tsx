import * as React from 'react';
import { toElementArray, useStaggerItemsVisibility, DEFAULT_ITEM_DURATION, DEFAULT_ITEM_DELAY } from './stagger-utils';

export interface StaggerProps {
  children: React.ReactNode;
  visible?: boolean; // true = enter, false = exit (defaults to false)
  itemDelay?: number;
  itemDuration?: number;
  reversed?: boolean; // run sequence backward (defaults to false)
  presence?: boolean; // If true, always render children and control via `visible` prop. If false, unmount when not visible.
  appear?: boolean; // If true, children will animate on first mount. Defaults to false.
  onMotionFinish?: () => void;
}

// TODO: support a render prop for custom rendering of children
const StaggerBase: React.FC<StaggerProps> = ({
  children,
  visible = false,
  itemDelay = DEFAULT_ITEM_DELAY,
  itemDuration = DEFAULT_ITEM_DURATION,
  reversed = false,
  onMotionFinish,
  presence = false,
  appear = false,
}) => {
  const elements = toElementArray(children);

  const { itemsVisibility: visibility } = useStaggerItemsVisibility({
    itemCount: elements.length,
    itemDelay,
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
          // Always render, control visibility via `visible` prop
          return React.cloneElement(child, { key, visible: visibility[idx], appear });
        } else {
          // Only render when visible
          return visibility[idx] ? React.cloneElement(child, { key, appear }) : null;
        }
      })}
    </>
  );
};

type StaggerOneWay = React.FC<Omit<StaggerProps, 'visible'>>;

const StaggerIn: StaggerOneWay = props => <StaggerBase {...props} visible={true} />;
const StaggerOut: StaggerOneWay = props => <StaggerBase {...props} visible={false} />;

/**
 * Stagger is a component that manages the staggered entrance and exit of its children.
 * Children are animated in sequence with configurable timing between each item.
 * Stagger can be interactively toggled between entrance and exit animations using the `visible` prop.
 *
 * @param children - React elements to animate. Elements are cloned with animation props.
 * @param visible - Controls animation direction: `true` for enter, `false` for exit. Defaults to `false`.
 * @param itemDelay - Milliseconds between each item's animation start. Defaults to 100ms.
 * @param itemDuration - Milliseconds each item's animation lasts. Defaults to 200ms.
 * @param reversed - Whether to reverse the stagger sequence (last item animates first). Defaults to `false`.
 * @param presence - If `true`, always renders children and controls via `visible` prop. If `false`, unmounts when not visible. Defaults to `false`.
 * @param appear - If `true`, children animate on first mount. Defaults to `false`.
 * @param onMotionFinish - Callback invoked when the staggered animation sequence completes.
 *
 * Presence children maintain DOM presence but are shown and hidden by receiving the `visible` prop.
 * Other children are shown and hidden by rendering to, or omitting from, the DOM.
 *
 * **Static variants:**
 * - `<Stagger.In>` - One-way stagger for entrance animations only
 * - `<Stagger.Out>` - One-way stagger for exit animations only
 *
 * @example
 * ```tsx
 * <Stagger visible={isVisible} itemDelay={150} onMotionFinish={handleComplete}>
 *   <div>Item 1</div>
 *   <div>Item 2</div>
 *   <div>Item 3</div>
 * </Stagger>
 * ```
 */
export const Stagger = Object.assign(StaggerBase, {
  In: StaggerIn,
  Out: StaggerOut,
});
