import { ISettingsMap, warn } from './warn';
/**
 * Warns when two props which are mutually exclusive are both being used.
 *
 * @public
 * @param componentName - The name of the component being used.
 * @param props - The props passed into the component.
 * @param exclusiveMap - A map where the key is a parameter, and the value is the other parameter.
 */
export function warnMutuallyExclusive<P>(componentName: string, props: P, exclusiveMap: ISettingsMap<P>): void {
  if (process.env.NODE_ENV !== 'production') {
    for (const propName in exclusiveMap) {
      if (props && propName in props) {
        let propInExclusiveMapValue = exclusiveMap[propName];
        if (propInExclusiveMapValue && propInExclusiveMapValue in props) {
          warn(`${componentName} property '${propName}' is mutually exclusive with '${exclusiveMap[propName]}'. Use one or the other.`);
        }
      }
    }
  }
}
