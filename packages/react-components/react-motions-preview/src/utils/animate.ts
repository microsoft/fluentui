/**
 * Jest uses jsdom as the default environment, which doesn't support the Web Animations API. The same is true for
 * older browsers that are out of browser support matrix.
 *
 * This function is a wrapper around the `Element.animate` that prevents errors to be thrown in such environments.
 */
export function animate(
  element: HTMLElement,
  keyframes: Keyframe[],
  options: KeyframeAnimationOptions,
): Animation | null {
  if (typeof element.animate !== 'function') {
    return null;
  }

  return element.animate(keyframes, options);
}
