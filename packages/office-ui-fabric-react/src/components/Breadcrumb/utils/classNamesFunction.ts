import { mergeStyleSets } from 'office-ui-fabric-react/lib/Styling';
import { memoizeFunction } from 'office-ui-fabric-react/lib/Utilities';
import { IStyleFunction } from './IStyleFunction';
import { IClassNames } from './IClassNames';

export function classNamesFunction<TStyleProps extends {}, TStyles extends {}>(): (
  getStyles: IStyleFunction<TStyleProps, TStyles>,
  styleProps: TStyleProps) => IClassNames<TStyles> {
  return memoizeFunction((
    getStyles: IStyleFunction<TStyleProps, TStyles>,
    styleProps: TStyleProps
  ): IClassNames<TStyles> => mergeStyleSets(getStyles && getStyles(styleProps)));
}
