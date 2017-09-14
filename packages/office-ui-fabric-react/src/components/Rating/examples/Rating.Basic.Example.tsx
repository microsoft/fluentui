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
      rating: null
    };
  }

  public render() {
    return (
      <div className='ms-RatingBasicExample'>
        <Rating
          min={ 1 }
          max={ 5 }
          rating={ this.state.rating }
          onChanged={ this._onChanged }
          onFocus={ () => console.log('onFocus called') }
          onBlur={ () => console.log('onBlur called') }
        />

        <Rating
          min={ 1 }
          max={ 5 }
          size={ RatingSize.Large }
          rating={ this.state.rating }
          onChanged={ this._onChanged }
          onFocus={ () => console.log('onFocus called') }
          onBlur={ () => console.log('onBlur called') }
        />

        <Rating
          min={ 1 }
          max={ 10 }
          size={ RatingSize.Large }
          rating={ this.state.rating }
          onChanged={ this._onChanged }
          onFocus={ () => console.log('onFocus called') }
          onBlur={ () => console.log('onBlur called') }
        />

        Disabled:
        <Rating
          min={ 1 }
          max={ 5 }
          rating={ this.state.rating }
          onChanged={ this._onChanged }
          disabled={ true }
          onFocus={ () => console.log('onFocus called') }
          onBlur={ () => console.log('onBlur called') }
        />
      </div>
    );
  }

  @autobind
  private _onChanged(rating: number) {
    this.setState({
      rating: rating
    });
  }
}
