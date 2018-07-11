import { ReactWrapper } from 'enzyme';
/**
 * Injects a function call prior to running a method for a component
 * rendered using enzyme deep rendering.
 * @param wrapper - The enzyme deep rendering wrapper object to modify
 * @param methodName - The name of the method to modify on the wrapper
 * @param fn - The function to run prior to the call of the original method
 */
export function injectWrapperMethod(wrapper: ReactWrapper<{}, {}>, methodName: string, fn: () => void): void {
  // tslint:disable-next-line:no-any
  const originalMethod = (wrapper.instance() as any)[methodName];

  if (typeof originalMethod !== 'function') {
    throw new Error(`Tried to override the method ${methodName} on a ReactWrapper that does not have that function`);
  }

  // tslint:disable-next-line:no-any
  (wrapper.instance() as any)[methodName] = function(prevProps: any): void {
    fn();
    originalMethod.call(this, prevProps);
  };
}
