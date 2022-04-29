import { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles';

import { AvatarStylesProps } from '../../../../components/Avatar/Avatar';
import { getSizeStyles, sizeToPxValue } from './avatarSizes';
import { AvatarVariables } from './avatarVariables';

export const avatarStyles: ComponentSlotStylesPrepared<AvatarStylesProps, AvatarVariables> = {
  root: ({ props: { size } }): ICSSInJSStyle => ({
    position: 'relative',
    backgroundColor: 'inherit',
    display: 'inline-block',
    verticalAlign: 'middle',
    ...getSizeStyles(sizeToPxValue[size]),
  }),
};
