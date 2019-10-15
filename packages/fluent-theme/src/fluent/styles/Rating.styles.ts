import { IRatingStyleProps, IRatingStyles } from 'office-ui-fabric-react/lib/Rating';

export const RatingStyles = (props: IRatingStyleProps): Partial<IRatingStyles> => {
  const { disabled, readOnly, theme } = props;
  const { palette } = theme;

  return {
    root: [
      !disabled &&
        !readOnly && {
          selectors: {
            // This is part 1 of highlighting all stars up to the one the user is hovering over
            '&:hover': {
              selectors: {
                '.ms-RatingStar-back': { color: palette.neutralPrimary }
              }
            }
          }
        }
    ],
    ratingStarFront: {
      color: palette.neutralPrimary
    }
  };
};
