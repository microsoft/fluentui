import { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles';

import { AvatarIconStylesProps } from '../../../../components/Avatar/AvatarIcon';
import { getSizeStyles, iconSizeToPxValue, sizeToPxValue } from './avatarSizes';
import { AvatarVariables } from './avatarVariables';

export const avatarIconStyles: ComponentSlotStylesPrepared<AvatarIconStylesProps, AvatarVariables> = {
  root: ({ props: { size, square }, variables: v }): ICSSInJSStyle => ({
    color: v.iconColor,
    background: v.iconBackgroundColor,
    ...getSizeStyles(sizeToPxValue[size]),
    borderRadius: '50%',
    display: 'inline-flex',
    alignItems: 'center',
    ...(square && {
      borderRadius: v.squareAvatarBorderRadius,
    }),
    '& > :first-child': {
      margin: '0 auto',
      ...getSizeStyles(iconSizeToPxValue[size]),
      '& svg': {
        width: '100%',
        height: '100%',
      },
    },
  }),
};
