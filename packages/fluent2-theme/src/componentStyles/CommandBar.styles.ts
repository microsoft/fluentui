import type { ICommandBarStyleProps, ICommandBarStyles, IStyleFunctionOrObject } from '@fluentui/react';
import { IExtendedEffects } from '../types';

export function getCommandBarStyles(
  props: ICommandBarStyleProps,
): IStyleFunctionOrObject<ICommandBarStyleProps, ICommandBarStyles> {
  const { theme } = props;
  const { effects } = theme;

  const styles: Partial<ICommandBarStyles> = {
    root: {
      height: '48px',
      borderRadius: (effects as IExtendedEffects).roundedCorner8,
      alignItems: 'center',
    },
    primarySet: {
      height: '40px',
    },
    secondarySet: {
      height: '40px',
    },
  };

  return styles;
}
