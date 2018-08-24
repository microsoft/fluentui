import * as React from 'react';
import { Rating, RatingSize } from 'office-ui-fabric-react';

export class FluentStylesRatingExample extends React.Component<
  {},
  {
    rating?: number;
    largeStarRating?: number;
    smallStarRating?: number;
    tenStarRating?: number;
    themedStarRating?: number;
  }
> {
  constructor(props: {}) {
    super(props);

    this.state = {
      largeStarRating: undefined,
      smallStarRating: 3,
      tenStarRating: undefined,
      themedStarRating: undefined
    };
  }

  // tslint:disable:jsx-no-lambda
  public render(): JSX.Element {
    return (
      <div className="ms-RatingBasicExample">
        Large Stars:
        <Rating
          id={'largeRatingStar'}
          min={1}
          max={5}
          size={RatingSize.Large}
          rating={this.state.largeStarRating}
          getAriaLabel={this._getRatingComponentAriaLabel}
          onChange={this._onLargeStarChange}
          onFocus={() => console.log('onFocus called')}
          onBlur={() => console.log('onBlur called')}
          ariaLabelFormat={'{0} of {1} stars selected'}
        />
        Small Stars
        <Rating
          id={'smallRatingStar'}
          min={1}
          max={5}
          rating={this.state.smallStarRating}
          onChange={this._onSmallStarChange}
          getAriaLabel={this._getRatingComponentAriaLabel}
          onFocus={() => console.log('onFocus called')}
          onBlur={() => console.log('onBlur called')}
          ariaLabelFormat={'{0} of {1} stars selected'}
        />
        10 Small Stars
        <Rating
          id={'tenRatingStar'}
          min={1}
          max={10}
          rating={this.state.tenStarRating}
          onChange={this._onTenStarChange}
          getAriaLabel={this._getRatingComponentAriaLabel}
          onFocus={() => console.log('onFocus called')}
          onBlur={() => console.log('onBlur called')}
          ariaLabelFormat={'{0} of {1} stars selected'}
        />
        Disabled:
        <Rating
          min={1}
          max={5}
          rating={this.state.rating}
          disabled={true}
          onFocus={() => console.log('onFocus called')}
          onBlur={() => console.log('onBlur called')}
          ariaLabelFormat={'{0} of {1} stars selected'}
        />
      </div>
    );
  }

  private _onLargeStarChange = (event: React.FocusEvent<HTMLElement>, rating: number): void => {
    this.setState({
      largeStarRating: rating
    });
  };

  private _onSmallStarChange = (event: React.FocusEvent<HTMLElement>, rating: number): void => {
    this.setState({
      smallStarRating: rating
    });
  };

  private _onTenStarChange = (event: React.FocusEvent<HTMLElement>, rating: number): void => {
    this.setState({
      tenStarRating: rating
    });
  };

  private _getRatingComponentAriaLabel(rating: number, maxRating: number): string {
    return `Rating value is ${rating} of ${maxRating}`;
  }
}
