// type VariantClassesHook = <TState>(state: TState) =>
/**
 * Calls a function with the argument, or returns the given object.
 * @param objOrFunc - Function or object.
 * @param argument - Argument to pass if a function is provided.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const callOrReturn = (objOrFunc: any, argument: any) =>
  typeof objOrFunc === 'function' ? objOrFunc(argument) : objOrFunc;
