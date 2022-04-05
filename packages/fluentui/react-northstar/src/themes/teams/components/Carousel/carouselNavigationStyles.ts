import { CarouselNavigationStylesProps } from '../../../../components/Carousel/CarouselNavigation';
import { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles';
import { CarouselNavigationVariables } from './carouselNavigationVariables';
import { pxToRem } from '../../../../utils';
import { getColorScheme } from '../../colors';

export const carouselNavigationStyles: ComponentSlotStylesPrepared<
  CarouselNavigationStylesProps,
  CarouselNavigationVariables
> = {
  root: ({ props: p, variables: v, theme }): ICSSInJSStyle => {
    const { iconOnly, primary, vertical, thumbnails } = p;
    const colors = getColorScheme(v.colorScheme, null, primary);
    const { siteVariables } = theme;

    return {
      display: 'flex',
      minHeight: pxToRem(24),
      margin: 0,
      padding: 0,
      color: v.color,
      backgroundColor: v.backgroundColor || 'inherit',
      listStyleType: 'none',
      justifyContent: 'center',
      position: 'relative',
      zIndex: 2,
      ...(!vertical &&
        thumbnails && {
          justifyContent: 'start',
          transform: `translateX(${pxToRem(v.width / 2 - v.thumbnailWidth / 2 - +p.activeIndex * v.thumbnailWidth)})`,
          transition: 'transform .5s ease',
        }),
      ...(iconOnly && { alignItems: 'center' }),

      ...(vertical && {
        flexDirection: 'column',
        backgroundColor: v.verticalBackgroundColor,
        width: 'fit-content',
        padding: `${pxToRem(8)} 0`,
        ...(iconOnly && {
          display: 'inline-block',
          width: 'auto',
        }),
      }),

      ...(!iconOnly &&
        !vertical && {
          // primary has hardcoded grey border color
          border: `${v.borderWidth} solid ${primary ? v.primaryBorderColor : v.borderColor || colors.border}`,
          borderRadius: siteVariables.borderRadiusMedium,
        }),
    };
  },
};
