import * as React from 'react';
import {
  Link
} from '../../../index';
import {
  ExampleCard,
  PropertiesTableSet
} from '../../components/index';

import { CalloutBasicExample } from './examples/Callout.Basic.Example';
import { CalloutDirectionalExample } from './examples/Callout.Directional.Example';
import { CalloutCoverExample } from './examples/Callout.Cover.Example';

const CalloutBasicExampleCode = require('./examples/Callout.Basic.Example.tsx');
const CalloutDirectionalExampleCode = require('./examples/Callout.Directional.Example.tsx');
const CalloutCoverExampleCode = require('./examples/Callout.Cover.Example.tsx');

export class CalloutPage extends React.Component<any, any> {
  public render() {
    return (
      <div className='ms-CalloutPage'>
        <h1 className='ms-font-xxl'>Callout</h1>
        <div>
          <Link target='_blank' href='http://dev.office.com/fabric/components/callout'>Callouts</Link>
          <span> are used to notify the user of something special.</span>
        </div>
        <h2 className='ms-font-xl'>Examples</h2>
        <ExampleCard title='Simple callout' code={ CalloutBasicExampleCode }>
          <CalloutBasicExample />
        </ExampleCard>
        <ExampleCard title='Callout directional example' code={ CalloutDirectionalExampleCode }>
          <CalloutDirectionalExample />
        </ExampleCard>
        <ExampleCard title='Callout cover example' code={ CalloutCoverExampleCode }>
          <CalloutCoverExample />
        </ExampleCard>
        <PropertiesTableSet componentName='Callout' />
        <p>Besides the above properties, the <code>Callout</code> component accepts all properties that the React <code>button</code> and <code>a</code> components accept.</p>
      </div>
    );
  }
}
