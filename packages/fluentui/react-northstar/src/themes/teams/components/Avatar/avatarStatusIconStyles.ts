import { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles';

import { AvatarStatusIconProps } from '../../../../components/Avatar/AvatarStatusIcon';
import { getSizeStyles, statusIconSizeToPxValue } from './avatarSizes';
import { AvatarVariables } from './avatarVariables';

export const avatarStatusIconStyles: ComponentSlotStylesPrepared<AvatarStatusIconProps, AvatarVariables> = {
  root: ({ props: { size, state }, variables: v }): ICSSInJSStyle => ({
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    ...getSizeStyles(statusIconSizeToPxValue[size]),
    color: v.statusColor,
    ...(state === 'success' && {
      color: v.statusSuccessColor,
    }),
    ...(state === 'info' && {
      color: v.statusInfoColor,
    }),
    ...(state === 'error' && {
      color: v.statusErrorColor,
    }),
    ...(state === 'warning' && {
      color: v.statusWarningColor,
    }),

    '& > :first-child': {
      height: '100%',
      width: '100%',
      '& svg': {
        height: '100%',
        width: '100%',
      },
    },
  }),
};
