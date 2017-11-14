import * as React from 'react';
import { Icon, IIconStyles } from 'office-ui-fabric-react/lib/Icon';
import { mergeStyles } from 'office-ui-fabric-react/lib/Styling';

const IconExampleClass = mergeStyles({
  fontSize: 50,
  height: 50,
  width: 50,
  margin: '0 25px'
});

export class IconBasicExample extends React.Component<any, any> {
  public render() {
    return (
      <div>
        <Icon iconName='CompassNW' className={ IconExampleClass } />
        <Icon iconName='Dictionary' className={ IconExampleClass } />
        <Icon iconName='TrainSolid' className={ IconExampleClass } />
      </div>
    );
  }
}
