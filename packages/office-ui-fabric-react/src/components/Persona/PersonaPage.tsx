import * as React from 'react';
import {
  ExampleCard,
  ComponentPage,
  IComponentDemoPageProps,
  PageMarkdown,
  PropertiesTableSet
} from '@uifabric/example-app-base';
import { PersonaInitialsExample } from './examples/Persona.Initials.Example';
import { PersonaBasicExample } from './examples/Persona.Basic.Example';
import { PersonaAlternateExample } from './examples/Persona.Alternate.Example';
import { PersonaCustomRenderExample } from './examples/Persona.CustomRender.Example';
import { PersonaCustomCoinRenderExample } from './examples/Persona.CustomCoinRender.Example';
import { ComponentStatus } from '../../demo/ComponentStatus/ComponentStatus';
import { PersonaStatus } from './Persona.checklist';

const PersonaInitialsExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Persona/examples/Persona.Initials.Example.tsx') as string;
const PersonaBasicExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Persona/examples/Persona.Basic.Example.tsx') as string;
const PersonaAlternateExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Persona/examples/Persona.Alternate.Example.tsx') as string;
const PersonaCustomRenderExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Persona/examples/Persona.CustomRender.Example.tsx') as string;
const PersonaCustomCoinRenderExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Persona/examples/Persona.CustomCoinRender.Example.tsx') as string;

export class PersonaPage extends React.Component<IComponentDemoPageProps, {}> {
  public render(): JSX.Element {
    return (
      <ComponentPage
        title='Persona'
        componentName='PersonaExample'
        componentUrl='https://github.com/OfficeDev/office-ui-fabric-react/tree/master/packages/office-ui-fabric-react/src/components/Persona'
        exampleCards={
          <div>
            <ExampleCard title='Persona in various sizes' code={ PersonaBasicExampleCode }>
              <PersonaBasicExample />
            </ExampleCard>
            <ExampleCard title='Alternative small personas' code={ PersonaAlternateExampleCode }>
              <PersonaAlternateExample />
            </ExampleCard>
            <ExampleCard title='Persona with initials' code={ PersonaInitialsExampleCode }>
              <PersonaInitialsExample />
            </ExampleCard>
            <ExampleCard title='Rendering custom persona text' code={ PersonaCustomRenderExampleCode }>
              <PersonaCustomRenderExample />
            </ExampleCard>
            <ExampleCard title='Rendering custom coin' code={ PersonaCustomCoinRenderExampleCode }>
              <PersonaCustomCoinRenderExample />
            </ExampleCard>
          </div>
        }
        allowNativeProps={ true }
        propertiesTables={
          <PropertiesTableSet
            sources={ [
              require<string>('!raw-loader!office-ui-fabric-react/src/components/Persona/Persona.types.ts')
            ] }
          />
        }
        overview={
          <PageMarkdown>
            { require<string>('!raw-loader!office-ui-fabric-react/src/components/Persona/docs/PersonaOverview.md') }
          </PageMarkdown>
        }
        bestPractices={
          <div />
        }
        dos={
          <PageMarkdown>
            { require<string>('!raw-loader!office-ui-fabric-react/src/components/Persona/docs/PersonaDos.md') }
          </PageMarkdown>
        }
        donts={
          <PageMarkdown>
            { require<string>('!raw-loader!office-ui-fabric-react/src/components/Persona/docs/PersonaDonts.md') }
          </PageMarkdown>
        }
        isHeaderVisible={ this.props.isHeaderVisible }
        componentStatus={
          <ComponentStatus
            { ...PersonaStatus }
          />
        }
      />
    );
  }
}
