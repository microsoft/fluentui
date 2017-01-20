import * as React from 'react';
import { autobind } from '@uifabric/utilities';
import {
  Rating,
  RatingSize
} from '../../../../index';

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
          />

        <Rating
          min={ 1 }
          max={ 5 }
          size={ RatingSize.Large }
          rating={ this.state.rating }
          onChanged={ this._onChanged }
          />

        <Rating
          min={ 1 }
          max={ 10 }
          size={ RatingSize.Large }
          rating={ this.state.rating }
          onChanged={ this._onChanged }
          />

        Disabled:
        <Rating
          min={ 1 }
          max={ 5 }
          rating={ this.state.rating }
          onChanged={ this._onChanged }
          disabled={ true }
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
