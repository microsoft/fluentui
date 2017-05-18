import { Rating, RatingSize } from './index';

/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */
export default class RatingVPage extends React.Component<any, any> {
  public render() {
    return (
      <div >
        <Rating className='Rating'
          min={ 1 }
          max={ 5 }
        />
        <Rating className='RatingLarge'
          min={ 1 }
          max={ 5 }
          size={ RatingSize.Large }
        />
        Disabled:
        <Rating className='RatingDisabled'
          min={ 1 }
          max={ 5 }
          disabled={ true } />
      </div>
    );
  }
}