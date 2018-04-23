import * as React from 'react';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import './IconExample.scss';

export class IconBasicExample extends React.Component<any, any> {
  public render(): JSX.Element {
    return (
      <div>
        <Icon name='CompassNW' className='ms-IconExample' />
        <Icon name='Dictionary' className='ms-IconExample' />
        <Icon name='TrainSolid' className='ms-IconExample' />
      </div>
    );
  }
}
