import { pxToRem } from '../../../../utils';
import CarouselNavigationItem, {
  CarouselNavigationItemProps,
} from '../../../../components/Carousel/CarouselNavigationItem';
import { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles';
import { CarouselNavigationVariables } from './carouselNavigationVariables';
import { getColorScheme } from '../../colors';
import getIconFillOrOutlineStyles from '../../getIconFillOrOutlineStyles';

const carouselNavigationItemStyles: ComponentSlotStylesPrepared<
  CarouselNavigationItemProps,
  CarouselNavigationVariables
> = {
  root: ({ props: p, variables: v }): ICSSInJSStyle => {
    const { active, iconOnly, primary, vertical, thumbnails } = p;

    const colors = getColorScheme(v.colorScheme, null, primary);

    return {
      color: 'inherit',
      display: 'block',
      cursor: 'pointer',
      whiteSpace: 'nowrap',

      ...(iconOnly && {
        border: `${pxToRem(2)} solid transparent`,
      }),

      ...(vertical
        ? { padding: v.verticalItemPadding }
        : {
            padding: v.horizontalPadding,
          }),

      ...(iconOnly && {
        margin: pxToRem(1),
        padding: pxToRem(5), // padding works this way to get the border to only be 30x30px on focus which is the current design
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }),

      // active styles
      ...(active &&
        iconOnly && {
          color: v.iconOnlyColorActive,
          ...getIconFillOrOutlineStyles({ outline: false }),
        }),

      // focus styles
      ':focus-visible': {
        ...(iconOnly && {
          borderRadius: thumbnails ? '0' : '50%',
          borderColor: v.iconOnlyColorActive,
          ...getIconFillOrOutlineStyles({ outline: false }),
        }),
      },

      ...(iconOnly &&
        primary && {
          color: 'inherit',
          borderColor: v.borderColorActive || colors.borderActive,
        }),

      ':focus': {
        outline: 0,
      },

      // hover styles
      ':hover': {
        color: 'inherit',

        [`& .${CarouselNavigationItem.slotClassNames.indicator}`]: {
          background: v.indicatorBackgroundColor,
        },

        ...(iconOnly && getIconFillOrOutlineStyles({ outline: false })),

        ...(primary && iconOnly && { color: 'inherit' }),
      },
    };
  },

  content: ({ props: p }): ICSSInJSStyle => {
    const widthAdjust = p.indicator ? 26 : 0;

    return {
      ...(!p.active && {
        opacity: 0.4,
      }),
      whiteSpace: 'normal',
      lineHeight: 1.5,
      marginTop: pxToRem(-4),
      marginBottom: pxToRem(-4),
      display: 'inline-block',
      width: pxToRem(60),
      ...(p.vertical && {
        width: 'max-content',
        minWidth: pxToRem(46 - widthAdjust),
        maxWidth: pxToRem(262 - widthAdjust),
        marginRight: pxToRem(16),
      }),
    };
  },

  indicator: ({ props: p, variables: v }): ICSSInJSStyle => ({
    borderRadius: '50%',
    width: pxToRem(7),
    height: pxToRem(7),
    background: v.indicatorBackgroundColor,

    ...(p.active && {
      background: v.indicatorActiveBackgroundColor,
    }),

    ...(p.content && {
      marginRight: pxToRem(10),
    }),

    ...(!p.iconOnly && {
      // reduce margins so text has the dominant influence on the vertical height
      marginTop: 0,
      marginBottom: pxToRem(-8),
      verticalAlign: 'top',
    }),
  }),
};

export default carouselNavigationItemStyles;
