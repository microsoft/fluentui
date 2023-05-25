import * as React from 'react';
import {
  ExampleCard,
  IComponentDemoPageProps,
  ComponentPage,
  PropertiesTableSet,
} from '@fluentui/react-docsite-components';

import { PersonaExample } from './Persona.Example';
import { VerticalPersonaExample } from './VerticalPersona.Example';

const PersonaExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-experiments/Persona/Persona.Example.tsx') as string;
const VerticalPersonaExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-experiments/Persona/VerticalPersona.Example.tsx') as string;

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
            require<string>('!raw-loader?esModule=false!@fluentui/react-experiments/src/components/Persona/Persona.types.ts'),
            require<string>('!raw-loader?esModule=false!@fluentui/react-experiments/src/components/Persona/Vertical/VerticalPersona.types.ts'),
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
            This may replace the Persona component in a future major version. It'll aim to reduce the DOM impact and in
            addition support stuff like slots etc for the "horizontal" persona as well.
          </p>
        </div>
      }
      isHeaderVisible={props.isHeaderVisible}
    />
  );
};
