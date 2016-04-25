import * as React from 'react';
import {
  Link
} from '../../../components/index';
import {
  ExampleCard,
  PropertiesTableSet
} from '../../components/index';

import PersonaInitialsExample from './examples/Persona.Initials.Example';
let PersonaInitialsExampleCode = require('./examples/Persona.Initials.Example.tsx');

import PersonaBasicExample from './examples/Persona.Basic.Example';
let PersonaBasicExampleCode = require('./examples/Persona.Basic.Example.tsx');

export default class PersonaPage extends React.Component<any, any> {
  public render() {
    return (
      <div>
        <h1 className='ms-font-xxl'>Persona</h1>
        <div>
          <Link target='_blank' href='http://dev.office.com/fabric/components/persona'>Personas</Link>
          <span> are used for rendering an individual's avatar and presence. They are used within the PersonaCard and PeoplePicker.</span>
        </div>
        <h2 className='ms-font-xl'>Examples</h2>
        <ExampleCard title='Persona in various sizes' code={ PersonaBasicExampleCode }>
          <PersonaBasicExample />
        </ExampleCard>
        <ExampleCard title='Persona in initials' code={ PersonaInitialsExampleCode }>
          <PersonaInitialsExample />
        </ExampleCard>
        <PropertiesTableSet componentName='Persona' />
      </div>
    );
  }

}
