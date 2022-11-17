import type { IModalStyleProps, IModalStyles, IStyleFunctionOrObject } from '@fluentui/react';
import type { IExtendedEffects } from '@m365-admin/customizations';

export function getModalStyles(props: IModalStyleProps): IStyleFunctionOrObject<IModalStyleProps, IModalStyles> {
  const { theme } = props;
  const { effects } = theme;

  const styles: Partial<IModalStyles> = {
    main: {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      borderRadius: (effects as IExtendedEffects).roundedCorner8,
      boxShadow: effects.elevation64,
    },
  };

  return styles;
}
