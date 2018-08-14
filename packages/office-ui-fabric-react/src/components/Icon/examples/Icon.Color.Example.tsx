import * as React from 'react';

import { Icon } from 'office-ui-fabric-react/lib/Icon';
import './IconExample.scss';

export class IconColorExample extends React.Component<any, any> {
  public render(): JSX.Element {
    return (
      <div>
        <Icon iconName={'CompassNW'} className={'ms-IconExample ms-IconColorExample-deepSkyBlue'} />
        <Icon iconName={'Dictionary'} className={'ms-IconExample ms-IconColorExample-greenYellow'} />
        <Icon iconName={'TrainSolid'} className={'ms-IconExample ms-IconColorExample-salmon'} />
      </div>
    );
  }
}
