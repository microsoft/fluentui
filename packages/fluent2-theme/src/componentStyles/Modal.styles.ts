import type { IModalStyleProps, IModalStyles, IStyleFunctionOrObject } from '@fluentui/react';
import { IExtendedEffects } from '../types';

export function getModalStyles(props: IModalStyleProps): IStyleFunctionOrObject<IModalStyleProps, IModalStyles> {
  const { theme } = props;
  const { effects } = theme;

  const styles: Partial<IModalStyles> = {
    main: {
      borderRadius: (effects as IExtendedEffects).roundedCorner8,
      boxShadow: effects.elevation64,
    },
  };

  return styles;
}
