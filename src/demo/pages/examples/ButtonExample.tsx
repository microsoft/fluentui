import * as React from 'react';
import Button from '../../../components/button/Button';
import { ButtonType } from '../../../components/button/Button';
import Link from '../../../components/link/Link';

let Highlight = require('react-highlight');

export default class ButtonExample extends React.Component<any, any> {
  public render() {
    return (
      <div className='ButtonExample'>
        <h1 className='ms-font-xxl'>Button</h1>
        <div><Link text='Buttons' url='http://dev.office.com/fabric/components/button' /> are used typically in dialogs and for starting an operation.</div>

        <h2 className='ms-font-xl'>Default</h2>
        <Button type={ ButtonType.Default }>Create account</Button>
        
        <h2 className='ms-font-xl'>Primary</h2>
        <Button type={ ButtonType.Primary }>Create account</Button>
        
        <h2 className='ms-font-xl'>Hero</h2>
        <Button type={ ButtonType.Hero }>Create account</Button>
        
        <h2 className='ms-font-xl'>Compound</h2>
        <Button type={ ButtonType.Compound } description='Description of the action this button takes'>Create account</Button>

        <h2 className='ms-font-xl'>Command</h2>
        <Button type={ ButtonType.Command }>Create account</Button>

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
