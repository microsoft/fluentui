import * as React from 'react';
import Persona from '../../../../components/Persona/index';
import Link from '../../../../components/Link/index';
import ExampleCard from '../../../components/ExampleCard/index';
import PropertiesTable from '../../../components/PropertiesTable/index';
import List from '../../../../components/List/index';

import { PersonaProps } from './PersonaProps';
import BasicExample from './examples/Basic.Example';
let BasicExampleCode = require('./examples/Basic.Example.tsx');

export default class PersonaExample extends React.Component<any, any> {
  public render() {
    return (
      <div className='PersonaExample'>
        <h1 className='ms-font-xxl'>Persona</h1>
        <div><Link target='_blank' text='Personas' url='http://dev.office.com/fabric/components/persona' /> are to render a thumbnail for an individual.</div>

        <h2 className='ms-font-xl'>Examples</h2>

        <ExampleCard title='Persona in various sizes' code={ BasicExampleCode }>
          <BasicExample />
        </ExampleCard>

        <PropertiesTable properties={ PersonaProps } />
      </div>
    );
  }

}
