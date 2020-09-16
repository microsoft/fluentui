import * as React from 'react';
import { ExampleCard, IComponentDemoPageProps, ComponentPage, PropertiesTableSet } from '@uifabric/example-app-base';

import { PersonaExample } from './examples/Persona.Example';
import { VerticalPersonaExample } from './examples/VerticalPersona.Example';

const PersonaExampleCode = require('!raw-loader!@fluentui/examples/src/experiments/Persona/examples/Persona.Example.tsx') as string;
const VerticalPersonaExampleCode = require('!raw-loader!@fluentui/examples/src/experiments/Persona/examples/VerticalPersona.Example.tsx') as string;

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
            require<string>('!raw-loader!@uifabric/experiments/src/components/Persona/Persona.types.ts'),
            require<
              string
            >('!raw-loader!@uifabric/experiments/src/components/Persona/Vertical/VerticalPersona.types.ts'),
          ]}
        />
      }
      overview={
        <div>
          <p>
            The Persona component in experiments is the next iteration of the one that is currently in fabric. Currently
            it supports rendering a vertical variation of the Persona component.
          </p>
          <p>
            On a somewhat longer term this should replace the Persona component in the next major version. It'll aim to
            reduce the DOM impact and in addition support stuff like slots etc for the "horizontal" persona as well.
          </p>
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
