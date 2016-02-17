import * as React from 'react';
import Button from '../../../components/button/Button';
import Link from '../../../components/link/Link';

let Highlight = require('react-highlight');

export default class ButtonExample extends React.Component<any, any> {
  public render() {
    return (
      <div className='ButtonExample'>
        <h1 className='ms-font-xxl'>Button</h1>
        <div><Link text='Buttons' url='http://dev.office.com/fabric/components/button' /> are used typically in dialogs and for starting an operation.</div>

        <h2 className='ms-font-xl'>Examples</h2>

        <Button>Create account</Button>
        <Button isPrimary={ true }>Create account</Button>

        <h2 className='ms-font-xl'>Code</h2>

        <div>TODO</div>

        <Highlight className='typescript'>
        { `import * as React from 'react';` }
        </Highlight>

        <h2 className='ms-font-xl'>Properties</h2>

        <div>TODO</div>

      </div>
    );
  }

}
