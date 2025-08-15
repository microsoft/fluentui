import * as React from 'react';
import {
  toElementArray,
  useStaggerItemsVisibility,
  DEFAULT_ITEM_DURATION,
  DEFAULT_ITEM_DELAY,
  acceptsVisibleProp,
} from './stagger-utils';

/**
 * Props for the Stagger component that manages staggered entrance and exit animations.
 */
export interface StaggerProps {
  /** React elements to animate. Elements are cloned with animation props. */
  children: React.ReactNode;
  /** Controls animation direction: `true` for enter, `false` for exit. Defaults to `false`. */
  visible?: boolean; // true = enter, false = exit (defaults to false)
  /** Milliseconds between each item's animation start. Defaults to 100ms. */
  itemDelay?: number;
  /** Milliseconds each item's animation lasts. Defaults to 200ms. */
  itemDuration?: number;
  /** Whether to reverse the stagger sequence (last item animates first). Defaults to `false`. */
  reversed?: boolean; // run sequence backward (defaults to false)
  /** Callback invoked when the staggered animation sequence completes. */
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

        if (acceptsVisibleProp(child)) {
          // Child expects visible prop, always render and control via visible
          return React.cloneElement(child, { key, visible: visibility[idx] });
        } else {
          // Child doesn't expect visible prop, use mount/unmount
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
 * Children are animated in sequence with configurable timing between each item.
 * Stagger can be interactively toggled between entrance and exit animations using the `visible` prop.
 *
 * @param children - React elements to animate. Elements are cloned with animation props.
 * @param visible - Controls animation direction: `true` for enter, `false` for exit. Defaults to `false`.
 * @param itemDelay - Milliseconds between each item's animation start. Defaults to 100ms.
 * @param itemDuration - Milliseconds each item's animation lasts. Defaults to 200ms.
 * @param reversed - Whether to reverse the stagger sequence (last item animates first). Defaults to `false`.
 * @param onMotionFinish - Callback invoked when the staggered animation sequence completes.
 *
 * Children that already have a `visible` prop are always rendered and controlled via that prop.
 * Other children are shown and hidden by mounting/unmounting from the DOM.
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
