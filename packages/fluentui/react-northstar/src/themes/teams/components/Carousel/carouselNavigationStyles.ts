import { CarouselNavigationProps } from '../../../../components/Carousel/CarouselNavigation';
import { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles';
import { CarouselNavigationVariables } from './carouselNavigationVariables';
import { pxToRem } from '../../../../utils';
import { getColorScheme } from '../../colors';

const carouselNavigationStyles: ComponentSlotStylesPrepared<CarouselNavigationProps, CarouselNavigationVariables> = {
  root: ({ props: p, variables: v }): ICSSInJSStyle => {
    const { iconOnly, primary, vertical, thumbnails } = p;
    const colors = getColorScheme(v.colorScheme, null, primary);

    return {
      display: 'flex',
      minHeight: pxToRem(24),
      margin: 0,
      padding: 0,
      color: v.color,
      backgroundColor: v.backgroundColor || 'inherit',
      listStyleType: 'none',
      justifyContent: 'center',
      ...(!vertical &&
        thumbnails && {
          justifyContent: 'start',
          transform: `translateX(${pxToRem(v.width / 2 - 40 - +p.activeIndex * 75)})`,
          transition: 'transform .5s ease',
        }),
      ...(iconOnly && { alignItems: 'center' }),

      ...(vertical && {
        flexDirection: 'column',
        backgroundColor: v.verticalBackgroundColor,

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
          borderRadius: pxToRem(4),
        }),
    };
  },
};

export default carouselNavigationStyles;
