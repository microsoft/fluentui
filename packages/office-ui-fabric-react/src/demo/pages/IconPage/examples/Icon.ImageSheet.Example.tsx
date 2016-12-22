/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */

import {
  Icon,
  IconName,
  IconType
} from '../../../../index';
import './IconExample.scss';

export class IconImageSheetExample extends React.Component<any, any> {
  public render() {
    return (
      <div>
        <Icon
          iconName={ IconName.None }
          iconType={ IconType.IconSheet }
          className={ 'ms-IconImageSheetExample-one' }
          src={ './dist/icon-one.png' }
          imageClassName={ 'ms-IconImageSheetExample-one-image' }
          />
        <Icon
          iconName={ IconName.None }
          iconType={ IconType.IconSheet }
          className={ 'ms-IconImageSheetExample-check' }
          src={ './dist/icon-one.png' }
          imageClassName={ 'ms-IconImageSheetExample-check-image' }
          />
        <Icon
          iconName={ IconName.None }
          iconType={ IconType.IconSheet }
          className={ 'ms-IconImageSheetExample-lock' }
          src={ './dist/icon-one.png' }
          imageClassName={ 'ms-IconImageSheetExample-lock-image' }
          />
      </div>
    );
  }
}
