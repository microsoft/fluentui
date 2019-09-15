import * as React from 'react';
import { Rating, RatingSize } from 'office-ui-fabric-react/lib/Rating';
import { getTheme, createTheme, ITheme } from 'office-ui-fabric-react/lib/Styling';

export class RatingBasicExample extends React.Component<
  {},
  {
    rating?: number;
    largeStarRating?: number;
    smallStarRating?: number;
    tenStarRating?: number;
    themedStarRating?: number;
    customIconStarRating?: number;
  }
> {
  private _customTheme: ITheme;

  constructor(props: {}) {
    super(props);

    this.state = {
      largeStarRating: undefined,
      smallStarRating: 3,
      tenStarRating: undefined,
      themedStarRating: undefined,
      customIconStarRating: 2.5
    };

    this._customTheme = createTheme(getTheme());
    this._customTheme.semanticColors.bodySubtext = '#DFDFDF';
    this._customTheme.semanticColors.bodyTextChecked = '#1E9FE8';
  }

  public render(): JSX.Element {
    return (
      <div className="ms-RatingBasicExample">
        Large Stars:
        <Rating
          min={1}
          max={5}
          size={RatingSize.Large}
          rating={this.state.largeStarRating}
          getAriaLabel={this._getRatingComponentAriaLabel}
          onChange={this._onLargeStarChange}
          onFocus={this._onFocus}
          onBlur={this._onBlur}
          ariaLabelFormat={'Select {0} of {1} stars'}
        />
        Small Stars
        <Rating
          min={1}
          max={5}
          rating={this.state.smallStarRating}
          onChange={this._onSmallStarChange}
          getAriaLabel={this._getRatingComponentAriaLabel}
          onFocus={this._onFocus}
          onBlur={this._onBlur}
          ariaLabelFormat={'Select {0} of {1} stars'}
        />
        10 Small Stars
        <Rating
          min={1}
          max={10}
          rating={this.state.tenStarRating}
          onChange={this._onTenStarChange}
          getAriaLabel={this._getRatingComponentAriaLabel}
          onFocus={this._onFocus}
          onBlur={this._onBlur}
          ariaLabelFormat={'Select {0} of {1} stars'}
        />
        Disabled:
        <Rating
          min={1}
          max={5}
          rating={this.state.rating}
          disabled={true}
          onFocus={this._onFocus}
          onBlur={this._onBlur}
          ariaLabelFormat={'Select {0} of {1} stars'}
        />
        Half star in readOnly mode:
        <Rating
          min={1}
          max={5}
          rating={2.5}
          getAriaLabel={this._getRatingComponentAriaLabel}
          readOnly={true}
          ariaLabelFormat={'Select {0} of {1} stars'}
        />
        Custom icons:
        <Rating
          min={1}
          max={5}
          rating={this.state.customIconStarRating}
          onChange={this._onCustomIconStarChange}
          onFocus={this._onFocus}
          onBlur={this._onBlur}
          getAriaLabel={this._getRatingComponentAriaLabel}
          ariaLabelFormat={'Select {0} of {1} stars'}
          icon="StarburstSolid"
          unselectedIcon="Starburst"
        />
        Themed star
        <Rating
          min={1}
          max={5}
          rating={this.state.themedStarRating}
          onChange={this._onThemedStarChange}
          getAriaLabel={this._getRatingComponentAriaLabel}
          onFocus={this._onFocus}
          onBlur={this._onBlur}
          ariaLabelFormat={'Select {0} of {1} stars'}
          theme={this._customTheme}
        />
      </div>
    );
  }

  private _onFocus = () => {
    console.log('onFocus called');
  };

  private _onBlur = () => {
    console.log('onBlur called');
  };

  private _onLargeStarChange = (ev: React.FocusEvent<HTMLElement>, rating: number): void => {
    this.setState({ largeStarRating: rating });
  };

  private _onSmallStarChange = (ev: React.FocusEvent<HTMLElement>, rating: number): void => {
    this.setState({ smallStarRating: rating });
  };

  private _onTenStarChange = (ev: React.FocusEvent<HTMLElement>, rating: number): void => {
    this.setState({ tenStarRating: rating });
  };

  private _onThemedStarChange = (ev: React.FocusEvent<HTMLElement>, rating: number): void => {
    this.setState({ themedStarRating: rating });
  };

  private _onCustomIconStarChange = (ev: React.FocusEvent<HTMLElement>, rating: number): void => {
    this.setState({ customIconStarRating: rating });
  };

  private _getRatingComponentAriaLabel(rating: number, maxRating: number): string {
    return `Rating value is ${rating} of ${maxRating}`;
  }
}
