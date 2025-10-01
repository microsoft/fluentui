'use client';

import * as React from 'react';
import { useStaggerItemsVisibility } from './useStaggerItemsVisibility';
import {
  toElementArray,
  DEFAULT_ITEM_DURATION,
  DEFAULT_ITEM_DELAY,
  acceptsVisibleProp,
  acceptsDelayProps,
} from './utils';
import { StaggerOneWayProps, StaggerProps, type StaggerHideMode, type StaggerDelayMode } from './stagger-types';

/**
 * Shared utility to detect optimal stagger modes based on children components.
 * Consolidates the auto-detection logic used by both StaggerMain and createStaggerDirection.
 */
const detectStaggerModes = (
  children: React.ReactNode,
  options: {
    hideMode?: StaggerHideMode;
    delayMode?: StaggerDelayMode;
    defaultHideMode?: StaggerHideMode;
  },
): { hideMode: StaggerHideMode; delayMode: StaggerDelayMode } => {
  const { hideMode, delayMode, defaultHideMode = 'visibilityStyle' } = options;

  const elements = toElementArray(children);
  const hasVisibleSupport = elements.every(child => acceptsVisibleProp(child));
  const hasDelaySupport = elements.every(child => acceptsDelayProps(child));

  return {
    hideMode: hideMode ?? (hasVisibleSupport ? 'visibleProp' : defaultHideMode),
    delayMode: delayMode ?? (hasDelaySupport ? 'delayProp' : 'timing'),
  };
};

const StaggerOneWay: React.FC<StaggerOneWayProps> = ({
  children,
  direction,
  itemDelay = DEFAULT_ITEM_DELAY,
  itemDuration = DEFAULT_ITEM_DURATION,
  reversed = false,
  hideMode,
  delayMode = 'timing',
  onMotionFinish,
}) => {
  const elements = toElementArray(children);

  // Always call hooks at the top level, regardless of delayMode
  const { itemsVisibility } = useStaggerItemsVisibility({
    itemCount: elements.length,
    itemDelay,
    itemDuration,
    direction,
    reversed,
    onMotionFinish,
    hideMode,
  });

  // For delayProp mode, pass delay props directly to motion components
  if (delayMode === 'delayProp') {
    return (
      <>
        {elements.map((child, idx) => {
          const key = child.key ?? idx;
          const staggerIndex = reversed ? elements.length - 1 - idx : idx;
          const delay = staggerIndex * itemDelay;

          // Clone element with delay prop (for enter direction) or exitDelay prop (for exit direction)
          const delayProp = direction === 'enter' ? { delay } : { exitDelay: delay };

          // Only set visible prop if the component supports it
          // Set visible based on direction: true for enter, false for exit
          const visibleProp = acceptsVisibleProp(child) ? { visible: direction === 'enter' } : {};

          return React.cloneElement(child, {
            key,
            ...visibleProp,
            ...delayProp,
          });
        })}
      </>
    );
  }

  // For timing mode, use the existing timing-based implementation

  return (
    <>
      {elements.map((child, idx) => {
        const key = child.key ?? idx;

        if (hideMode === 'visibleProp') {
          return React.cloneElement(child, { key, visible: itemsVisibility[idx] });
        } else if (hideMode === 'visibilityStyle') {
          const style = {
            ...child.props.style,
            visibility: itemsVisibility[idx] ? 'visible' : 'hidden',
          };
          return React.cloneElement(child, { key, style });
        } else {
          // unmount mode
          return itemsVisibility[idx] ? React.cloneElement(child, { key }) : null;
        }
      })}
    </>
  );
};

// Shared helper for StaggerIn and StaggerOut
const createStaggerDirection = (direction: 'enter' | 'exit') => {
  const StaggerDirection: React.FC<Omit<StaggerProps, 'visible'>> = ({ hideMode, delayMode, children, ...props }) => {
    // Auto-detect modes for better performance with motion components
    const { hideMode: resolvedHideMode, delayMode: resolvedDelayMode } = detectStaggerModes(children, {
      hideMode,
      delayMode,
      defaultHideMode: 'unmount', // One-way staggers default to unmount
    });

    return (
      <StaggerOneWay
        {...props}
        children={children}
        direction={direction}
        hideMode={resolvedHideMode}
        delayMode={resolvedDelayMode}
      />
    );
  };

  return StaggerDirection;
};

