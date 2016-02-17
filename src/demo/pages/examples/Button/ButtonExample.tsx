import * as React from 'react';
import { default as Button, ButtonType } from '../../../../components/Button/index';
import Link from '../../../../components/Link/index';
import ExampleCard from '../../../components/ExampleCard/index';
import PropertiesTable from '../../../components/PropertiesTable/index';
import ButtonProperties from './ButtonProperties';

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
        <div><Link  target='_blank' text='Buttons' url='http://dev.office.com/fabric/components/button' /> are used typically in dialogs and for starting an operation.</div>

        <PropertiesTable properties={ ButtonProperties } />

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
          <Button type={ ButtonType.primary }>Create account</Button>
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
