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

const DeepSkyBlue = { color: 'deepskyblue' };
const GreenYellow = { color: 'greenyellow' };
const Salmon = { color: 'salmon' };

export class IconColorExample extends React.Component<any, any> {
  public render() {
    return (
      <div>
        <Icon
          iconName={ 'CompassNW' }
          className={ IconExampleClass }
          style={ DeepSkyBlue }
        />
        <Icon
          iconName={ 'Dictionary' }
          className={ IconExampleClass }
          style={ GreenYellow }
        />
        <Icon
          iconName={ 'TrainSolid' }
          className={ IconExampleClass }
          style={ Salmon }
        />
      </div>
    );
  }
}
