import { IStyleSet, IConcatenatedStyleSet } from './IStyleSet';
import { IStyleBase, IStyle } from './IStyle';
import { IStyleFunctionOrObject } from './IStyleFunction';
import { ObjectOnly } from './ObjectOnly';
import { ShadowConfig, isShadowConfig } from './shadowConfig';

type Missing = false | null | undefined;
type MissingOrShadowConfig = Missing | ShadowConfig;

/**
 * Combine a set of styles together (but does not register css classes).
 * @param styleSet - The first style set to be concatenated.
 */
export function concatStyleSets<TStyleSet>(styleSet: TStyleSet | Missing): IConcatenatedStyleSet<ObjectOnly<TStyleSet>>;

/**
 * Combine a set of styles together (but does not register css classes).
 * @param styleSet1 - The first style set to be concatenated.
 * @param styleSet2 - The second style set to be concatenated.
 */
export function concatStyleSets<TStyleSet1, TStyleSet2>(
  styleSet1: TStyleSet1 | MissingOrShadowConfig,
  styleSet2: TStyleSet2 | Missing,
): IConcatenatedStyleSet<ObjectOnly<TStyleSet1> & ObjectOnly<TStyleSet2>>;

/**
 * Combine a set of styles together (but does not register css classes).
 * @param styleSet1 - The first style set to be concatenated.
 * @param styleSet2 - The second style set to be concatenated.
 * @param styleSet3 - The third style set to be concatenated.
 */
export function concatStyleSets<TStyleSet1, TStyleSet2, TStyleSet3>(
  styleSet1: TStyleSet1 | MissingOrShadowConfig,
  styleSet2: TStyleSet2 | Missing,
  styleSet3: TStyleSet3 | Missing,
): IConcatenatedStyleSet<ObjectOnly<TStyleSet1> & ObjectOnly<TStyleSet2> & ObjectOnly<TStyleSet3>>;

/**
 * Combine a set of styles together (but does not register css classes).
 * @param styleSet1 - The first style set to be concatenated.
 * @param styleSet2 - The second style set to be concatenated.
 * @param styleSet3 - The third style set to be concatenated.
 * @param styleSet4 - The fourth style set to be concatenated.
 */
export function concatStyleSets<TStyleSet1, TStyleSet2, TStyleSet3, TStyleSet4>(
  styleSet1: TStyleSet1 | MissingOrShadowConfig,
  styleSet2: TStyleSet2 | Missing,
  styleSet3: TStyleSet3 | Missing,
  styleSet4: TStyleSet4 | Missing,
): IConcatenatedStyleSet<
  ObjectOnly<TStyleSet1> & ObjectOnly<TStyleSet2> & ObjectOnly<TStyleSet3> & ObjectOnly<TStyleSet4>
>;

/**
 * Combine a set of styles together (but does not register css classes).
 * @param styleSet1 - The first style set to be concatenated.
 * @param styleSet2 - The second style set to be concatenated.
 * @param styleSet3 - The third style set to be concatenated.
 * @param styleSet4 - The fourth style set to be concatenated.
 * @param styleSet5 - The fifth set to be concatenated.
 */
export function concatStyleSets<TStyleSet1, TStyleSet2, TStyleSet3, TStyleSet4, TStyleSet5>(
  styleSet1: TStyleSet1 | MissingOrShadowConfig,
  styleSet2: TStyleSet2 | Missing,
  styleSet3: TStyleSet3 | Missing,
  styleSet4: TStyleSet4 | Missing,
  styleSet5: TStyleSet5 | Missing,
): IConcatenatedStyleSet<
  ObjectOnly<TStyleSet1> &
    ObjectOnly<TStyleSet2> &
    ObjectOnly<TStyleSet3> &
    ObjectOnly<TStyleSet4> &
    ObjectOnly<TStyleSet5>
>;

/**
 * Combine a set of styles together (but does not register css classes).
 * @param styleSet1 - The first style set to be concatenated.
 * @param styleSet2 - The second style set to be concatenated.
 * @param styleSet3 - The third style set to be concatenated.
 * @param styleSet4 - The fourth style set to be concatenated.
 * @param styleSet5 - The fifth set to be concatenated.
 * @param styleSet6 - The sixth set to be concatenated.
 */
