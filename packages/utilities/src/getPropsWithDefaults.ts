/**
 * Function to apply default values to a component props object. This function is intended for function components,
 * to maintain parity with the `defaultProps` feature of class components. It accounts for properties that are
 * specified, but undefined.
 * @param defaultProps- An object with default values for various properties
 * @param propsWithoutDefaults- The props object passed into the component
 */
export function getPropsWithDefaults<TProps extends {}>(
  defaultProps: Partial<TProps>,
  propsWithoutDefaults: TProps,
): TProps {
  const props = { ...propsWithoutDefaults };
  for (const key of Object.keys(defaultProps) as (keyof TProps)[]) {
    if (props[key] === undefined) {
      props[key] = defaultProps[key]!;
    }
  }

  return props;
}
