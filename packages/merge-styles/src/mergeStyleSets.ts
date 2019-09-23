import { concatStyleSets } from './concatStyleSets';
import { extractStyleParts } from './extractStyleParts';
import { IStyle } from './IStyle';
import { IStyleOptions } from './IStyleOptions';
import { IConcatenatedStyleSet, IProcessedStyleSet, IStyleSet } from './IStyleSet';
import { getStyleOptions } from './StyleOptionsState';
import { applyRegistration, styleToRegistration } from './styleToClassName';

/**
 * Takes in one or more style set objects, each consisting of a set of areas,
 * each which will produce a class name. Using this is analogous to calling
 * `mergeStyles` for each property in the object, but ensures we maintain the
 * set ordering when multiple style sets are merged.
 *
 * @param styleSet - The first style set to be merged and reigstered.
 */
export function mergeStyleSets<TStyleSet extends IStyleSet<TStyleSet>>(
  styleSet: TStyleSet | false | null | undefined
): IProcessedStyleSet<TStyleSet>;

/**
 * Takes in one or more style set objects, each consisting of a set of areas,
 * each which will produce a class name. Using this is analogous to calling
 * `mergeStyles` for each property in the object, but ensures we maintain the
 * set ordering when multiple style sets are merged.
 *
 * @param styleSet1 - The first style set to be merged.
 * @param styleSet2 - The second style set to be merged.
 */
export function mergeStyleSets<TStyleSet1 extends IStyleSet<TStyleSet1>, TStyleSet2 extends IStyleSet<TStyleSet2>>(
  styleSet1: TStyleSet1 | false | null | undefined,
  styleSet2: TStyleSet2 | false | null | undefined
): IProcessedStyleSet<TStyleSet1 & TStyleSet2>;

/**
 * Takes in one or more style set objects, each consisting of a set of areas,
 * each which will produce a class name. Using this is analogous to calling
 * `mergeStyles` for each property in the object, but ensures we maintain the
 * set ordering when multiple style sets are merged.
 *
 * @param styleSet1 - The first style set to be merged.
 * @param styleSet2 - The second style set to be merged.
 * @param styleSet3 - The third style set to be merged.
 */
export function mergeStyleSets<
  TStyleSet1 extends IStyleSet<TStyleSet1>,
  TStyleSet2 extends IStyleSet<TStyleSet2>,
  TStyleSet3 extends IStyleSet<TStyleSet3>
>(
  styleSet1: TStyleSet1 | false | null | undefined,
  styleSet2: TStyleSet2 | false | null | undefined,
  styleSet3: TStyleSet3 | false | null | undefined
): IProcessedStyleSet<TStyleSet1 & TStyleSet2 & TStyleSet3>;

/**
 * Takes in one or more style set objects, each consisting of a set of areas,
 * each which will produce a class name. Using this is analogous to calling
 * `mergeStyles` for each property in the object, but ensures we maintain the
 * set ordering when multiple style sets are merged.
 *
 * @param styleSet1 - The first style set to be merged.
 * @param styleSet2 - The second style set to be merged.
 * @param styleSet3 - The third style set to be merged.
 * @param styleSet4 - The fourth style set to be merged.
 */
export function mergeStyleSets<
  TStyleSet1 extends IStyleSet<TStyleSet1>,
  TStyleSet2 extends IStyleSet<TStyleSet2>,
  TStyleSet3 extends IStyleSet<TStyleSet3>,
  TStyleSet4 extends IStyleSet<TStyleSet4>
>(
  styleSet1: TStyleSet1 | false | null | undefined,
  styleSet2: TStyleSet2 | false | null | undefined,
  styleSet3: TStyleSet3 | false | null | undefined,
  styleSet4: TStyleSet4 | false | null | undefined
): IProcessedStyleSet<TStyleSet1 & TStyleSet2 & TStyleSet3 & TStyleSet4>;

/**
 * Takes in one or more style set objects, each consisting of a set of areas,
 * each which will produce a class name. Using this is analogous to calling
 * `mergeStyles` for each property in the object, but ensures we maintain the
 * set ordering when multiple style sets are merged.
 *
 * @param styleSets - One or more style sets to be merged.
 */
export function mergeStyleSets(...styleSets: Array<IStyleSet<any> | undefined | false | null>): IProcessedStyleSet<any>;

/**
 * Takes in one or more style set objects, each consisting of a set of areas,
 * each which will produce a class name. Using this is analogous to calling
 * `mergeStyles` for each property in the object, but ensures we maintain the
 * set ordering when multiple style sets are merged.
 *
 * @param styleSets - One or more style sets to be merged.
 */
export function mergeStyleSets(...styleSets: Array<IStyleSet<any> | undefined | false | null>): IProcessedStyleSet<any> {
  return mergeCssSets(styleSets as any, getStyleOptions());
}

/**
 * Takes in one or more style set objects, each1consisting of a set of areas,
 * each which will produce a class name. Using this is analogous to calling
 * `mergeCss` for each property in the object, but ensures we maintain the
 * set ordering when multiple style sets are merged.
 *
 * @param styleSets - One or more style sets to be merged.
 * @param options - (optional) Options to use when creating rules.
 */
