import { mergeStyleSets } from '../MergeStyles';
import {
  IClassNames,
  IStyleFunction
} from '../interfaces/index';

/**
 * Creates a getClassNames function which calls getStyles given the props, and injects them
 * into mergeStyleSets.
 */
export function classNamesFunction<TStyleProps extends {}, TStyles extends {}>(): (
  getStyles: IStyleFunction<TStyleProps, TStyles>,
  styleProps: TStyleProps
) => IClassNames<TStyles> {

  // TODO: memoize.
  return (
    getStyles: IStyleFunction<TStyleProps, TStyles>,
    styleProps: TStyleProps
  ): IClassNames<TStyles> => mergeStyleSets(getStyles && getStyles(styleProps)
  );
}
