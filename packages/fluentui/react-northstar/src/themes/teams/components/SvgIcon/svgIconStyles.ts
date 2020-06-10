import { callable, ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles';
import { SvgIconXSpacing, SvgIconProps } from '@fluentui/react-icons-northstar';

import { pxToRem, SizeValue } from '../../../../utils';
import { SvgIconVariables } from './svgIconVariables';

export type SvgIconStylesProps = Pick<
  SvgIconProps,
  'bordered' | 'circular' | 'disabled' | 'outline' | 'rotate' | 'size' | 'xSpacing'
>;

const getPaddedStyle = (): ICSSInJSStyle => ({
  padding: pxToRem(4),
});

const getBorderedStyles = (boxShadowColor: string): ICSSInJSStyle => {
  return {
    ...getPaddedStyle(),

    boxShadow: `0 0 0 .05rem ${boxShadowColor} inset`,
  };
};

const getIconSize = (size: SizeValue, v: SvgIconVariables): string => {
  const modifiedSizes = {
    large: {
      x: 24,
      xx: 28,
    },
  };

  return v.sizeModifier && modifiedSizes[size] && modifiedSizes[size][v.sizeModifier]
    ? pxToRem(modifiedSizes[size][v.sizeModifier])
    : v[`${size}Size`];
};

const getXSpacingStyles = (xSpacing: SvgIconXSpacing, horizontalSpace: string): ICSSInJSStyle => {
  switch (xSpacing) {
    case 'none':
      return { marginLeft: 0, marginRight: 0 };
    case 'before':
      return { marginLeft: horizontalSpace, marginRight: 0 };
    case 'after':
      return { marginLeft: 0, marginRight: horizontalSpace };
    case 'both':
      return { marginLeft: horizontalSpace, marginRight: horizontalSpace };
  }
};

const svgIconStyles: ComponentSlotStylesPrepared<SvgIconStylesProps, SvgIconVariables> = {
  root: ({ props: p, variables: v }): ICSSInJSStyle => ({
    speak: 'none',
    verticalAlign: 'middle',

    ...getXSpacingStyles(p.xSpacing, v.horizontalSpace),

    ...(p.circular && { ...getPaddedStyle(), borderRadius: '50%' }),
    ...(p.disabled && {
      color: v.disabledColor,
    }),
    display: 'inline-block',

    ...((p.bordered || v.borderColor) && getBorderedStyles(v.borderColor || v.color || 'currentColor')),

    backgroundColor: v.backgroundColor,
  }),

  outlinePart: ({ props: p }): ICSSInJSStyle => {
    return {
      display: 'none',

      ...(p.outline && {
        display: 'block',
      }),
    };
  },

  filledPart: ({ props: p }): ICSSInJSStyle => {
    return {
      ...(p.outline && {
        display: 'none',
      }),
    };
  },

  svg: ({ props: { size, disabled, rotate }, variables: v, rtl }): ICSSInJSStyle => {
    const iconSizeInRems = getIconSize(size, v);

    return {
      display: 'block',
      width: iconSizeInRems,
      height: iconSizeInRems,
      fill: v.color || 'currentColor',

      ...(disabled && {
        fill: v.disabledColor,
      }),

      transform: `rotate(${rotate}deg)`,
      // Use for Emotion:
      // ...(rtl && {
      //   transform: `rotate(${-1 * rotate}deg)`,
      // }),
    };
  },

  svgFlippingInRtl: config => {
    const { props, rtl } = config;
    return {
      ...callable(svgIconStyles.svg)(config),
      ...(rtl && {
        // Use for Emotion:
        // transform: `scaleX(-1) rotate(${props.rotate}deg)`,
        transform: `scaleX(-1) rotate(${-1 * props.rotate}deg)`,
      }),
    };
  },

  redPath: ({ variables: v }) => ({
    fill: v.redColor,
  }),
};

export default svgIconStyles;
