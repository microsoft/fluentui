import { pxToRem, SizeValue } from '../../../../utils';
import { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles';
import { AvatarStylesProps } from '../../../../components/Avatar/Avatar';
import { AvatarVariables } from './avatarVariables';

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

export const avatarStyles: ComponentSlotStylesPrepared<AvatarStylesProps, AvatarVariables> = {
  root: ({ props: { size } }): ICSSInJSStyle => {
    const sizeInRem = pxToRem(sizeToPxValue[size]);

    return {
      position: 'relative',
      backgroundColor: 'inherit',
      display: 'inline-block',
      verticalAlign: 'middle',
      height: sizeInRem,
      width: sizeInRem,
    };
  },
  icon: ({ props: p, variables: v }) => {
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
  image: ({ props: p, variables: v }): ICSSInJSStyle => ({
    borderColor: v.avatarBorderColor,
    borderStyle: 'solid',
    borderWidth: v.avatarBorderWidth,

    height: '100%',
    objectFit: 'cover',
    verticalAlign: 'top',
    width: '100%',

    ...(p.square && {
      borderRadius: v.squareAvatarBorderRadius,
    }),
  }),
  label: ({ props: p, variables: v }): ICSSInJSStyle => {
    const sizeInRem = pxToRem(sizeToPxValue[p.size]);
    return {
      display: 'inline-block',
      width: sizeInRem,
      height: sizeInRem,
      lineHeight: sizeInRem,
      fontSize: pxToRem(sizeToPxValue[p.size] / 2.333),
      verticalAlign: 'top',
      textAlign: 'center',
      padding: '0',
      ...(p.square && {
        borderRadius: v.squareAvatarBorderRadius,
      }),
    };
  },
  status: ({ variables: v }): ICSSInJSStyle => ({
    position: 'absolute',
    bottom: 0,
    right: 0,
    boxShadow: `0 0 0 ${v.statusBorderWidth} ${v.statusBorderColor}`,
  }),
};
