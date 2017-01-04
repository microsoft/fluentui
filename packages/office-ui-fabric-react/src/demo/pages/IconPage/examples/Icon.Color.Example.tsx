/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */

import {
  Icon,
  IconName
} from '../../../../index';
import './IconExample.scss';

export class IconColorExample extends React.Component<any, any> {
  public render() {
    return (
      <div>
        <Icon iconName={ IconName.CompassNW } className={ 'ms-IconExample ms-IconColorExample-deepSkyBlue' } />
        <Icon iconName={ IconName.Dictionary } className={ 'ms-IconExample ms-IconColorExample-greenYellow' } />
        <Icon iconName={ IconName.TrainSolid } className={ 'ms-IconExample ms-IconColorExample-salmon' } />
      </div>
    );
  }
}
