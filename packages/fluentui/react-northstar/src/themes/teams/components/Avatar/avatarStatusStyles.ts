import { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles';

import { AvatarStatusStylesProps } from '../../../../components/Avatar/AvatarStatus';
import { getSizeStyles, statusSizeToPxValue } from './avatarSizes';
import { AvatarVariables } from './avatarVariables';

export const avatarStatusStyles: ComponentSlotStylesPrepared<AvatarStatusStylesProps, AvatarVariables> = {
  root: ({ props: { color, size, state }, variables: v }): ICSSInJSStyle => ({
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    ...getSizeStyles(statusSizeToPxValue[size]),
    verticalAlign: 'middle',
    borderRadius: '9999px',
    position: 'absolute',
    bottom: 0,
    right: 0,
    boxShadow: `0 0 0 ${v.statusBorderWidth} ${v.statusBorderColor}`,
    ...(state === 'success' && {
      backgroundColor: v.statusSuccessBackgroundColor,
    }),
    ...(state === 'info' && {
      backgroundColor: v.statusInfoBackgroundColor,
    }),
    ...(state === 'warning' && {
      backgroundColor: v.statusWarningBackgroundColor,
    }),
    ...(state === 'error' && {
      backgroundColor: v.statusErrorBackgroundColor,
    }),
    ...(state === 'unknown' && {
      backgroundColor: v.statusBackgroundColor,
    }),
    ...(!!color && {
      backgroundColor: color,
    }),
  }),
};
