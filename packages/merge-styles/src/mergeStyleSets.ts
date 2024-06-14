import { concatStyleSets } from './concatStyleSets';
import { extractStyleParts } from './extractStyleParts';
import { IStyle } from './IStyle';
import { IStyleOptions } from './IStyleOptions';
import { IConcatenatedStyleSet, IProcessedStyleSet, IStyleSet } from './IStyleSet';
import { getStyleOptions } from './StyleOptionsState';
import { applyRegistration, styleToRegistration } from './styleToClassName';
import { ObjectOnly } from './ObjectOnly';
import { isShadowConfig, ShadowConfig } from './shadowConfig';
import { Stylesheet } from './Stylesheet';

type Missing = false | null | undefined;
type MissingOrShadowConfig = Missing | ShadowConfig;

/**
 * Takes in one or more style set objects, each consisting of a set of areas,
 * each which will produce a class name. Using this is analogous to calling
 * `mergeStyles` for each property in the object, but ensures we maintain the
 * set ordering when multiple style sets are merged.
 *
 * @param styleSet - The first style set to be merged and reigstered.
 */
export function mergeStyleSets<TStyleSet>(styleSet: TStyleSet | Missing): IProcessedStyleSet<ObjectOnly<TStyleSet>>;

/**
 * Takes in one or more style set objects, each consisting of a set of areas,
 * each which will produce a class name. Using this is analogous to calling
 * `mergeStyles` for each property in the object, but ensures we maintain the
 * set ordering when multiple style sets are merged.
 *
 * @param styleSet1 - The first style set to be merged.
 * @param styleSet2 - The second style set to be merged.
 */
export function mergeStyleSets<TStyleSet1, TStyleSet2>(
  styleSet1: TStyleSet1 | Missing,
  styleSet2: TStyleSet2 | Missing,
): IProcessedStyleSet<ObjectOnly<TStyleSet1> & ObjectOnly<TStyleSet2>>;

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
export function mergeStyleSets<TStyleSet1, TStyleSet2, TStyleSet3>(
  styleSet1: TStyleSet1 | Missing,
  styleSet2: TStyleSet2 | Missing,
  styleSet3: TStyleSet3 | Missing,
): IProcessedStyleSet<ObjectOnly<TStyleSet1> & ObjectOnly<TStyleSet2> & ObjectOnly<TStyleSet3>>;

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
export function mergeStyleSets<TStyleSet1, TStyleSet2, TStyleSet3, TStyleSet4>(
  styleSet1: TStyleSet1 | Missing,
  styleSet2: TStyleSet2 | Missing,
  styleSet3: TStyleSet3 | Missing,
  styleSet4: TStyleSet4 | Missing,
): IProcessedStyleSet<
  ObjectOnly<TStyleSet1> & ObjectOnly<TStyleSet2> & ObjectOnly<TStyleSet3> & ObjectOnly<TStyleSet4>
>;

/**
 * Takes in one or more style set objects, each consisting of a set of areas,
 * each which will produce a class name. Using this is analogous to calling
 * `mergeStyles` for each property in the object, but ensures we maintain the
 * set ordering when multiple style sets are merged.
 *
 * @param styleSets - One or more style sets to be merged.
 */
export function mergeStyleSets(...styleSets: Array<IStyleSet | MissingOrShadowConfig>): IProcessedStyleSet<any>;

export function mergeStyleSets(
  shadowConfig: ShadowConfig,
  ...styleSets: Array<IStyleSet | Missing>
): IProcessedStyleSet<any>;

/**
 * Takes in one or more style set objects, each consisting of a set of areas,
 * each which will produce a class name. Using this is analogous to calling
 * `mergeStyles` for each property in the object, but ensures we maintain the
 * set ordering when multiple style sets are merged.
 *
 * @param styleSets - One or more style sets to be merged.
 */
