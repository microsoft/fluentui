let _warningCallback: (message: string) => void = warn;

export type ISettingsMap<T> = {
  [P in keyof T]: string;
};

/**
 * Warns when a deprecated props are being used.
 *
 * @export
 * @param {string} componentName The name of the component being used.
 * @param {Object} props The props passed into the component.
 * @param {ISettingsMap} deprecationMap The map of deprecations, where key is the prop name and the value is
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

export function warnMutuallyExclusive<P>(
  componentName: string,
  props: P,
  exclusiveMap: ISettingsMap<P>): void {

  for (const propName in exclusiveMap) {
    if (props && propName in props && exclusiveMap[propName] in props) {
      _warningCallback(
        `${componentName} property '${propName}' is mutually exclusive with '${exclusiveMap[propName]}'. Use one or the other.`
      );
    }
  }
}

export function warn(message: string): void {
  if (console && console.warn) {
    console.warn(message);
  }
}

/**
 * Configures the warning callback. Passing in undefined will reset it to use the default
 * console.warn function.
 *
 * @export
 * @param {(message) => void} warningCallback
 */
export function setWarningCallback(warningCallback: (message: string) => void): void {
  _warningCallback = warningCallback === undefined ? warn : warningCallback;
}
