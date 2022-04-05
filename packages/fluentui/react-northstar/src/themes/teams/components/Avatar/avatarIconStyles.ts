import { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles';
import { AvatarIconStylesProps } from '../../../../components/Avatar/AvatarIcon';
import { AvatarVariables } from './avatarVariables';
import { pxToRem, SizeValue } from '../../../../utils';

const sizeToPxValue: Record<SizeValue, number> = {
  smallest: 20,
  smaller: 24,
  small: 28,
  medium: 32,
  large: 44,
  larger: 64,
  largest: 96,
};

const iconSizeToPxValue: Record<SizeValue, number> = {
  smallest: 10,
  smaller: 12,
  small: 16,
  medium: 16,
  large: 20,
  larger: 32,
  largest: 40,
};

export const avatarIconStyles: ComponentSlotStylesPrepared<AvatarIconStylesProps, AvatarVariables> = {
  root: ({ variables: v, props: p }): ICSSInJSStyle => {
    const sizeInRem = pxToRem(sizeToPxValue[p.size]);
    const iconsizeInRem = pxToRem(iconSizeToPxValue[p.size]);

    return {
      color: v.iconColor,
      background: v.iconBackgroundColor,
      width: sizeInRem,
      height: sizeInRem,
      borderRadius: '50%',
      display: 'inline-flex',
      alignItems: 'center',
      ...(p.square && {
        borderRadius: v.squareAvatarBorderRadius,
      }),
      '& > :first-child': {
        margin: '0 auto',
        width: iconsizeInRem,
        height: iconsizeInRem,
        '& svg': {
          width: '100%',
          height: '100%',
        },
      },
    };
  },
};
