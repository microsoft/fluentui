let _warningCallback = _warn;

export interface IStringMap {
  [key: string]: string;
}

/**
 * Warns when a deprecated props are being used.
 *
 * @export
 * @param {string} componentName The name of the component being used.
 * @param {Object} props The props passed into the component.
 * @param {IStringMap} deprecationMap The map of deprecations, where key is the prop name and the value is
 * either null or a replacement prop name.
 */
export function warnDeprecations(
  componentName: string,
  props: Object,
  deprecationMap: IStringMap): void {

  for (const propName in deprecationMap) {
    if (propName in props) {
      let deprecationMessage = `${componentName} property '${propName}' was used but has been deprecated.`;
      const replacementPropName = deprecationMap[propName];

      if (replacementPropName) {
        deprecationMessage += ` Use '${replacementPropName}' instead.`;
      }
      _warningCallback(deprecationMessage);
    }
  }
}

export function warnMutuallyExclusive(
  componentName: string,
  props: Object,
  exclusiveMap: IStringMap): void {

  for (const propName in exclusiveMap) {
    if (propName in props && exclusiveMap[propName] in props) {
      _warningCallback(
        `${componentName} property '${propName}' is mutually exclusive with '${exclusiveMap[propName]}'. Use one or the other.`
      );
    }
  }
}

/**
 * Configures the warning callback. Passing in undefined will reset it to use the default
 * console.warn function.
 *
 * @export
 * @param {(message) => void} warningCallback
 */
export function setWarningCallback(warningCallback: (message) => void): void {
  _warningCallback = warningCallback === undefined ? _warn : warningCallback;
}

function _warn(message: string): void {
  if (console && console.warn) {
    console.warn(message);
  }
}
