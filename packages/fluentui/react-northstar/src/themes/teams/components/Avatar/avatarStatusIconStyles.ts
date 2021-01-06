import { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles';

import { AvatarStatusStylesProps } from '../../../../components/Avatar/AvatarStatus';
import { AvatarVariables } from './avatarVariables';

export const avatarStatusStyles: ComponentSlotStylesPrepared<AvatarStatusStylesProps, AvatarVariables> = {
  root: ({ props: { state }, variables: v }): ICSSInJSStyle => ({
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: v.statusIconSize,
    height: v.statusIconSize,
    color: v.statusColor,
    ...(state === 'success' && {
      color: v.statusSuccessTextColor,
    }),
    ...(state === 'info' && {
      color: v.statusInfoTextColor,
    }),
    ...(state === 'error' && {
      color: v.statusErrorTextColor,
    }),
    ...(state === 'warning' && {
      color: v.statusWarningTextColor,
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