const StaggerIn = createStaggerDirection('enter');
const StaggerOut = createStaggerDirection('exit');

// Main Stagger component with auto-detection or explicit modes
const StaggerMain: React.FC<StaggerProps> = props => {
  const { children, visible = false, hideMode, delayMode, ...rest } = props;

  // Auto-detect modes for bidirectional stagger
  const { hideMode: resolvedHideMode, delayMode: resolvedDelayMode } = detectStaggerModes(children, {
    hideMode,
    delayMode,
    defaultHideMode: 'visibilityStyle', // Bidirectional staggers default to visibilityStyle
  });

  const direction = visible ? 'enter' : 'exit';

  return (
    <StaggerOneWay
      {...rest}
      children={children}
      hideMode={resolvedHideMode}
      delayMode={resolvedDelayMode}
      direction={direction}
    />
  );
};

/**
 * Stagger is a component that manages the staggered entrance and exit of its children.
 * Children are animated in sequence with configurable timing between each item.
 * Stagger can be interactively toggled between entrance and exit animations using the `visible` prop.
 *
 * @param children - React elements to animate. Elements are cloned with animation props.
 * @param visible - Controls animation direction: `true` for enter, `false` for exit. Defaults to `false`.
 * @param itemDelay - Milliseconds between each item's animation start. Defaults to 100ms.
 * @param itemDuration - Milliseconds each item's animation lasts. Only used with `delayMode="timing"`. Defaults to 200ms.
 * @param reversed - Whether to reverse the stagger sequence (last item animates first). Defaults to `false`.
 * @param hideMode - How children's visibility/mounting is managed. Auto-detects if not specified.
 * @param delayMode - How staggering timing is implemented. Auto-detects if not specified.
 * @param onMotionFinish - Callback invoked when the staggered animation sequence completes.
 *
 * **Auto-detection behavior:**
 * - **hideMode**: Presence components use `'visibleProp'`, DOM elements use `'visibilityStyle'`
 * - **delayMode**: Components with delay support use `'delayProp'` (most performant), others use `'timing'`
 *
 * **hideMode options:**
 * - `'visibleProp'`: Children are presence components with `visible` prop (always rendered, visibility controlled via prop)
 * - `'visibilityStyle'`: Children remain in DOM with inline style visibility: hidden/visible (preserves layout space)
 * - `'unmount'`: Children are mounted/unmounted from DOM based on visibility
 *
 * **delayMode options:**
 * - `'timing'`: Manages visibility over time using JavaScript timing
 * - `'delayProp'`: Passes delay props to motion components to use native Web Animations API delays (most performant)
 *
 * **Static variants:**
 * - `<Stagger.In>` - One-way stagger for entrance animations only (auto-detects optimal modes)
 * - `<Stagger.Out>` - One-way stagger for exit animations only (auto-detects optimal modes)
 *
 * @example
 * ```tsx
 * // Auto-detects optimal modes for presence components (delayProp + visibleProp)
 * <Stagger visible={isVisible} itemDelay={150}>
 *   <Scale><div>Item 1</div></Scale>
 *   <Fade><div>Item 2</div></Fade>
 *   <Rotate><div>Item 3</div></Rotate>
 * </Stagger>
 *
 * // Auto-detects optimal modes for motion components (delayProp + unmount)
 * <Stagger.In itemDelay={100}>
 *   <Scale.In><div>Item 1</div></Scale.In>
 *   <Fade.In><div>Item 2</div></Fade.In>
 * </Stagger.In>
 *
 * // Auto-detects timing mode for DOM elements (timing + visibilityStyle)
 * <Stagger visible={isVisible} itemDelay={150} onMotionFinish={handleComplete}>
 *   <div>Item 1</div>
 *   <div>Item 2</div>
 *   <div>Item 3</div>
 * </Stagger>
 *
 * // Override auto-detection when needed
 * <Stagger visible={isVisible} delayMode="timing" hideMode="unmount">
 *   <CustomComponent>Item 1</CustomComponent>
 * </Stagger>
 * ```
 */
export const Stagger = Object.assign(StaggerMain, {
  In: StaggerIn,
  Out: StaggerOut,
});
