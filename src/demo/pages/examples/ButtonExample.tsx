import * as React from 'react';
import Button from '../../../components/button/Button';
import Link from '../../../components/link/Link';

export default class ButtonExample extends React.Component<any, any> {
  public render() {
    return (
      <div className='ButtonExample'>
        <h1 className='ms-font-xxl'>Button</h1>
        <div><Link text='Buttons' url='http://dev.office.com/fabric/components/button' /> are used typically in dialogs and for starting an operation.</div>

        <h2 className='ms-font-xl'>Default</h2>
        <Button>Create account</Button>
        
        <h2 className='ms-font-xl'>Primary</h2>
        <Button type='primary'>Create account</Button>
        
        <h2 className='ms-font-xl'>Hero</h2>
        <Button type='hero'>Create account</Button>
        
        <h2 className='ms-font-xl'>Compound</h2>
        <Button type='compound' description='Description of the action this button takes'>Create account</Button>

        <h2 className='ms-font-xl'>Command</h2>
        <Button type='command'>Create account</Button>

        <h2 className='ms-font-xl'>Code</h2>

        <div>TODO</div>

        <h2 className='ms-font-xl'>Properties</h2>

        <div>TODO</div>

      </div>
    );
  }

}
