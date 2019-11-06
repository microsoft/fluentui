/**
 * Determines whether a component is controlled.
 * @param props - Component props
 * @param valueProp - Prop containing the controlled value
 * @returns true if controlled, false if uncontrolled
 */
export function isControlled<P>(props: P, valueProp: keyof P): boolean {
  // React's built-in <input> considers a prop to be provided if its value is non-null/undefined.
  // Mirror that behavior here (rather than checking for just undefined).
  return props[valueProp] !== undefined && props[valueProp] !== null;
}
