import * as React from 'react';
import { Rating, RatingSize } from 'office-ui-fabric-react/lib/Rating';
import { getTheme, createTheme, ITheme } from 'office-ui-fabric-react/lib/Styling';

const getRatingComponentAriaLabel = (rating: number, maxRating: number): string => {
  return `Rating value is ${rating} of ${maxRating}`;
};

const customTheme: ITheme = createTheme(getTheme());
customTheme.semanticColors.bodySubtext = '#DFDFDF';
customTheme.semanticColors.bodyTextChecked = '#1E9FE8';

export const RatingBasicExample: React.FunctionComponent = () => {
  const [largeStarRating, setLargeStarsRating] = React.useState(1);
  const [smallStarRating, setSmallStarRating] = React.useState(3);
  const [tenStarRating, setTenStarRatingg] = React.useState(1);
  const [customIconStarRating, setCustomIconStarRating] = React.useState(2.5);
  const [themedStarRating, setThemedStarRating] = React.useState(1);

  const onLargeStarChange = (ev: React.FocusEvent<HTMLElement>, rating: number): void => {
    setLargeStarsRating(rating);
  };

  const onSmallStarChange = (ev: React.FocusEvent<HTMLElement>, rating: number): void => {
    setSmallStarRating(rating);
  };

  const onTenStarChange = (ev: React.FocusEvent<HTMLElement>, rating: number): void => {
    setTenStarRatingg(rating);
  };
  const onCustomIconStarChange = (ev: React.FocusEvent<HTMLElement>, rating: number): void => {
    setCustomIconStarRating(rating);
  };
  const onThemedStarChange = (ev: React.FocusEvent<HTMLElement>, rating: number): void => {
    setThemedStarRating(rating);
  };

  return (
    <div>
      Large Stars:
      <Rating
        min={1}
        max={5}
        size={RatingSize.Large}
        rating={largeStarRating}
        ariaLabel="Large stars"
        // eslint-disable-next-line react/jsx-no-bind
        onChange={onLargeStarChange}
        ariaLabelFormat={'{0} of {1} stars'}
      />
      Small Stars
      <Rating
        id="small"
        min={1}
        max={5}
        rating={smallStarRating}
        // eslint-disable-next-line react/jsx-no-bind
        onChange={onSmallStarChange}
        ariaLabel="Small stars"
        ariaLabelFormat={'{0} of {1} stars'}
      />
      10 Small Stars
      <Rating
        min={1}
        max={10}
        rating={tenStarRating}
        // eslint-disable-next-line react/jsx-no-bind
        onChange={onTenStarChange}
        ariaLabel="10 small stars"
        ariaLabelFormat={'{0} of {1} stars'}
      />
      Disabled:
      <Rating min={1} max={5} rating={1} disabled={true} ariaLabelFormat={'{0} of {1} stars'} />
      Half star in readOnly mode:
      <Rating
        min={1}
        max={5}
        rating={2.5}
        getAriaLabel={getRatingComponentAriaLabel}
        readOnly
        ariaLabelFormat={'{0} of {1} stars'}
      />
      Custom icons:
      <Rating
        min={1}
        max={5}
        rating={customIconStarRating}
        // eslint-disable-next-line react/jsx-no-bind
        onChange={onCustomIconStarChange}
        ariaLabel="Custom icons"
        ariaLabelFormat={'{0} of {1} stars'}
        icon="StarburstSolid"
        unselectedIcon="Starburst"
      />
      Themed star
      <Rating
        min={1}
        max={5}
        rating={themedStarRating}
        // eslint-disable-next-line react/jsx-no-bind
        onChange={onThemedStarChange}
        ariaLabel="Themed star"
        ariaLabelFormat={'{0} of {1} stars'}
        theme={customTheme}
      />
    </div>
  );
};
