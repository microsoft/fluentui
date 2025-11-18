import * as React from 'react';

/**
 * Checks if a React element has all of the specified props explicitly provided.
 *
 * @param element - React element to inspect
 * @param props - Array of prop names to verify presence on the element
 * @returns true if all props exist on element.props, false otherwise
 *
 * @internal - Exported for testing purposes
 */

/**
 * Checks if a React element is a motion component created by createMotionComponent.
 * Motion components are detected by the presence of the MOTION_DEFINITION symbol on the component.
 *
 * @param element - React element to inspect
 * @returns true when the element's type contains the MOTION_DEFINITION symbol
 *
 * **Note:** This is a heuristic detection. Motion components may or may not support
 * specific props like `delay` or `visible` depending on their implementation.
 *
 * @internal - Exported for testing purposes
 */
export function isMotionComponent(element: React.ReactElement): boolean {
  if (!element?.type || typeof element.type !== 'function') {
    return false;
  }

  // Check if the component has the MOTION_DEFINITION symbol (internal to createMotionComponent)
  const symbols = Object.getOwnPropertySymbols(element.type);
  return symbols.some(sym => sym.description === 'MOTION_DEFINITION');
}

/**
 * Checks if a React element is a presence motion component by looking for the PRESENCE_MOTION_DEFINITION symbol.
 * This symbol is added internally by createPresenceComponent and provides reliable detection.
 *
 * @param element - React element to inspect
 * @returns true when the element's type contains the PRESENCE_MOTION_DEFINITION symbol
 *
 * **Presence components** (like Fade, Scale, Slide) are guaranteed to support both `visible` and `delay` props.
 *
 * @internal - Exported for testing purposes
 */
export function isPresenceComponent(element: React.ReactElement): boolean {
  if (!element?.type || typeof element.type !== 'function') {
    return false;
  }

  // Check if the component has the PRESENCE_MOTION_DEFINITION symbol (internal to createPresenceComponent)
  const symbols = Object.getOwnPropertySymbols(element.type);
  return symbols.some(sym => sym.description === 'PRESENCE_MOTION_DEFINITION');
}

/**
 * Checks if a React element accepts both `delay` and `exitDelay` props.
 * This uses a best-effort heuristic to detect components that support both delay props.
 *
 * @param element - React element to inspect
 * @returns true when the element likely supports both delay and exitDelay props
 *
 * **Auto-detection includes:**
 * - Presence components (Fade, Scale, etc.) - guaranteed to support both delay and exitDelay
 * - Motion components (.In/.Out variants, custom motion components) - may support both delay props
 * - Elements with explicit delay and exitDelay props already set
 *
 * **When to override:** If auto-detection is incorrect, use explicit `delayMode` prop on Stagger.
 * For example, custom motion components that don't support both props should use `delayMode="timing"`.
 *
 * @internal - Exported for testing purposes
 */
export function acceptsDelayProps(element: React.ReactElement): boolean {
  return isPresenceComponent(element) || isMotionComponent(element);
}

/**
 * Checks if a React element accepts a `visible` prop.
 * This uses a best-effort heuristic to detect components that support visible props.
 *
 * @param element - React element to inspect
 * @returns true when the element likely supports a `visible` prop
 *
 * **Auto-detection includes:**
 * - Presence components (Fade, Scale, etc.) - guaranteed to support visible
 * - Elements with explicit visible props already set
 *
 * **When to override:** If auto-detection is incorrect, use explicit `hideMode` prop on Stagger.
 * For example, custom components that don't support visible should use `hideMode="visibilityStyle"` or `hideMode="unmount"`.
 *
 * @internal - Exported for testing purposes
 */
export function acceptsVisibleProp(element: React.ReactElement): boolean {
  return isPresenceComponent(element);
}
