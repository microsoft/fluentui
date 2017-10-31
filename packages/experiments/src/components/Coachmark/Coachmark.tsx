import * as React from 'react';
import { BaseComponent } from '../../Utilities';
import { ICoachmarkProps } from './Coachmark.Props';
import { Layer } from 'office-ui-fabric-react/lib/Layer';

export class Coachmark extends BaseComponent<ICoachmarkProps, {}> {
  public render() {
    return (
      <Layer>
        <div>Hello world</div>
      </Layer>
    );
  }
};