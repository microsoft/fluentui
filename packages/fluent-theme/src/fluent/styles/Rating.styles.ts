import { IRatingStyleProps, IRatingStyles } from 'office-ui-fabric-react/lib/Rating';
import { NeutralColors } from '../FluentColors';

export const RatingStyles = (props: IRatingStyleProps): Partial<IRatingStyles> => {
  const { disabled, readOnly, theme } = props;
  const { semanticColors } = theme;

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
    ratingStarBack: [
      {
        color: NeutralColors.gray80
      },
      disabled && {
        color: semanticColors.disabledBodySubtext
      }
    ],
    ratingStarFront: {
      color: NeutralColors.gray160
    },
    ratingButton: [
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
    ]
  };
};
