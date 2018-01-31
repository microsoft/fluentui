/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import './IconExample.scss';

export class IconBasicExample extends React.Component<any, any> {
  public render() {
    return (
      <div>
        <Icon iconName='CompassNW' className='ms-IconExample' />
        <Icon iconName='Dictionary' className='ms-IconExample' />
        <Icon iconName='TrainSolid' className='ms-IconExample' />
      </div>
    );
  }
}
