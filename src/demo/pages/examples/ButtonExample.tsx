import * as React from 'react';
import { default as Button, ButtonType, ButtonProps } from '../../../components/button/Button';
import Link from '../../../components/link/Link';
import ExampleCard from '../../components/exampleCard/ExampleCard';
import PropertiesTable from '../../components/propertiesTable/PropertiesTable';
let Highlight = require('react-highlight');

let DefaultButtonExample = require('./ButtonExample.Default.txt');
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

        <h2 className='ms-font-xl'>Examples</h2>

        <ExampleCard
          title='Example: Default button'
          code={ DefaultButtonExample }
        >
          <Button>Create account</Button>
        </ExampleCard>

        <ExampleCard
          title='Example: Primary button'
          code={ PrimaryButtonExample }
        >
          <Button type={ ButtonType.Primary }>Create account</Button>
        </ExampleCard>

        <ExampleCard
          title='Example: Hero button'
          code={ HeroButtonExample }
        >
          <Button type={ ButtonType.Hero }>Create account</Button>
        </ExampleCard>

        <ExampleCard
          title='Example: Compound button'
          code={ CompoundButtonExample }
        >

      <Button type={ ButtonType.Compound }>Create account</Button>
        </ExampleCard>

        <ExampleCard
          title='Example: Command button'
          code={ CommandButtonExample }
        >
          <Button type={ ButtonType.Command } description='Description of the action this button takes'>Create account</Button>
        </ExampleCard>

        <PropertiesTable properties={ ButtonProps } />
      </div>
    );
  }

}
