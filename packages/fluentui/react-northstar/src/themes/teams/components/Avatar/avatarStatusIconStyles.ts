import { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles';

import { AvatarStatusStylesProps } from '../../../../components/Avatar/AvatarStatus';
import { AvatarVariables } from './avatarVariables';

const getTextColor = (state: string, variables: AvatarVariables) => {
  switch (state) {
    case 'success':
      return variables.statusSuccessTextColor;
    case 'info':
      return variables.statusInfoTextColor;
    case 'warning':
      return variables.statusWarningTextColor;
    case 'error':
      return variables.statusErrorTextColor;
    case 'unknown':
    default:
      return variables.statusColor;
  }
};

export const avatarStatusStyles: ComponentSlotStylesPrepared<AvatarStatusStylesProps, AvatarVariables> = {
  root: ({ props: { state }, variables: v }): ICSSInJSStyle => ({
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: v.statusIconSize,
    height: v.statusIconSize,
    color: getTextColor(state, v),
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