export function mergeStyleSets(...styleSets: any[]): IProcessedStyleSet<any> {
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
export function mergeCssSets<TStyleSet>(
  styleSets: [TStyleSet | Missing],
  options?: IStyleOptions,
): IProcessedStyleSet<ObjectOnly<TStyleSet>>;

/**
 * Takes in one or more style set objects, each1consisting of a set of areas,
 * each which will produce a class name. Using this is analogous to calling
 * `mergeCss` for each property in the object, but ensures we maintain the
 * set ordering when multiple style sets are merged.
 *
 * @param styleSets - One or more style sets to be merged.
 * @param options - (optional) Options to use when creating rules.
 */
export function mergeCssSets<TStyleSet1, TStyleSet2>(
  styleSets: [TStyleSet1 | MissingOrShadowConfig, TStyleSet2 | Missing],
  options?: IStyleOptions,
): IProcessedStyleSet<ObjectOnly<TStyleSet1> & ObjectOnly<TStyleSet2>>;

/**
 * Takes in one or more style set objects, each1consisting of a set of areas,
 * each which will produce a class name. Using this is analogous to calling
 * `mergeCss` for each property in the object, but ensures we maintain the
 * set ordering when multiple style sets are merged.
 *
 * @param styleSets - One or more style sets to be merged.
 * @param options - (optional) Options to use when creating rules.
 */
export function mergeCssSets<TStyleSet1, TStyleSet2, TStyleSet3>(
  styleSets: [TStyleSet1 | MissingOrShadowConfig, TStyleSet2 | Missing, TStyleSet3 | Missing],
  options?: IStyleOptions,
): IProcessedStyleSet<ObjectOnly<TStyleSet1> & ObjectOnly<TStyleSet2> & ObjectOnly<TStyleSet3>>;

/**
 * Takes in one or more style set objects, each1consisting of a set of areas,
 * each which will produce a class name. Using this is analogous to calling
 * `mergeCss` for each property in the object, but ensures we maintain the
 * set ordering when multiple style sets are merged.
 *
 * @param styleSets - One or more style sets to be merged.
 * @param options - (optional) Options to use when creating rules.
 */
export function mergeCssSets<TStyleSet1, TStyleSet2, TStyleSet3, TStyleSet4>(
  styleSets: [TStyleSet1 | MissingOrShadowConfig, TStyleSet2 | Missing, TStyleSet3 | Missing, TStyleSet4 | Missing],
  options?: IStyleOptions,
): IProcessedStyleSet<
  ObjectOnly<TStyleSet1> & ObjectOnly<TStyleSet2> & ObjectOnly<TStyleSet3> & ObjectOnly<TStyleSet4>
>;

/**
 * Takes in one or more style set objects, each1consisting of a set of areas,
 * each which will produce a class name. Using this is analogous to calling
 * `mergeCss` for each property in the object, but ensures we maintain the
 * set ordering when multiple style sets are merged.
 *
 * @param styleSets - One or more style sets to be merged.
 * @param options - (optional) Options to use when creating rules.
 */
export function mergeCssSets<TStyleSet>(
  styleSet: [TStyleSet | Missing],
  options?: IStyleOptions,
): IProcessedStyleSet<ObjectOnly<TStyleSet>>;

/**
 * Takes in one or more style set objects, each1consisting of a set of areas,
 * each which will produce a class name. Using this is analogous to calling
 * `mergeCss` for each property in the object, but ensures the
 * set ordering when multiple style sets are merged.
 *
 * @param styleSets - One or more style sets to be merged.
 * @param options - (optional) Options to use when creating rules.
 */
export function mergeCssSets(styleSets: any[], options?: IStyleOptions): IProcessedStyleSet<any> {
  const classNameSet: IProcessedStyleSet<any> & Record<string, unknown> = { subComponentStyles: {} };

  let shadowConfig: ShadowConfig | undefined = undefined;
  let styleSet;
  if (isShadowConfig(styleSets[0])) {
    shadowConfig = styleSets[0];
    styleSet = styleSets[1];
  } else {
    styleSet = styleSets[0];
  }

  shadowConfig ??= options?.shadowConfig;

  const opts = { ...options, shadowConfig };

  if (!styleSet && styleSets.length <= 1) {
    return { subComponentStyles: {} } as any;
  }

  const sheet = Stylesheet.getInstance(shadowConfig);
  opts.stylesheet = sheet;
  const concatenatedStyleSet = concatStyleSets(...styleSets);

  const registrations = [];

  for (const styleSetArea in concatenatedStyleSet) {
    if (concatenatedStyleSet.hasOwnProperty(styleSetArea)) {
      if (styleSetArea === 'subComponentStyles') {
        classNameSet.subComponentStyles = concatenatedStyleSet.subComponentStyles || {};
        continue;
      } else if (styleSetArea === '__shadowConfig__') {
        continue;
      }

      const styles: IStyle = (concatenatedStyleSet as any)[styleSetArea];

      const { classes, objects } = extractStyleParts(sheet, styles);

      if (objects?.length) {
        const registration = styleToRegistration(opts || {}, { displayName: styleSetArea }, objects);

        if (registration) {
          registrations.push(registration);
          classNameSet[styleSetArea] = classes.concat([registration.className]).join(' ');
        }
      } else {
        classNameSet[styleSetArea] = classes.join(' ');
      }
    }
  }

  for (const registration of registrations) {
    if (registration) {
      applyRegistration(registration, options?.specificityMultiplier, shadowConfig);
    }
  }

  return classNameSet;
}
