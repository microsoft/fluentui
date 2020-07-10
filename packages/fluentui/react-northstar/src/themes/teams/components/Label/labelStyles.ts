import { pxToRem } from '../../../../utils';
import { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles';
import { LabelStylesProps } from '../../../../components/Label/Label';
import { LabelVariables } from './labelVariables';
import { getColorScheme } from '../../colors';

export const labelStyles: ComponentSlotStylesPrepared<LabelStylesProps, LabelVariables> = {
  root: ({ props: p, variables: v }): ICSSInJSStyle => {
    const colors = getColorScheme(v.colorScheme, p.color);

    return {
      display: 'inline-flex',
      alignItems: 'center',
      overflow: 'hidden',
      height: v.height,
      lineHeight: v.height,
      color: colors.background,
      backgroundColor: colors.foreground,
      fontSize: pxToRem(14),
      borderRadius: pxToRem(3),
      padding: v.padding,
      ...(p.hasImage &&
        (p.imagePosition === 'start' ? { paddingLeft: v.startPaddingLeft } : { paddingRight: v.endPaddingRight })),
      ...(p.circular && {
        borderRadius: v.circularRadius,
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
    height: v.height,
    width: v.height,
  }),

  icon: ({ props: p, variables: v }): ICSSInJSStyle => ({
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: v.iconSize,
    height: v.iconSize,

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
