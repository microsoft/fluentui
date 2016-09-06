import * as React from 'react';
import {
  Link
} from '../../../index';
import {
  ExampleCard,
  PropertiesTableSet,
  ComponentPage
} from '../../components/index';

import { PersonaInitialsExample } from './examples/Persona.Initials.Example';
import { PersonaBasicExample } from './examples/Persona.Basic.Example';
import { getPageRouteFromState } from '../../utilities/pageroute';
import { AppState } from '../../components/app/AppState';

const PersonaInitialsExampleCode = require('./examples/Persona.Initials.Example.tsx');
const PersonaBasicExampleCode = require('./examples/Persona.Basic.Example.tsx');

export class PersonaPage extends React.Component<any, any> {
  private _url: string;

  constructor() {
    super();
    this._url = getPageRouteFromState(AppState, 'Basic components', 'Persona');
  }

  public render() {
    return (
      <ComponentPage
        title='Persona'
        componentName='PersonaExample'
        exampleCards={
          [
            <ExampleCard title='Persona in various sizes' code={ PersonaBasicExampleCode }>
              <PersonaBasicExample />
            </ExampleCard>,
            <ExampleCard title='Persona in initials' code={ PersonaInitialsExampleCode }>
              <PersonaInitialsExample />
            </ExampleCard>
          ]
        }
        propertiesTables={
          [
            <PropertiesTableSet componentName='Persona' />
          ]
        }
        overview={
          <div>
            <Link target='_blank' href='http://dev.office.com/fabric/components/persona'>Personas</Link>
            <span> are used for rendering an individual's avatar and presence. They are used within the PersonaCard and PeoplePicker.</span>
          </div>
        }
        route={ this._url }>
      </ComponentPage>
    );
  }

}
