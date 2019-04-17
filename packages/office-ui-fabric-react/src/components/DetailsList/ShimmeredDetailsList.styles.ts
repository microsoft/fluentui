import { cssColor, IRGB } from '../../utilities/color/colors';
import { IShimmeredDetailsListStyleProps, IShimmeredDetailsListStyles } from './ShimmeredDetailsList.types';

export const getStyles = (props: IShimmeredDetailsListStyleProps): IShimmeredDetailsListStyles => {
  const { theme, className, enableShimmer, showCheckbox, compact } = props;
  const { semanticColors } = theme;

  // Following lines are to convert the `listBackground` semantic color to a semitransparent color to fix a Safari bug
  // which is not playing well with `transparent` being used in a linear gradient.
  const rgbColor: IRGB | undefined = cssColor(semanticColors.listBackground);
  const transparentColorStart = rgbColor ? `rgba(${rgbColor.r}, ${rgbColor.g}, ${rgbColor.b}, 0)` : 'transparent';
  const transparentColorMiddle = rgbColor ? `rgba(${rgbColor.r}, ${rgbColor.g}, ${rgbColor.b}, 0.5)` : 'transparent';

  return {
    root: [
      enableShimmer && {
        // set `position: relative` to stop the fading overlay cover the DetailsList header.
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
    ],
    rowPlaceholderWrapper: [
      showCheckbox && {
        marginLeft: 40 // 40px to take into account the checkbox of items if present.
      },
      !compact && {
        marginBottom: 1 // 1px to take into account the border-bottom of DetailsRow not in compact mode.
      }
    ]
  };
};
