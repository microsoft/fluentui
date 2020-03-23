import * as _ from 'lodash';
import { callable, ComponentSlotStylesPrepared, FontIconSpec, ICSSInJSStyle, ThemeIconSpec } from '@fluentui/styles';

import { pxToRem, SizeValue } from '../../../../utils';
import { StrictColorScheme, ItemType } from '../../../types';
import { IconXSpacing, IconStylesProps } from '../../../../components/Icon/Icon';
import { getStyle as getSvgStyle } from './svg';
import { IconVariables, iconColorAreas } from './iconVariables';

export const emptyIcon: ThemeIconSpec = { icon: { content: '?' } };

const getPaddedStyle = (): ICSSInJSStyle => ({
  padding: pxToRem(4),
});

const getBorderedStyles = (boxShadowColor: string): ICSSInJSStyle => {
  return {
    ...getPaddedStyle(),

    boxShadow: `0 0 0 .05rem ${boxShadowColor} inset`,
  };
};

const getIconSize = (size: SizeValue, v: IconVariables): string => {
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

const getIconColor = (variables, colors: StrictColorScheme<ItemType<typeof iconColorAreas>>) => {
  return _.get(colors, 'foreground', variables.color || 'currentColor');
};

const getXSpacingStyles = (xSpacing: IconXSpacing, horizontalSpace: string): ICSSInJSStyle => {
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

const iconStyles: ComponentSlotStylesPrepared<IconStylesProps, IconVariables> = {
  root: ({ props: p, variables: v, theme: t, rtl }): ICSSInJSStyle => {
    const iconSpec: ThemeIconSpec = (p.name && t.icons[p.name]) || emptyIcon;
    const colors = v.colorScheme[p.color];

    return {
      speak: 'none',
      verticalAlign: 'middle',

      ...getXSpacingStyles(p.xSpacing, v.horizontalSpace),

      ...(p.circular && { ...getPaddedStyle(), borderRadius: '50%' }),
      ...(p.disabled && {
        color: v.disabledColor,
      }),
      display: 'inline-block', // we overriding this for Base theme

      // overriding base theme border handling
      ...((p.bordered || v.borderColor) && getBorderedStyles(v.borderColor || getIconColor(v, colors))),

      ...(p.isFontIcon && {
        fontWeight: 900, // required for the fontAwesome to render
        alignItems: 'center',
        boxSizing: 'content-box',
        display: 'inline-flex',
        justifyContent: 'center',

        fontFamily: (iconSpec.icon as FontIconSpec).fontFamily,
        fontSize: v[`${p.size}Size`],
        lineHeight: 1,
        width: v[`${p.size}Size`],
        height: v[`${p.size}Size`],

        '::before': {
          content: (iconSpec.icon as FontIconSpec).content,
        },

        transform: rtl ? `scaleX(-1) rotate(${-1 * p.rotate}deg)` : `rotate(${p.rotate}deg)`,
      }),
      ...(p.isSvgIcon && { backgroundColor: v.backgroundColor }),
    };
  },

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

  svg: ({ props: { size, color, disabled, rotate }, variables: v }): ICSSInJSStyle => {
    const colors = v.colorScheme[color];
    const iconSizeInRems = getIconSize(size, v);

    return {
      display: 'block',
      width: iconSizeInRems,
      height: iconSizeInRems,
      fill: getIconColor(v, colors),

      ...(disabled && {
        fill: v.disabledColor,
      }),

      transform: `rotate(${rotate}deg)`,

      ...getSvgStyle('svg'),
    };
  },

  svgFlippingInRtl: config => {
    const { props, rtl } = config;
    return {
      ...callable(iconStyles.svg)(config),
      ...(rtl && {
        transform: `scaleX(-1) rotate(${-1 * props.rotate}deg)`,
      }),
    };
  },

  g: getSvgStyle('g'),

  path: getSvgStyle('path'),

  secondaryPath: getSvgStyle('secondaryPath'),
};

export default iconStyles;
