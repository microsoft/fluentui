import * as React from 'react';
import {
  toElementArray,
  useStaggerItemsVisibility,
  DEFAULT_ITEM_DURATION,
  DEFAULT_ITEM_DELAY,
  acceptsVisibleProp,
  type StaggerMode,
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
  /** How children's visibility is managed. If undefined, auto-detects based on children. */
  mode?: StaggerMode;
}

// Internal props that include the required mode
interface StaggerBaseProps extends StaggerProps {
  mode: StaggerMode;
}

// TODO: support a render prop for custom rendering of children
const StaggerBase: React.FC<StaggerBaseProps> = ({
  children,
  visible = false,
  itemDelay = DEFAULT_ITEM_DELAY,
  itemDuration = DEFAULT_ITEM_DURATION,
  reversed = false,
  onMotionFinish,
  mode,
}) => {
  const elements = toElementArray(children);

  const { itemsVisibility } = useStaggerItemsVisibility({
    itemCount: elements.length,
    itemDelay,
    itemDuration,
    direction: visible ? 'enter' : 'exit',
    reversed,
    onMotionFinish,
    mode,
  });

  return (
    <>
      {elements.map((child, idx) => {
        const key = child.key ?? idx;

        if (mode === 'presence') {
          // Always render and control via visible prop (presence mode)
          return React.cloneElement(child, { key, visible: itemsVisibility[idx] });
        } else {
          // Mount/unmount based on visibility (mount mode)
          return itemsVisibility[idx] ? React.cloneElement(child, { key }) : null;
        }
      })}
    </>
  );
};

const StaggerIn: React.FC<Omit<StaggerProps, 'visible'>> = props => (
  <StaggerBase {...props} visible={true} mode="mount" />
);

const StaggerOut: React.FC<Omit<StaggerProps, 'visible'>> = props => (
  <StaggerBase {...props} visible={false} mode="mount" />
);

// Main Stagger component with auto-detection or explicit mode
const StaggerMain: React.FC<StaggerProps> = props => {
  const { mode, children, ...rest } = props;

  // Determine mode: explicit prop takes precedence, otherwise auto-detect
  let resolvedMode: StaggerMode;
  if (mode !== undefined) {
    resolvedMode = mode;
  } else {
    // Auto-detect based on children: if any child doesn't accept visible prop, use mount mode
    const elements = toElementArray(children);
    const hasNonPresenceItems = elements.every(child => !acceptsVisibleProp(child));
    resolvedMode = hasNonPresenceItems ? 'mount' : 'presence';
  }

  return <StaggerBase {...rest} children={children} mode={resolvedMode} />;
};

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
 * @param mode - How children's visibility is managed. Auto-detects if not specified.
 *
 * **Mode behavior:**
 * - `'presence'`: Children are presence components with `visible` prop (always rendered, visibility controlled via prop)
 * - `'mount'`: Children are mounted/unmounted from DOM based on visibility
 *
 * **Static variants:**
 * - `<Stagger.In>` - One-way stagger for entrance animations only (uses mount mode)
 * - `<Stagger.Out>` - One-way stagger for exit animations only (uses mount mode)
 *
 * @example
 * ```tsx
 * // Auto-detects mode based on children
 * <Stagger visible={isVisible} itemDelay={150} onMotionFinish={handleComplete}>
 *   <div>Item 1</div>
 *   <div>Item 2</div>
 *   <div>Item 3</div>
 * </Stagger>
 *
 * // Explicit mount mode for regular DOM elements
 * <Stagger.In itemDelay={100}>
 *   <div>Item 1</div>
 *   <div>Item 2</div>
 * </Stagger.In>
 *
 * // Presence mode for motion components
 * <Stagger visible={isVisible} mode="presence">
 *   <Fade><div>Item 1</div></Fade>
 *   <Scale><div>Item 2</div></Scale>
 * </Stagger>
 * ```
 */
export const Stagger = Object.assign(StaggerMain, {
  In: StaggerIn,
  Out: StaggerOut,
});
