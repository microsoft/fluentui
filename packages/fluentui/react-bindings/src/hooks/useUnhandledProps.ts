import useComposeOptions from '../compose/useComposeOptions';
import getUnhandledProps from '../utils/getUnhandledProps';

/**
 * Returns an object consisting of props beyond the scope of the Component.
 * Useful for getting and spreading unknown props from the user.
 *
 * @param handledProps - An array with names of props
 * @param props - A ReactElement props object
 * @returns A shallow copy of the prop object
 */
function useUnhandledProps<P extends Record<string, any>>(handledProps: (keyof P)[], props: P): Partial<P> {
  const composeOptions = useComposeOptions();

  if (process.env.NODE_ENV === 'test') {
    return getUnhandledProps([...handledProps, ...(composeOptions?.handledProps || [])], {
      ...props,
      'data-uses-unhanded-props': true,
    });
  }

  return getUnhandledProps([...handledProps, ...(composeOptions?.handledProps || [])], props);
}

export default useUnhandledProps;
