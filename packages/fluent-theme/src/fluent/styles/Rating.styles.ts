import { IRatingStyleProps } from 'office-ui-fabric-react/lib/Rating';
import { NeutralColors } from '../FluentColors';

export const RatingStyles = (props: IRatingStyleProps) => {
  const { disabled, readOnly, theme } = props;
  const { semanticColors } = theme;

  // Copied over from the source default styles
  const ratingSmallIconSize = 16;
  const ratingLargeIconSize = 20;
  // New padding sizes following fluent toolkit specs
  const ratingVerticalPadding = 8;
  const ratingHorizontalPadding = 2;

  return {
    root: [
      !disabled &&
        !readOnly && {
          selectors: {
            // This is part 1 of highlighting all stars up to the one the user is hovering over
            '&:hover': {
              selectors: {
                '.ms-RatingStar-back': { color: NeutralColors.gray160 }
              }
            }
          }
        }
    ],
    rootIsSmall: {
      height: ratingSmallIconSize + ratingVerticalPadding * 2
    },
    rootIsLarge: {
      height: ratingLargeIconSize + ratingVerticalPadding * 2
    },
    ratingStarBack: [
      {
        color: NeutralColors.gray80
      },
      disabled && {
        color: semanticColors.disabledBodyText
      }
    ],
    ratingStarFront: {
      color: NeutralColors.gray160
    },
    ratingButton: [
      {
        padding: `${ratingVerticalPadding}px ${ratingHorizontalPadding}px`,
        boxSizing: 'content-box',
        // Very dirty selectors nesting in order to get a proper height with the new padding measurements.
        // Might need some refactor in the source default styles.
        selectors: {
          '&.ms-Rating--small': {
            height: ratingSmallIconSize,
            selectors: {
              '.ms-RatingStar-container': {
                height: ratingSmallIconSize
              }
            }
          },
          '&.ms-Rating--large': {
            height: ratingLargeIconSize,
            selectors: {
              '.ms-RatingStar-container': {
                height: ratingLargeIconSize
              }
            }
          }
        }
      },
      !disabled &&
        !readOnly && {
          selectors: {
            // This is part 2 of highlighting all stars up to the one the user is hovering over
            '&:hover ~ .ms-Rating-button': {
              selectors: {
                '.ms-RatingStar-back': { color: NeutralColors.gray80 },
                '.ms-RatingStar-front': { color: NeutralColors.gray80 }
              }
            }
          }
        }
    ],
    ratingFocusZone: {
      padding: 0
    }
  };
};
