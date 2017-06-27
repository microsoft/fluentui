let _warningCallback: (message: string) => void = warn;

export type ISettingsMap<T> = {
  [P in keyof T]?: string;
};

/**
 * Warns when a deprecated props are being used.
 *
 * @param componentName - The name of the component being used.
 * @param props - The props passed into the component.
 * @param deprecationMap - The map of deprecations, where key is the prop name and the value is
 * either null or a replacement prop name.
 */
export function warnDeprecations<P>(
  componentName: string,
  props: P,
  deprecationMap: ISettingsMap<P>): void {

  for (const propName in deprecationMap) {
    if (props && propName in props) {
      let deprecationMessage = `${componentName} property '${propName}' was used but has been deprecated.`;
      const replacementPropName = deprecationMap[propName];

      if (replacementPropName) {
        deprecationMessage += ` Use '${replacementPropName}' instead.`;
      }
      _warningCallback(deprecationMessage);
    }
  }
}

/**
 * Warns when two props which are mutually exclusive are both being used.
 *
 * @param componentName - The name of the component being used.
 * @param props - The props passed into the component.
 * @param exclusiveMap - A map where the key is a parameter, and the value is the other parameter.
 */
export function warnMutuallyExclusive<P>(
  componentName: string,
  props: P,
  exclusiveMap: ISettingsMap<P>): void {

  for (const propName in exclusiveMap) {
    if (props && propName in props) {
      let propInExclusiveMapValue = exclusiveMap[propName];
      if (propInExclusiveMapValue && propInExclusiveMapValue in props) {
        _warningCallback(
          `${componentName} property '${propName}' is mutually exclusive with '${exclusiveMap[propName]}'. Use one or the other.`
        );
      }
    }
  }
}

/**
 * Sends a warning to console, if the api is present.
 * @param message - Warning message.
 */
export function warn(message: string): void {
  if (console && console.warn) {
    console.warn(message);
  }
}

/**
 * Configures the warning callback. Passing in undefined will reset it to use the default
 * console.warn function.
 *
 * @param warningCallback - Callback to override the generated warnings.
 */
export function setWarningCallback(warningCallback?: (message: string) => void): void {
  _warningCallback = warningCallback === undefined ? warn : warningCallback;
}
