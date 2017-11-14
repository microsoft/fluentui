// tslint:disable:jsx-no-lambda

import * as React from 'react';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { mergeStyles } from 'office-ui-fabric-react/lib/Styling';

const IconExampleClass = mergeStyles({
  fontSize: 50,
  height: 50,
  width: 50,
  margin: '0 25px'
});

export class IconColorExample extends React.Component<any, any> {
  public render() {
    return (
      <div>
        <Icon
          iconName={ 'CompassNW' }
          className={ IconExampleClass }
          getStyles={ () => ({ root: { color: 'deepskyblue' } }) }
        />
        <Icon
          iconName={ 'Dictionary' }
          className={ IconExampleClass }
          getStyles={ () => ({ root: { color: 'greenyellow' } }) }
        />
        <Icon
          iconName={ 'TrainSolid' }
          className={ IconExampleClass }
          getStyles={ () => ({ root: { color: 'salmon' } }) }
        />
      </div>
    );
  }
}
