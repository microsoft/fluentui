import { extractStyleParts } from './extractStyleParts';
import { concatStyleSets } from './concatStyleSets';
import { IStyle } from './IStyle';
import { styleToRegistration, applyRegistration } from './styleToClassName';
import { IStyleSet, IProcessedStyleSet } from './IStyleSet';

/**
 * Takes in one or more style set objects, each consisting of a set of areas,
 * each which will produce a class name. Using this is analogous to calling
 * `mergeStyles` for each property in the object, but ensures we maintain the
 * set ordering when multiple style sets are merged.
 *
 * @param styleSet The first style set to be merged and reigstered.
 */
export function mergeStyleSets<TStyleSet extends IStyleSet<TStyleSet>>(
  styleSet: TStyleSet
): IProcessedStyleSet<TStyleSet>;

/**
 * Takes in one or more style set objects, each consisting of a set of areas,
 * each which will produce a class name. Using this is analogous to calling
 * `mergeStyles` for each property in the object, but ensures we maintain the
 * set ordering when multiple style sets are merged.
 *
 * @param styleSet1 The first style set to be merged.
 * @param styleSet2 The second style set to be merged.
 */
export function mergeStyleSets<TStyleSet1 extends IStyleSet<TStyleSet1>, TStyleSet2 extends IStyleSet<TStyleSet2>>(
  styleSet1: TStyleSet1,
  styleSet2: TStyleSet2
): IProcessedStyleSet<TStyleSet1 & TStyleSet2>;

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
export function mergeStyleSets<
  TStyleSet1 extends IStyleSet<TStyleSet1>,
  TStyleSet2 extends IStyleSet<TStyleSet2>,
  TStyleSet3 extends IStyleSet<TStyleSet3>
>(
  styleSet1: TStyleSet1,
  styleSet2: TStyleSet2,
  styleSet3: TStyleSet3
): IProcessedStyleSet<TStyleSet1 & TStyleSet2 & TStyleSet3>;

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
export function mergeStyleSets<
  TStyleSet1 extends IStyleSet<TStyleSet1>,
  TStyleSet2 extends IStyleSet<TStyleSet2>,
  TStyleSet3 extends IStyleSet<TStyleSet3>,
  TStyleSet4 extends IStyleSet<TStyleSet4>
>(
  styleSet1: TStyleSet1,
  styleSet2: TStyleSet2,
  styleSet3: TStyleSet3,
  styleSet4: TStyleSet4
): IProcessedStyleSet<TStyleSet1 & TStyleSet2 & TStyleSet3 & TStyleSet4>;

/**
 * Takes in one or more style set objects, each consisting of a set of areas,
 * each which will produce a class name. Using this is analogous to calling
 * `mergeStyles` for each property in the object, but ensures we maintain the
 * set ordering when multiple style sets are merged.
 *
 * @param styleSets One or more style sets to be merged.
 */
export function mergeStyleSets(...styleSets: IStyleSet<any>[]): IProcessedStyleSet<any>;

/**
 * Takes in one or more style set objects, each consisting of a set of areas,
 * each which will produce a class name. Using this is analogous to calling
 * `mergeStyles` for each property in the object, but ensures we maintain the
 * set ordering when multiple style sets are merged.
 *
 * @param styleSets One or more style sets to be merged.
 */
export function mergeStyleSets(...styleSets: IStyleSet<any>[]): IProcessedStyleSet<any> {
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
        if (styleSetArea === 'subComponentStyles') {
          classNameSet.subComponentStyles = styleSet.subComponentStyles;
          continue;
        }

        const styles: IStyle = styleSet[styleSetArea];

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
