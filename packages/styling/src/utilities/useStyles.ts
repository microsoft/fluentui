import * as React from 'react';
import { mergeStyleSets, IStyleSet, IProcessedStyleSet } from '@uifabric/merge-styles';
import { ITheme } from '../interfaces/';
import { useCustomizationSettings } from '@uifabric/utilities';
import { getTheme } from '../styles/theme';

export function useStyles<TStyleSet extends IStyleSet<TStyleSet>>(
  styleFunction: (theme: ITheme) => TStyleSet,
): IProcessedStyleSet<TStyleSet> {
  const theme = useCustomizationSettings(['theme']).theme || getTheme();

  return mergeStyleSets(styleFunction?.(theme)) as IProcessedStyleSet<TStyleSet>;
}
