import { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles';

import { AvatarVariables } from './avatarVariables';
import { pxToRem } from '../../../../utils';
import { getColorScheme } from '../../colors';
import { AvatarLabelStylesProps } from '../../../../components/Avatar/AvatarLabel';

export const avatarLabelStyles: ComponentSlotStylesPrepared<AvatarLabelStylesProps, AvatarVariables> = {
  root: ({ props: p, variables: v }): ICSSInJSStyle => {
    const colors = getColorScheme(v.labelColorScheme, p.color);

    return {
      display: 'inline-flex',
      alignItems: 'center',
      overflow: 'hidden',
      height: v.labelHeight,
      lineHeight: v.labelHeight,
      color: colors.background,
      backgroundColor: colors.foreground,
      fontSize: pxToRem(14),
      borderRadius: pxToRem(3),
      padding: v.labelPadding,
      ...(p.hasImage &&
        (p.imagePosition === 'start'
          ? { paddingLeft: v.labelStartPaddingLeft }
          : { paddingRight: v.labelEndPaddingRight })),
      ...(p.circular && {
        borderRadius: v.labelCircularRadius,
      }),
    };
  },

  content: ({ props: p, variables: v }): ICSSInJSStyle => {
    const hasStartElement = (p.hasImage && p.imagePosition === 'start') || (p.hasIcon && p.iconPosition === 'start');
    const hasEndElement = (p.hasImage && p.imagePosition === 'end') || (p.hasIcon && p.iconPosition === 'end');

    return {
      ...(hasStartElement && {
        marginLeft: pxToRem(3),
      }),
      ...(hasEndElement && {
        marginRight: pxToRem(3),
      }),
    };
  },

  image: ({ variables: v }): ICSSInJSStyle => ({
    height: v.labelHeight,
    width: v.labelHeight,
  }),

  icon: ({ props: p, variables: v }): ICSSInJSStyle => ({
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: v.labelIconSize,
    height: v.labelIconSize,

    '& > :first-child': {
      height: '100%',
      width: '100%',
      '& svg': {
        height: '100%',
        width: '100%',
      },
    },
    ...(p.hasActionableIcon && {
      cursor: 'pointer',
    }),
  }),
};
