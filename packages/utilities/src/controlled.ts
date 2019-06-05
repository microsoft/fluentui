/**
 * Determines whether a component is controlled.
 * @param props - Component props
 * @param valueProp - Prop containing the controlled value
 * @param defaultValueProp - Prop containing the uncontrolled default value
 * @returns true if controlled, false if uncontrolled, undefined if indeterminate (neither value
 * nor default value prop is set; typically treated as uncontrolled)
 */
export function isControlled<P>(props: P, valueProp: keyof P, defaultValueProp: keyof P): boolean | undefined {
  // React's built-in <input> considers a prop to be provided if its value is non-null/undefined.
  // Mirror that behavior here (rather than checking for just undefined).

  // The check for value must come first, since it takes precedence over defaultValue.
  if (props[valueProp] !== undefined && props[valueProp] !== null) {
    return true;
  }
  if (props[defaultValueProp] !== undefined && props[defaultValueProp] !== null) {
    return false;
  }
  return undefined;
}
