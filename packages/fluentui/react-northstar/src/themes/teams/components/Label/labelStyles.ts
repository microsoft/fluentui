import { pxToRem } from '../../../../utils';
import { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles';
import { LabelStylesProps } from '../../../../components/Label/Label';
import { LabelVariables } from './labelVariables';

export const labelStyles: ComponentSlotStylesPrepared<LabelStylesProps, LabelVariables> = {
  root: ({ props: p, variables: v, theme }): ICSSInJSStyle => {
    const { siteVariables } = theme;

    return {
      display: 'inline-flex',
      alignItems: 'center',
      overflow: 'hidden',
      height: v.height,
      lineHeight: v.height,
      color: v.foreground,
      backgroundColor: v.background,
      fontSize: pxToRem(14),
      borderRadius: siteVariables.borderRadiusMedium,
      padding: v.padding,

      ...(p.hasImage &&
        (p.imagePosition === 'start' ? { paddingLeft: v.startPaddingLeft } : { paddingRight: v.endPaddingRight })),
      ...(p.circular && {
        borderRadius: v.circularRadius,
      }),

      ...(p.color === 'black' && {
        color: v.blackForeground,
        backgroundColor: v.blackBackground,
      }),
      ...(p.color === 'white' && {
        color: v.whiteForeground,
        backgroundColor: v.whiteBackground,
      }),
      ...(p.color === 'brand' && {
        color: v.brandForeground,
        backgroundColor: v.brandBackground,
      }),
      ...(p.color === 'grey' && {
        color: v.greyForeground,
        backgroundColor: v.greyBackground,
      }),
      ...(p.color === 'orange' && {
        color: v.orangeForeground,
        backgroundColor: v.orangeBackground,
      }),
      ...(p.color === 'red' && {
        color: v.redForeground,
        backgroundColor: v.redBackground,
      }),
      ...(p.color === 'green' && {
        color: v.greenForeground,
        backgroundColor: v.greenBackground,
      }),
      ...(p.color === 'yellow' && {
        color: v.yellowForeground,
        backgroundColor: v.yellowBackground,
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
      ...(!hasStartElement &&
        p.circular && {
          marginLeft: pxToRem(4),
        }),
      ...(hasEndElement && {
        marginRight: pxToRem(3),
      }),
      ...(!hasEndElement &&
        p.circular && {
          marginRight: pxToRem(4),
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
