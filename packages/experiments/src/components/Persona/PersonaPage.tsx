import * as React from 'react';
import { ExampleCard, IComponentDemoPageProps, ComponentPage, PropertiesTableSet } from '@uifabric/example-app-base';

import { PersonaExample } from './examples/Persona.Example';
import { VerticalPersonaExample } from './examples/VerticalPersona.Example';

const PersonaExampleCode = require('!raw-loader!@uifabric/experiments/src/components/Persona/examples/Persona.Example.tsx') as string;
const VerticalPersonaExampleCode = require('!raw-loader!@uifabric/experiments/src/components/Persona/examples/VerticalPersona.Example.tsx') as string;

export const PersonaPage = (props: IComponentDemoPageProps) => {
  return (
    <ComponentPage
      title=" Persona"
      componentName=" Persona"
      exampleCards={
        <div>
          <ExampleCard title="Persona basic usage" code={PersonaExampleCode}>
            <PersonaExample />
          </ExampleCard>

          <ExampleCard title="VerticalPersona basic usage" code={VerticalPersonaExampleCode}>
            <VerticalPersonaExample />
          </ExampleCard>
        </div>
      }
      propertiesTables={
        <PropertiesTableSet
          sources={[
            require<string>('!raw-loader!@uifabric/experiments/src/components/Persona/Persona.types.ts')
            // require<string>('!raw-loader!@uifabric/experiments/src/components/Persona/Vertical/VerticalPersona.types.ts')
          ]}
        />
      }
      overview={
        <div>
          <p />
        </div>
      }
      bestPractices={<div />}
      dos={
        <div>
          <ul />
        </div>
      }
      donts={
        <div>
          <ul />
        </div>
      }
      isHeaderVisible={props.isHeaderVisible}
    />
  );
};
