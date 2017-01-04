/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */

import {
  Icon,
  IconName
} from '../../../../index';
import './IconExample.scss';

export class IconBasicExample extends React.Component<any, any> {
  public render() {
    return (
      <div>
        <Icon iconName={ IconName.CompassNW } className={ 'ms-IconExample' } />
        <Icon iconName={ IconName.Dictionary } className={ 'ms-IconExample' } />
        <Icon iconName={ IconName.TrainSolid } className={ 'ms-IconExample' } />
      </div>
    );
  }
}
