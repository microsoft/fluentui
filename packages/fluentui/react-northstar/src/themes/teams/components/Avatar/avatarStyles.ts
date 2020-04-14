import { pxToRem } from '../../../../utils';
import { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles';
import { AvatarStylesProps } from '../../../../components/Avatar/Avatar';
import { AvatarVariables } from './avatarVariables';

const sizeToPxValue = {
  smallest: 20,
  smaller: 24,
  small: 28,
  medium: 32,
  large: 44,
  larger: 64,
  largest: 96,
};

const avatarStyles: ComponentSlotStylesPrepared<AvatarStylesProps, AvatarVariables> = {
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

export default avatarStyles;
