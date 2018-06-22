import { extractStyleParts } from './extractStyleParts';
import { concatStyleSets } from './concatStyleSets';
import { IStyleOrStyleFunction } from './IStyle';
import { styleToRegistration, applyRegistration } from './styleToClassName';
import { IStyleFunction } from './IStyleFunction';
import { IStyleSet } from './IStyleSet';

export type IClassNameOrStyleFunction<TStyleProps = any, TStyles = any> = string | IStyleFunction<TStyleProps, TStyles>;

/**
 * Takes in one or more style set objects, each consisting of a set of areas,
 * each which will produce a class name. Using this is analogous to calling
 * `mergeStyles` for each property in the object, but ensures we maintain the
 * set ordering when multiple style sets are merged.
 *
 * @param styleSet1 The first style set to be merged.
 */
export function mergeStyleSets<T>(styleSet: IStyleSet<T>): { [P in keyof T]?: IClassNameOrStyleFunction };

/**
 * Takes in one or more style set objects, each consisting of a set of areas,
 * each which will produce a class name. Using this is analogous to calling
 * `mergeStyles` for each property in the object, but ensures we maintain the
 * set ordering when multiple style sets are merged.
 *
 * @param styleSet1 The first style set to be merged.
 * @param styleSet2 The second style set to be merged.
 */
export function mergeStyleSets<T, U>(
  styleSet1: IStyleSet<T>,
  styleSet2: IStyleSet<U>
): { [P in keyof (T & U)]?: IClassNameOrStyleFunction };

/**
 * Takes in one or more style set objects, each consisting of a set of areas,
 * each which will produce a class name. Using this is analogous to calling
 * `mergeStyles` for each property in the object, but ensures we maintain the
 * set ordering when multiple style sets are merged.
 *
 * @param styleSet1 The first style set to be merged.
 * @param styleSet2 The second style set to be merged.
 * @param styleSet3 The third style set to be merged.
 */
export function mergeStyleSets<T, U, V>(
  styleSet1: IStyleSet<T>,
  styleSet2: IStyleSet<U>,
  styleSet3: IStyleSet<V>
): { [P in keyof (T & U & V)]?: IClassNameOrStyleFunction };

/**
 * Takes in one or more style set objects, each consisting of a set of areas,
 * each which will produce a class name. Using this is analogous to calling
 * `mergeStyles` for each property in the object, but ensures we maintain the
 * set ordering when multiple style sets are merged.
 *
 * @param styleSet1 The first style set to be merged.
 * @param styleSet2 The second style set to be merged.
 * @param styleSet3 The third style set to be merged.
 * @param styleSet4 The fourth style set to be merged.
 */
export function mergeStyleSets<T, U, V, W>(
  styleSet1: IStyleSet<T>,
  styleSet2: IStyleSet<U>,
  styleSet3: IStyleSet<V>,
  styleSet4: IStyleSet<W>
): { [P in keyof (T & U & V & W)]?: IClassNameOrStyleFunction };

/**
 * Takes in one or more style set objects, each consisting of a set of areas,
 * each which will produce a class name. Using this is analogous to calling
 * `mergeStyles` for each property in the object, but ensures we maintain the
 * set ordering when multiple style sets are merged.
 *
 * @param styleSets One or more style sets to be merged.
 */
export function mergeStyleSets(
  ...styleSets: (IStyleSet<any> | null | undefined)[]
): { [area: string]: string | IStyleFunction<any, any> } {
  // tslint:disable-next-line:no-any
  const classNameSet: any = {};
  const classMap: { [key: string]: string } = {};

  let styleSet = styleSets[0];

  if (styleSet) {
    if (styleSets.length > 1) {
      styleSet = concatStyleSets(...styleSets);
    }

    const registrations = [];

    for (const styleSetArea in styleSet) {
      if (styleSet.hasOwnProperty(styleSetArea)) {
        const styles: IStyleOrStyleFunction = styleSet[styleSetArea];

        if (typeof styles === 'function') {
          classNameSet[styleSetArea] = styles;
          continue;
        }

        const { classes, objects } = extractStyleParts(styles);
        const registration = styleToRegistration({ displayName: styleSetArea }, objects);

        registrations.push(registration);

        if (registration) {
          classMap[styleSetArea] = registration.className;
          classNameSet[styleSetArea] = classes.concat([registration.className]).join(' ');
        }
      }
    }

    for (const registration of registrations) {
      if (registration) {
        applyRegistration(registration, classMap);
      }
    }
  }

  return classNameSet;
}
