import * as React from 'react';
import {
  Link
} from '../../../index';
import {
  ExampleCard,
  PropertiesTable
} from '../../components/index';

import { PersonaCardBasicExample } from './examples/PersonaCard.Basic.Example';
const PersonaCardBasicExampleCode = require('./examples/PersonaCard.Basic.Example.tsx');

export class PersonaCardPage extends React.Component<any, any> {
  public render() {
    return (
      <div>
        <h1 className='ms-font-xxl'>PersonaCard</h1>
        <div>
          <Link target='_blank' href='http://dev.office.com/fabric/components/PersonaCard'>PersonaCards</Link>
          <span> render a details for an individual.</span>
        </div>
        <h2 className='ms-font-xl'>Examples</h2>
        <ExampleCard title='PersonaCard' code={ PersonaCardBasicExampleCode }>
          <PersonaCardBasicExample />
        </ExampleCard>
        <PropertiesTable properties={ null } />
      </div>
    );
  }

}
