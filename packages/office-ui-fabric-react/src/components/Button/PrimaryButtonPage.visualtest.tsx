import { PrimaryButton } from './index';
/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */
export default class PrimaryButtonVPage extends React.Component<any, any> {
  public render() {
    return <div>
      <div>
        <PrimaryButton
          id='PrimaryButton'
          iconProps={ { iconName: 'Add' } }
          text='Primary Button'
        />
      </div >
      <div>
        <PrimaryButton
          id='PrimaryButtonDisabled'
          disabled={ true }
          iconProps={ { iconName: 'Add' } }
          text='Primary Button'
        />
      </div >
    </div>;
  }
}
