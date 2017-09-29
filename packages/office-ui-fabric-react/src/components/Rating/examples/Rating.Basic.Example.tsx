import * as React from 'react';
import { autobind } from 'office-ui-fabric-react/lib/Utilities';
import {
  Rating,
  RatingSize
} from 'office-ui-fabric-react/lib/Rating';

import './Rating.Basic.Example.scss';

export class RatingBasicExample extends React.Component<any, any> {
  constructor() {
    super();

    this.state = {
      largeStarRating: null,
      smallStarRating: null,
      tenStarRating: null
    };
  }

  public render() {
    return (
      <div className='ms-RatingBasicExample'>
        Large Stars:
        <Rating
          id={ 'largeRatingStar' }
          min={ 1 }
          max={ 5 }
          size={ RatingSize.Large }
          rating={ this.state.largeStarRating }
          ariaLabelId={ this._getRatingComponentAriaLabel(this.state.largeStarRating, 5) }
          onChanged={ this._onLargeStarChanged }
          onFocus={ () => console.log('onFocus called') }
          onBlur={ () => console.log('onBlur called') }
        />

        Small Stars
        <Rating
          id={ 'smallRatingStar' }
          min={ 1 }
          max={ 5 }
          rating={ this.state.smallStarRating }
          onChanged={ this._onSmallStarChanged }
          ariaLabelId={ this._getRatingComponentAriaLabel(this.state.smallStarRating, 5) }
          onFocus={ () => console.log('onFocus called') }
          onBlur={ () => console.log('onBlur called') }
        />

        10 Small Stars
        <Rating
          id={ 'tenRatingStar' }
          min={ 1 }
          max={ 10 }
          rating={ this.state.tenStarRating }
          onChanged={ this._onTenStarChanged }
          ariaLabelId={ this._getRatingComponentAriaLabel(this.state._onTenStarChanged, 5) }
          onFocus={ () => console.log('onFocus called') }
          onBlur={ () => console.log('onBlur called') }
        />

        Disabled:
        <Rating
          min={ 1 }
          max={ 5 }
          rating={ this.state.rating }
          disabled={ true }
          onFocus={ () => console.log('onFocus called') }
          onBlur={ () => console.log('onBlur called') }
        />

        Half star in readOnly mode:
        <Rating
          id={ 'readOnlyRatingStar' }
          min={ 1 }
          max={ 5 }
          rating={ 2.5 }
          ariaLabelId={ this._getRatingComponentAriaLabel(2.5, 5) }
          enableHalfStar={ true }
          readOnly={ true }
        />
      </div>
    );
  }

  @autobind
  private _onLargeStarChanged(rating: number) {
    this.setState({
      largeStarRating: rating
    });
  }

  @autobind
  private _onSmallStarChanged(rating: number) {
    this.setState({
      smallStarRating: rating
    });
  }

  @autobind
  private _onTenStarChanged(rating: number) {
    this.setState({
      tenStarRating: rating
    });
  }

  private _getRatingComponentAriaLabel(rating: number, maxRating: number) {

    return 'Rating value is ' + rating + ' of ' + maxRating;

  }
}
