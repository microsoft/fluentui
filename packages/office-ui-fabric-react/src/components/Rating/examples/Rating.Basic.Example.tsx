import * as React from 'react';
import {
  Rating,
  RatingSize
} from 'office-ui-fabric-react/lib/Rating';
import {
  getTheme,
  createTheme,
  ITheme
} from '../../../Styling';

import './Rating.Basic.Example.scss';

export class RatingBasicExample extends React.Component<{}, {
  rating?: number;
  largeStarRating?: number;
  smallStarRating?: number;
  tenStarRating?: number;
  themedStarRating?: number;
}> {
  private _customTheme: ITheme;

  constructor(props: {}) {
    super(props);

    this.state = {
      largeStarRating: undefined,
      smallStarRating: 3,
      tenStarRating: undefined,
      themedStarRating: undefined
    };

    this._customTheme = createTheme(getTheme());
    this._customTheme.semanticColors.bodySubtext = '#DFDFDF';
    this._customTheme.semanticColors.bodyTextChecked = '#1E9FE8';
  }

  // tslint:disable:jsx-no-lambda
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
          getAriaLabel={ this._getRatingComponentAriaLabel }
          onChanged={ this._onLargeStarChanged }
          onFocus={ () => console.log('onFocus called') }
          onBlur={ () => console.log('onBlur called') }
          ariaLabelFormat={ '{0} of {1} stars selected' }
        />

        Small Stars
        <Rating
          id={ 'smallRatingStar' }
          min={ 1 }
          max={ 5 }
          rating={ this.state.smallStarRating }
          onChanged={ this._onSmallStarChanged }
          getAriaLabel={ this._getRatingComponentAriaLabel }
          onFocus={ () => console.log('onFocus called') }
          onBlur={ () => console.log('onBlur called') }
          ariaLabelFormat={ '{0} of {1} stars selected' }
        />

        10 Small Stars
        <Rating
          id={ 'tenRatingStar' }
          min={ 1 }
          max={ 10 }
          rating={ this.state.tenStarRating }
          onChanged={ this._onTenStarChanged }
          getAriaLabel={ this._getRatingComponentAriaLabel }
          onFocus={ () => console.log('onFocus called') }
          onBlur={ () => console.log('onBlur called') }
          ariaLabelFormat={ '{0} of {1} stars selected' }
        />

        Disabled:
        <Rating
          min={ 1 }
          max={ 5 }
          rating={ this.state.rating }
          disabled={ true }
          onFocus={ () => console.log('onFocus called') }
          onBlur={ () => console.log('onBlur called') }
          ariaLabelFormat={ '{0} of {1} stars selected' }
        />

        Half star in readOnly mode:
        <Rating
          id={ 'readOnlyRatingStar' }
          min={ 1 }
          max={ 5 }
          rating={ 2.5 }
          getAriaLabel={ this._getRatingComponentAriaLabel }
          readOnly={ true }
          ariaLabelFormat={ '{0} of {1} stars selected' }
        />

        Themed star
        <Rating
          id={ 'themedRatingStar' }
          min={ 1 }
          max={ 5 }
          rating={ this.state.themedStarRating }
          onChanged={ this._onThemedStarChanged }
          getAriaLabel={ this._getRatingComponentAriaLabel }
          onFocus={ () => console.log('onFocus called') }
          onBlur={ () => console.log('onBlur called') }
          ariaLabelFormat={ '{0} of {1} stars selected' }
          theme={ this._customTheme }
        />
      </div>
    );
  }

  private _onLargeStarChanged = (rating: number): void => {
    this.setState({
      largeStarRating: rating
    });
  }

  private _onSmallStarChanged = (rating: number): void => {
    this.setState({
      smallStarRating: rating
    });
  }

  private _onTenStarChanged = (rating: number): void => {
    this.setState({
      tenStarRating: rating
    });
  }

  private _onThemedStarChanged = (rating: number): void => {
    this.setState({
      themedStarRating: rating
    });
  }

  private _getRatingComponentAriaLabel(rating: number, maxRating: number) {

    return 'Rating value is ' + rating + ' of ' + maxRating;

  }
}
