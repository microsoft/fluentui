import { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles';

import { AvatarStylesProps } from '../../../../components/Avatar/Avatar';
import { getSizeStyles, sizeToPxValue } from './avatarSizes';
import { AvatarVariables } from './avatarVariables';

export const avatarStyles: ComponentSlotStylesPrepared<AvatarStylesProps, AvatarVariables> = {
  root: ({ props: { size }, variables: { initialsFontWeight } }): ICSSInJSStyle => ({
    position: 'relative',
    backgroundColor: 'inherit',
    display: 'inline-block',
    verticalAlign: 'middle',
    fontWeight: initialsFontWeight,
    ...getSizeStyles(sizeToPxValue[size]),
  }),
};
