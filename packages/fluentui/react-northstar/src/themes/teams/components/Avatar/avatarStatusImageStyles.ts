import { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles';

import { AvatarStatusImageProps } from '../../../../components/Avatar/AvatarStatusImage';
import { getSizeStyles, statusSizeToPxValue } from './avatarSizes';
import { AvatarVariables } from './avatarVariables';

export const avatarStatusImageStyles: ComponentSlotStylesPrepared<AvatarStatusImageProps, AvatarVariables> = {
  root: ({ props: { size }, variables: v }): ICSSInJSStyle => ({
    borderRadius: v.imageCircularRadius,
    objectFit: 'cover',
    ...getSizeStyles(statusSizeToPxValue[size]),
  }),
};
