import * as React from 'react';
import {
  ExampleCard,
  ComponentPage,
  IComponentDemoPageProps,
  PropertiesTableSet
} from '@uifabric/example-app-base';
import { PersonaInitialsExample } from './examples/Persona.Initials.Example';
import { PersonaBasicExample } from './examples/Persona.Basic.Example';
import { PersonaAlternateExample } from './examples/Persona.Alternate.Example';
import { PersonaCustomRenderExample } from './examples/Persona.CustomRender.Example';
import { ComponentStatus } from '../../demo/ComponentStatus/ComponentStatus';
import { PersonaStatus } from './Persona.checklist';

const PersonaInitialsExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Persona/examples/Persona.Initials.Example.tsx') as string;
const PersonaBasicExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Persona/examples/Persona.Basic.Example.tsx') as string;
const PersonaAlternateExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Persona/examples/Persona.Alternate.Example.tsx') as string;
const PersonaCustomRenderExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Persona/examples/Persona.CustomRender.Example.tsx') as string;

export class PersonaPage extends React.Component<IComponentDemoPageProps, {}> {
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
            <ExampleCard title='Alternative small personas' code={ PersonaAlternateExampleCode }>
              <PersonaAlternateExample />
            </ExampleCard>
            <ExampleCard title='Persona in initials' code={ PersonaInitialsExampleCode }>
              <PersonaInitialsExample />
            </ExampleCard>
            <ExampleCard title='Rendering custom persona text' code={ PersonaCustomRenderExampleCode }>
              <PersonaCustomRenderExample />
            </ExampleCard>
          </div>
        }
        propertiesTables={
          <PropertiesTableSet
            sources={ [
              require<string>('!raw-loader!office-ui-fabric-react/src/components/Persona/Persona.Props.ts')
            ] }
          />
        }
        overview={
          <div>
            <p>
              Personas are used for rendering an individual's avatar and presence. They are used within the PeoplePicker components.
            </p>
          </div>
        }
        bestPractices={
          <div />
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
        isHeaderVisible={ this.props.isHeaderVisible }
        componentStatus={
          <ComponentStatus
            {...PersonaStatus}
          />
        }
      />
    );
  }
}
