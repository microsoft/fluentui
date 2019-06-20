import { warn } from './warn';
/**
 * Warns when props are required if a condition is met.
 *
 * @public
 * @param componentName - The name of the component being used.
 * @param props - The props passed into the component.
 * @param requiredProps - The name of the props that are required when the condition is met.
 * @param conditionalPropName - The name of the prop that the condition is based on.
 * @param condition - Whether the condition is met.
 */
export function warnConditionallyRequiredProps<P>(
  componentName: string,
  props: P,
  requiredProps: string[],
  conditionalPropName: string,
  condition: boolean
): void {
  if (condition === true && process.env.NODE_ENV !== 'production') {
    for (const requiredPropName of requiredProps) {
      if (!(requiredPropName in props)) {
        warn(`${componentName} property '${requiredPropName}' is required when '${conditionalPropName}' is used.'`);
      }
    }
  }
}
