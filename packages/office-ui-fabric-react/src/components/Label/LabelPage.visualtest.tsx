import { Label } from './index';
/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */
export default class LabelVPage extends React.Component<any, any> {
  public render() {
    return (
      <div>
        <div>
          <div><Label className='Label'>I'm a Label</Label></div>&nbsp;
           <div><Label className='LabelDisabled' disabled={ true }>I'm a disabled Label</Label></div>&nbsp;
           <div><Label className='LabelRequired' required={ true }>I'm a required Label</Label></div>&nbsp;
        </div>

      </div>
    );
  }
}
