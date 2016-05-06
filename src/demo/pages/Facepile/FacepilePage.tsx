import * as React from 'react';
import {
  ExampleCard, PropertiesTableSet
} from '../../components/index';

import FacepileBasicExample from './examples/Facepile.Basic.Example';
let FacepileBasicExampleCode = require('./examples/Facepile.Basic.Example.tsx');

export default class FacepilePage extends React.Component<any, any> {
  public render() {
    return (
      <div className='FacepileExample'>
        <h1 className='ms-font-xxl'>Facepile</h1>
        <h2 className='ms-font-xl'>Examples</h2>
        <ExampleCard title='Facepile' code={ FacepileBasicExampleCode }>
          <FacepileBasicExample />
        </ExampleCard>
        <PropertiesTableSet componentName='Facepile' />
      </div>
    );
  }
}
