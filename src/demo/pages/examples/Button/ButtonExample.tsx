import * as React from 'react';
import { default as Button, ButtonType, ButtonProps } from '../../../../components/Button';
import Link from '../../../../components/Link';
import ExampleCard from '../../../components/ExampleCard';
import PropertiesTable from '../../../components/PropertiesTable';

let NormalButtonExample = require('./ButtonExample.Normal.txt');
let PrimaryButtonExample = require('./ButtonExample.Primary.txt');
let HeroButtonExample = require('./ButtonExample.Hero.txt');
let CompoundButtonExample = require('./ButtonExample.Compound.txt');
let CommandButtonExample = require('./ButtonExample.Command.txt');

export default class ButtonExample extends React.Component<any, any> {
  public render() {
    return (
      <div className='ButtonExample'>
        <h1 className='ms-font-xxl'>Button</h1>
        <div><Link text='Buttons' url='http://dev.office.com/fabric/components/button' /> are used typically in dialogs and for starting an operation.</div>

        <PropertiesTable properties={ ButtonProps } />

        <h2 className='ms-font-xl'>Examples</h2>

        <ExampleCard
          title='Normal button'
          code={ NormalButtonExample }
        >
          <Button>Create account</Button>
        </ExampleCard>

        <ExampleCard
          title='Primary button'
          code={ PrimaryButtonExample }
        >
          <Button type={ ButtonType.normal }>Create account</Button>
        </ExampleCard>

        <ExampleCard
          title='Hero button'
          code={ HeroButtonExample }
        >
          <Button type={ ButtonType.hero }>Create account</Button>
        </ExampleCard>

        <ExampleCard
          title='Compound button'
          code={ CompoundButtonExample }
        >
          <Button type={ ButtonType.compound }>Create account</Button>
        </ExampleCard>

        <ExampleCard
          title='Command button'
          code={ CommandButtonExample }
        >
          <Button type={ ButtonType.command } description='Description of the action this button takes'>Create account</Button>
        </ExampleCard>

      </div>
    );
  }

}
