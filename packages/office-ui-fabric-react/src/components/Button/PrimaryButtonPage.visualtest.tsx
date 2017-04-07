import { PrimaryButton } from './index';
import { IconName } from '../../Icon';

/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */
export default class PrimaryButtonVPage extends React.Component<any, any> {
  public render() {
    return <div>
      <div>
        <PrimaryButton id='PrimaryButton' icon='Add' > Primary Button </PrimaryButton>
      </div >
      <div>
        <PrimaryButton id='PrimaryButtonDisabled' icon='Add' > Primary Button </PrimaryButton>
      </div >
    </div>;
  }
}