import * as React from 'react';
import {
  Link
} from '../../../components/index';
import {
  ExampleCard,
  PropertiesTableSet
} from '../../components/index';
import CalloutBasicExample from './examples/Callout.Basic.Example';
import CalloutDirectionalExample from './examples/Callout.Directional.Example';
let CalloutBasicExampleCode = require('./examples/Callout.Basic.Example.tsx');
let CalloutDirectionalExampleCode = require('./examples/Callout.Directional.Example.tsx');

export default class CalloutPage extends React.Component<any, any> {
  public render() {
    return (
      <div className='ms-CalloutPage'>
        <h1 className='ms-font-xxl'>Callout</h1>
        <div>
          <Link target='_blank' href='http://dev.office.com/fabric/components/callout'>Callouts</Link>
          are used to notify the user of something special.
        </div>
        <h2 className='ms-font-xl'>Examples</h2>
        <ExampleCard title='Simple callout' code={ CalloutBasicExampleCode }>
          <CalloutBasicExample />
        </ExampleCard>
         <ExampleCard title='Callout directional example' code={ CalloutDirectionalExampleCode }>
          <CalloutDirectionalExample />
        </ExampleCard>
        <PropertiesTableSet componentName='Callout' />
        <p>Besides the above properties, the <code>Callout</code> component accepts all properties that the React <code>button</code> and <code>a</code> components accept.</p>
      </div>
    );
  }
}
