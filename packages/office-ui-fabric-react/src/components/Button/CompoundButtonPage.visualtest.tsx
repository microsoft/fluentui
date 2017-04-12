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
          text='Compound Button' />
      </div>
      <div>
        <CompoundButton id='CompoundButtonDisabled'
          description='You can create a new account here.'
          text='Compound Button' />
      </div>
    </div >;
  }
}