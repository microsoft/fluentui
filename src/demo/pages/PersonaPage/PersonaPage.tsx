import * as React from 'react';
import {
  ExampleCard,
  PropertiesTableSet,
  ComponentPage
} from '../../components/index';

import { PersonaInitialsExample } from './examples/Persona.Initials.Example';
import { PersonaBasicExample } from './examples/Persona.Basic.Example';
import { getPageRouteFromState } from '../../utilities/pageroute';
import { AppState } from '../../components/App/AppState';
import { IComponentDemoPageProps } from '../../components/ComponentPage/IComponentDemoPageProps';

const PersonaInitialsExampleCode = require('./examples/Persona.Initials.Example.tsx');
const PersonaBasicExampleCode = require('./examples/Persona.Basic.Example.tsx');

export class PersonaPage extends React.Component<IComponentDemoPageProps, any> {
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
          <div>
            <ExampleCard title='Persona in various sizes' code={ PersonaBasicExampleCode }>
              <PersonaBasicExample />
            </ExampleCard>
            <ExampleCard title='Persona in initials' code={ PersonaInitialsExampleCode }>
              <PersonaInitialsExample />
            </ExampleCard>
          </div>
        }
        propertiesTables={
          <PropertiesTableSet componentName='Persona' />
        }
        overview={
          <div>
            <p>
              Personas are used for rendering an individual's avatar and presence. They are used within the PeoplePicker components.
            </p>
          </div>
        }
        bestPractices={
          <div></div>
        }
        dos={
          <div>
            <ul>
              <li>Use XXS size Persona in text fields in read mode or in experiences such as multi-column list view which need compact Persona representations.</li>
              <li>Use XS size Persona in text fields in edit mode.</li>
              <li>Use XS, S and M size Personas in menus and list views.</li>
              <li>Use L and XXL size Personas in profile cards and views.</li>
            </ul>
          </div>
        }
        donts={
          <div>
            <ul>
              <li>Change the values of the color swatches in high contrast mode. </li>
            </ul>
          </div>
        }
        related={
          <a href='https://github.com/OfficeDev/office-ui-fabric-js/blob/master/ghdocs/components/Persona.md'>Fabric JS</a>
        }
        route={ this._url }
        isHeaderVisible={ this.props.isHeaderVisible }>
      </ComponentPage>
    );
  }

}
