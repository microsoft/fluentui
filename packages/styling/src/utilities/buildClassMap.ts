import { mergeStyles } from './mergeStyles';

/**
 * Builds a class names object from a given map.
 *
 * @param styles - Map of unprocessed styles.
 * @returns Map of property name to class name.
 */
export function buildClassMap<T>(styles: T): {[key in keyof T]?: string } {
  let classes: {[key in keyof T]?: string } = {};

  for (let styleName in styles) {
    if (styles.hasOwnProperty(styleName)) {
      let className: string;

      Object.defineProperty(classes, styleName, {
        get: (): string => {
          if (className === undefined) {
            // tslint:disable-next-line:no-any
            className = mergeStyles(styles[styleName] as any).toString();
          }
          return className;
        },
        enumerable: true,
        configurable: true
      });
    }
  }

  return classes;
}
