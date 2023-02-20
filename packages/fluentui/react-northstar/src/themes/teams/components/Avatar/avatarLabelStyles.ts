import { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles';

import { AvatarLabelStylesProps } from '../../../../components/Avatar/AvatarLabel';
import { pxToRem } from '../../../../utils';
import { sizeToPxValue } from './avatarSizes';
import { AvatarVariables } from './avatarVariables';

export const avatarLabelStyles: ComponentSlotStylesPrepared<AvatarLabelStylesProps, AvatarVariables> = {
  root: ({ props: { circular, size, square }, variables: v }): ICSSInJSStyle => {
    const sizeInRem = pxToRem(sizeToPxValue[size]);
    return {
      alignItems: 'center',
      overflow: 'hidden',
      color: v.labelColor,
      backgroundColor: v.labelBackground,
      borderRadius: '50%',
      display: 'inline-block',
      width: sizeInRem,
      height: sizeInRem,
      lineHeight: sizeInRem,
      fontSize: pxToRem(sizeToPxValue[size] / 2.333),
      verticalAlign: 'top',
      textAlign: 'center',
      padding: '0',
      ...(square && {
        borderRadius: v.squareAvatarBorderRadius,
      }),
      ...(circular && {
        borderRadius: v.labelCircularRadius,
      }),
    };
  },
};
