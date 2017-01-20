/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */

import {
  Icon,
  IconType
} from '../../../../index';
import './IconExample.scss';

export class IconImageSheetExample extends React.Component<any, any> {
  public render() {
    return (
      <div>
        <Icon
          iconName={ 'None' }
          iconType={ IconType.Image }
          className={ 'ms-IconImageSheetExample-one' }
          imageProps={ {
            src: './dist/icon-one.png',
            className: 'ms-IconImageSheetExample-one-image'
          } }
          />
        <Icon
          iconName={ 'None' }
          iconType={ IconType.Image }
          className={ 'ms-IconImageSheetExample-check' }
          imageProps={ {
            src: './dist/icon-one.png',
            className: 'ms-IconImageSheetExample-check-image'
          } }
          />
        <Icon
          iconName={ 'None' }
          iconType={ IconType.Image }
          className={ 'ms-IconImageSheetExample-lock' }
          imageProps={ {
            src: './dist/icon-one.png',
            className: 'ms-IconImageSheetExample-lock-image'
          } }
          />
      </div>
    );
  }
}
