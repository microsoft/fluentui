import { CompoundButton } from './index';

/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */
export default class CompoundButtonVPage extends React.Component<any, any> {
  public render() {
    return <div >
      <div>
        <CompoundButton id='CompoundButton'
          description='You can create a new account here.'
        > Compound Button </CompoundButton>
      </div>
      <div>
        <CompoundButton id='CompoundButtonDisabled'
          description='You can create a new account here.'
        > Compound Button </CompoundButton>
      </div>
    </div >;
  }
}