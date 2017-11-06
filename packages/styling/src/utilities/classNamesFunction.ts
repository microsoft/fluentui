import { mergeStyleSets } from '../MergeStyles';
import {
  IClassNames,
  IStyleFunction
} from '../interfaces/index';
import { memoize } from './memoize';

export function classNamesFunction<TStyleProps extends {}, TStyles extends {}>(): (
  getStyles: IStyleFunction<TStyleProps, TStyles>,
  styleProps: TStyleProps
) => IClassNames<TStyles> {

  // TODO: memoize.
  return memoize(
    (
      getStyles: IStyleFunction<TStyleProps, TStyles>,
      styleProps: TStyleProps
    ): IClassNames<TStyles> => mergeStyleSets(getStyles && getStyles(styleProps))
  );
}
