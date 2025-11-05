'use client';

import * as React from 'react';
import { useStaggerItemsVisibility } from './useStaggerItemsVisibility';
import {
  DEFAULT_ITEM_DURATION,
  DEFAULT_ITEM_DELAY,
  acceptsVisibleProp,
  acceptsDelayProps,
  getStaggerChildMapping,
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
    fallbackHideMode?: StaggerHideMode;
  },
): { hideMode: StaggerHideMode; delayMode: StaggerDelayMode } => {
  const { hideMode, delayMode, fallbackHideMode = 'visibilityStyle' } = options;

  const childMapping = getStaggerChildMapping(children);
  const elements = Object.values(childMapping).map(item => item.element);
  const hasVisiblePropSupport = elements.every(child => acceptsVisibleProp(child));
  const hasDelayPropSupport = elements.every(child => acceptsDelayProps(child));

  return {
    hideMode: hideMode ?? (hasVisiblePropSupport ? 'visibleProp' : fallbackHideMode),
    delayMode: delayMode ?? (hasDelayPropSupport ? 'delayProp' : 'timing'),
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
  const childMapping = React.useMemo(() => getStaggerChildMapping(children), [children]);

  // Always call hooks at the top level, regardless of delayMode
  const { itemsVisibility } = useStaggerItemsVisibility({
    childMapping,
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
        {Object.entries(childMapping).map(([key, { element, index }]) => {
          const staggerIndex = reversed ? Object.keys(childMapping).length - 1 - index : index;
          const delay = staggerIndex * itemDelay;

          // Clone element with delay prop (for enter direction) or exitDelay prop (for exit direction)
          const delayProp = direction === 'enter' ? { delay } : { exitDelay: delay };

          // Only set visible prop if the component supports it
          // Set visible based on direction: true for enter, false for exit
          const visibleProp = acceptsVisibleProp(element) ? { visible: direction === 'enter' } : {};

          return React.cloneElement(element, {
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
      {Object.entries(childMapping).map(([key, { element }]) => {
        if (hideMode === 'visibleProp') {
          // Use a generic record type for props to avoid `any` while still allowing unknown prop shapes.
          return React.cloneElement(element, {
            key,
            visible: itemsVisibility[key],
          } as Partial<Record<string, unknown>>);
        } else if (hideMode === 'visibilityStyle') {
          const childProps = element.props as Record<string, unknown> | undefined;
          const style = {
            ...(childProps?.style as Record<string, unknown> | undefined),
            visibility: itemsVisibility[key] ? 'visible' : 'hidden',
          };
          return React.cloneElement(element, { key, style } as Partial<Record<string, unknown>>);
        } else {
          // unmount mode
          return itemsVisibility[key] ? React.cloneElement(element, { key }) : null;
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
      // One-way stagger falls back to visibilityStyle if it doesn't detect visibleProp support
      fallbackHideMode: 'visibilityStyle',
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
    // Bidirectional stagger falls back to visibilityStyle if it doesn't detect visibleProp support
    fallbackHideMode: 'visibilityStyle',
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
 * @param visible - Controls animation direction. When `true`, the group is animating "enter" (items shown);
 * when `false`, the group is animating "exit" (items hidden). Defaults to `false`.
 * @param itemDelay - Milliseconds between each item's animation start.
 * Defaults to the package's default delay (see `DEFAULT_ITEM_DELAY`).
 * @param itemDuration - Milliseconds each item's animation lasts. Only used with `delayMode="timing"`.
 * Defaults to the package's default item duration (see `DEFAULT_ITEM_DURATION`).
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
 * import { Stagger, Fade, Scale, Rotate } from '@fluentui/react-motion-components-preview';
 *
 * // Auto-detects optimal modes for presence components (delayProp + visibleProp)
 * <Stagger visible={isVisible} itemDelay={150}>
 *   <Fade><div>Item 2</div></Fade>
 *   <Scale><div>Item 1</div></Scale>
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
