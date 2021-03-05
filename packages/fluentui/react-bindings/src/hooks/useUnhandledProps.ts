import { getUnhandledProps } from '../utils/getUnhandledProps';

/**
 * Returns an object consisting of props beyond the scope of the Component.
 * Useful for getting and spreading unknown props from the user.
 *
 * @param handledProps - An array with names of props
 * @param props - A ReactElement props object
 * @returns A shallow copy of the prop object
 */
export function useUnhandledProps(handledProps: string[], props: Record<string, any>): Record<string, any> {
  if (process.env.NODE_ENV === 'test') {
    return getUnhandledProps(handledProps, {
      ...props,
      'data-uses-unhanded-props': true,
    } as Record<string, any>);
  }

  return getUnhandledProps(handledProps, props);
}
