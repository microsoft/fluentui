import { mergeStyles } from './mergeStyles';

/**
 * Builds a class names object from a given map.
 *
 * @param styles - Map of unprocessed styles.
 * @returns Map of property name to class name.
 */
export function buildClassMap<T>(styles: T): {[key in keyof T]?: string } {
  return Object
    .keys(styles)
    .reduce((classNames: {[key in keyof T]?: string }, className: string) => {
      // tslint:disable-next-line:no-any
      classNames[className] = mergeStyles((styles as any)[className]).toString();
      return classNames;
    }, {});
}
