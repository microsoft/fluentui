import { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles';
import { SvgIconXSpacing, SvgIconProps, iconClassNames } from '@fluentui/react-icons-northstar';

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
  root: ({ props: p, variables: v }): ICSSInJSStyle => {
    const iconSizeInRems = getIconSize(p.size, v);

    return {
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

      [`& .${iconClassNames.outline}`]: {
        display: 'none',

        ...(p.outline && {
          display: 'block',
        }),
      },

      [`& .${iconClassNames.filled}`]: {
        ...(p.outline && {
          display: 'none',
        }),
      },

      // TODO: fix svgFlippingInRtl
      [`& svg`]: {
        display: 'block',
        width: iconSizeInRems,
        height: iconSizeInRems,
        fill: v.color || 'currentColor',

        ...(p.disabled && {
          fill: v.disabledColor,
        }),

        transform: `rotate(${p.rotate}deg)`,
      },
    };
  },
};

export default svgIconStyles;
