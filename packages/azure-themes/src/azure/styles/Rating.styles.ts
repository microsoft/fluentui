import { IRatingStyleProps, IRatingStyles } from '@fluentui/react/lib/Rating';
import { IExtendedSemanticColors } from '../IExtendedSemanticColors';

export const RatingStyles = (props: IRatingStyleProps): Partial<IRatingStyles> => {
  const { disabled, readOnly, theme } = props;
  const { palette } = theme;
  const semanticColors = theme.semanticColors as IExtendedSemanticColors;

  return {
    root: [
      !disabled &&
        !readOnly && {
          selectors: {
            '&:hover': {
              selectors: {
                '.ms-RatingStar-back': { color: palette.themePrimary },
              },
            },
          },
        },
    ],
    ratingStarBack: [
      {
        color: semanticColors.controlOutline,
      },
      (disabled || readOnly) && {
        color: semanticColors.controlOutlineDisabled,
      },
    ],
    ratingStarFront: {
      color: semanticColors.bodyText,
    },
    ratingButton: [
      !disabled &&
        !readOnly && {
          selectors: {
            '&:hover ~ .ms-Rating-button': {
              selectors: {
                '.ms-RatingStar-back': { color: semanticColors.controlOutline },
                '.ms-RatingStar-front': { color: semanticColors.controlOutline },
              },
            },
          },
        },
    ],
  };
};