export function mergeCssSets<TStyleSet extends IStyleSet<TStyleSet>>(
  styleSets: [TStyleSet | false | null | undefined],
  options?: IStyleOptions
): IProcessedStyleSet<TStyleSet>;

/**
 * Takes in one or more style set objects, each1consisting of a set of areas,
 * each which will produce a class name. Using this is analogous to calling
 * `mergeCss` for each property in the object, but ensures we maintain the
 * set ordering when multiple style sets are merged.
 *
 * @param styleSets - One or more style sets to be merged.
 * @param options - (optional) Options to use when creating rules.
 */
export function mergeCssSets<TStyleSet1 extends IStyleSet<TStyleSet1>, TStyleSet2 extends IStyleSet<TStyleSet2>>(
  styleSets: [TStyleSet1 | false | null | undefined, TStyleSet2 | false | null | undefined],
  options?: IStyleOptions
): IProcessedStyleSet<TStyleSet1 & TStyleSet2>;

/**
 * Takes in one or more style set objects, each1consisting of a set of areas,
 * each which will produce a class name. Using this is analogous to calling
 * `mergeCss` for each property in the object, but ensures we maintain the
 * set ordering when multiple style sets are merged.
 *
 * @param styleSets - One or more style sets to be merged.
 * @param options - (optional) Options to use when creating rules.
 */
export function mergeCssSets<
  TStyleSet1 extends IStyleSet<TStyleSet1>,
  TStyleSet2 extends IStyleSet<TStyleSet2>,
  TStyleSet3 extends IStyleSet<TStyleSet3>
>(
  styleSets: [TStyleSet1 | false | null | undefined, TStyleSet2 | false | null | undefined, TStyleSet3 | false | null | undefined],
  options?: IStyleOptions
): IProcessedStyleSet<TStyleSet1 & TStyleSet2 & TStyleSet3>;

/**
 * Takes in one or more style set objects, each1consisting of a set of areas,
 * each which will produce a class name. Using this is analogous to calling
 * `mergeCss` for each property in the object, but ensures we maintain the
 * set ordering when multiple style sets are merged.
 *
 * @param styleSets - One or more style sets to be merged.
 * @param options - (optional) Options to use when creating rules.
 */
export function mergeCssSets<
  TStyleSet1 extends IStyleSet<TStyleSet1>,
  TStyleSet2 extends IStyleSet<TStyleSet2>,
  TStyleSet3 extends IStyleSet<TStyleSet3>,
  TStyleSet4 extends IStyleSet<TStyleSet4>
>(
  styleSets: [
    TStyleSet1 | false | null | undefined,
    TStyleSet2 | false | null | undefined,
    TStyleSet3 | false | null | undefined,
    TStyleSet4 | false | null | undefined
  ],
  options?: IStyleOptions
): IProcessedStyleSet<TStyleSet1 & TStyleSet2 & TStyleSet3 & TStyleSet4>;

/**
 * Takes in one or more style set objects, each1consisting of a set of areas,
 * each which will produce a class name. Using this is analogous to calling
 * `mergeCss` for each property in the object, but ensures we maintain the
 * set ordering when multiple style sets are merged.
 *
 * @param styleSets - One or more style sets to be merged.
 * @param options - (optional) Options to use when creating rules.
 */
export function mergeCssSets<TStyleSet extends IStyleSet<TStyleSet>>(
  styleSet: [TStyleSet | false | null | undefined],
  options?: IStyleOptions
): IProcessedStyleSet<TStyleSet>;

/**
 * Takes in one or more style set objects, each1consisting of a set of areas,
 * each which will produce a class name. Using this is analogous to calling
 * `mergeCss` for each property in the object, but ensures the
 * set ordering when multiple style sets are merged.
 *
 * @param styleSets - One or more style sets to be merged.
 * @param options - (optional) Options to use when creating rules.
 */
export function mergeCssSets(
  styleSets: Array<IStyleSet<any> | undefined | false | null>,
  options?: IStyleOptions
): IProcessedStyleSet<any> {
  // tslint:disable-next-line:no-any
  const classNameSet: IProcessedStyleSet<any> = { subComponentStyles: {} };

  const styleSet = styleSets[0];

  if (!styleSet && styleSets.length <= 1) {
    return { subComponentStyles: {} } as any;
  }

  const concatenatedStyleSet = concatStyleSets(...styleSets);

  const registrations = [];

  for (const styleSetArea in concatenatedStyleSet) {
    if (concatenatedStyleSet.hasOwnProperty(styleSetArea)) {
      if (styleSetArea === 'subComponentStyles') {
        classNameSet.subComponentStyles = (concatenatedStyleSet as IConcatenatedStyleSet<any>).subComponentStyles || {};
        continue;
      }

      const styles: IStyle = (concatenatedStyleSet as any)[styleSetArea];

      const { classes, objects } = extractStyleParts(styles);
      const registration = styleToRegistration(options || {}, { displayName: styleSetArea }, objects);

      registrations.push(registration);

      if (registration) {
        classNameSet[styleSetArea] = classes.concat([registration.className]).join(' ');
      }
    }
  }

  for (const registration of registrations) {
    if (registration) {
      applyRegistration(registration);
    }
  }

  return classNameSet as any;
}