export function concatStyleSets<TStyleSet1, TStyleSet2, TStyleSet3, TStyleSet4, TStyleSet5, TStyleSet6>(
  styleSet1: TStyleSet1 | MissingOrShadowConfig,
  styleSet2: TStyleSet2 | Missing,
  styleSet3: TStyleSet3 | Missing,
  styleSet4: TStyleSet4 | Missing,
  styleSet5: TStyleSet5 | Missing,
  styleSet6: TStyleSet6 | Missing,
): IConcatenatedStyleSet<
  ObjectOnly<TStyleSet1> &
    ObjectOnly<TStyleSet2> &
    ObjectOnly<TStyleSet3> &
    ObjectOnly<TStyleSet4> &
    ObjectOnly<TStyleSet5> &
    ObjectOnly<TStyleSet6>
>;

/**
 * Combine a set of styles together (but does not register css classes).
 * @param styleSets - One or more stylesets to be merged (each param can also be falsy).
 */
export function concatStyleSets(...styleSets: (IStyleSet | MissingOrShadowConfig)[]): IConcatenatedStyleSet<any>;

/**
 * Combine a set of styles together (but does not register css classes).
 * @param styleSets - One or more stylesets to be merged (each param can also be falsy).
 */
export function concatStyleSets(...styleSets: any[]): IConcatenatedStyleSet<any> {
  if (
    styleSets &&
    styleSets.length === 1 &&
    styleSets[0] &&
    !(styleSets[0] as IStyleSet).subComponentStyles &&
    !isShadowConfig(styleSets[0])
  ) {
    return styleSets[0] as IConcatenatedStyleSet<any>;
  }

  const mergedSet: IConcatenatedStyleSet<any> = {};

  // We process sub component styles in two phases. First we collect them, then we combine them into 1 style function.
  const workingSubcomponentStyles: { [key: string]: Array<IStyleFunctionOrObject<any, any>> } = {};

  for (const currentSet of styleSets) {
    if (currentSet && !isShadowConfig(currentSet)) {
      for (const prop in currentSet) {
        if (currentSet.hasOwnProperty(prop)) {
          if (prop === 'subComponentStyles' && currentSet.subComponentStyles !== undefined) {
            // subcomponent styles - style functions or objects

            const currentComponentStyles = currentSet.subComponentStyles;
            for (const subCompProp in currentComponentStyles) {
              if (currentComponentStyles.hasOwnProperty(subCompProp)) {
                if (workingSubcomponentStyles.hasOwnProperty(subCompProp)) {
                  workingSubcomponentStyles[subCompProp].push(currentComponentStyles[subCompProp]);
                } else {
                  workingSubcomponentStyles[subCompProp] = [currentComponentStyles[subCompProp]];
                }
              }
            }

            continue;
          }

          // the as any casts below is a workaround for ts 2.8.
          // todo: remove cast to any in ts 2.9.
          const mergedValue: IStyle = (mergedSet as any)[prop];
          const currentValue = (currentSet as any)[prop];

          if (mergedValue === undefined) {
            (mergedSet as any)[prop] = currentValue;
          } else {
            (mergedSet as any)[prop] = [
              // https://github.com/Microsoft/TypeScript/issues/25474
              ...(Array.isArray(mergedValue) ? mergedValue : [mergedValue as IStyleBase]),
              ...(Array.isArray(currentValue) ? currentValue : [currentValue as IStyleBase]),
            ];
          }
        }
      }
    }
  }

  if (Object.keys(workingSubcomponentStyles).length > 0) {
    mergedSet.subComponentStyles = {};
    const mergedSubStyles = mergedSet.subComponentStyles;

    // now we process the subcomponent styles if there are any
    for (const subCompProp in workingSubcomponentStyles) {
      if (workingSubcomponentStyles.hasOwnProperty(subCompProp)) {
        const workingSet = workingSubcomponentStyles[subCompProp];
        mergedSubStyles[subCompProp] = (styleProps: any) => {
          return concatStyleSets(
            ...workingSet.map((styleFunctionOrObject: IStyleFunctionOrObject<any, any>) =>
              typeof styleFunctionOrObject === 'function' ? styleFunctionOrObject(styleProps) : styleFunctionOrObject,
            ),
          );
        };
      }
    }
  }

  return mergedSet;
}
