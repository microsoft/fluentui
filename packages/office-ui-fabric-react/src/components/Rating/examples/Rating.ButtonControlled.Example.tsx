import * as React from 'react';
import { Rating } from 'office-ui-fabric-react/lib/Rating';
import { PrimaryButton } from 'office-ui-fabric-react/lib/Button';

export class RatingButtonControlledExample extends React.Component<
  {},
  {
    rating: number;
  }
> {
  constructor(props: {}) {
    super(props);

    this.state = {
      rating: 0
    };
  }

  // tslint:disable:jsx-no-lambda
  public render() {
    const maxrating = 5;

    return (
      <div className="ms-RatingButtonControlledExample">
        <Rating
          rating={this.state.rating}
          max={5}
          readOnly={true}
          allowZeroStars={true}
          getAriaLabel={this._getRatingComponentAriaLabel}
          ariaLabelFormat={'Select {0} of {1} stars'}
        />
        <PrimaryButton
          text={'Click to change rating to ' + (maxrating - this.state.rating)}
          onClick={e => {
            if (this.state.rating === 0) {
              this.setState({ rating: 5 });
            } else {
              this.setState({ rating: 0 });
            }
          }}
        />
      </div>
    );
  }

  private _getRatingComponentAriaLabel(rating: number, maxRating: number): string {
    return `Rating value is ${rating} of ${maxRating}`;
  }
}
