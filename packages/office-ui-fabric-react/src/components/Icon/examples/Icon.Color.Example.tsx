import * as React from 'react';

import { Icon } from 'office-ui-fabric-react/lib/Icon';
import './IconExample.scss';

export class IconColorExample extends React.Component<any, any> {
  public render(): JSX.Element {
    return (
      <div>
        <Icon name={ 'CompassNW' } className={ 'ms-IconExample ms-IconColorExample-deepSkyBlue' } />
        <Icon name={ 'Dictionary' } className={ 'ms-IconExample ms-IconColorExample-greenYellow' } />
        <Icon name={ 'TrainSolid' } className={ 'ms-IconExample ms-IconColorExample-salmon' } />
      </div>
    );
  }
}
