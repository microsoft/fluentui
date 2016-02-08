import * as React from 'react';
import Button from '../../../components/button/Button';

export default class ButtonExample extends React.Component<any, any> {
  public render() {
    return (
      <div className='ButtonExample'>
        <h1>Button and Button Primary</h1>

        <Button>Create account</Button>
        <Button isPrimary={ true }>Create account</Button>
      </div>
    );
  }

}
