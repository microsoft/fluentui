import { cssColor, IRGB } from '../../utilities/color/colors';
import { IShimmeredDetailsListStyleProps, IShimmeredDetailsListStyles } from './ShimmeredDetailsList.types';

export const getStyles = (props: IShimmeredDetailsListStyleProps): IShimmeredDetailsListStyles => {
  const { theme, className, enableShimmer } = props;
  const { semanticColors } = theme;
  const rgbColor: IRGB | undefined = cssColor(semanticColors.listBackground);
  const transparentColorStart = rgbColor ? `rgba(${rgbColor.r}, ${rgbColor.g}, ${rgbColor.b}, 0)` : 'transparent';
  const transparentColorMiddle = rgbColor ? `rgba(${rgbColor.r}, ${rgbColor.g}, ${rgbColor.b}, 0.5)` : 'transparent';

  return {
    root: [
      enableShimmer && {
        // set position relative to stop the fading overlay cover the DetailsList header.
        position: 'relative',
        selectors: {
          ':after': {
            content: '""',
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            backgroundImage: `linear-gradient(
              to bottom,
              ${transparentColorStart} 30%,
              ${transparentColorMiddle} 65%,
              ${semanticColors.listBackground} 100%
              )`
          }
        }
      },
      className
    ]
  };
};
