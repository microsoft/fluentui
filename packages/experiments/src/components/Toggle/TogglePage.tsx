import * as React from 'react';
import { ExampleCard, IComponentDemoPageProps, ComponentPage, Markdown, PropertiesTableSet } from '@uifabric/example-app-base';

import { ToggleExample } from './examples/Toggle.Example';
const ToggleExampleCode = require('!raw-loader!@uifabric/experiments/src/components/Toggle/examples/Toggle.Example.tsx') as string;

import { ToggleTokensObjectExample } from './examples/Toggle.Tokens.Object.Example';
const ToggleTokensObjectExampleCode = require('!raw-loader!@uifabric/experiments/src/components/Toggle/examples/Toggle.Tokens.Object.Example.tsx') as string;

import { ToggleTokensFunctionExample } from './examples/Toggle.Tokens.Function.Example';
const ToggleTokensFunctionExampleCode = require('!raw-loader!@uifabric/experiments/src/components/Toggle/examples/Toggle.Tokens.Function.Example.tsx') as string;

export class TogglePage extends React.Component<IComponentDemoPageProps, {}> {
  public render(): JSX.Element {
    return (
      <ComponentPage
        title=" Toggle"
        componentName=" Toggle"
        exampleCards={
          <div>
            <ExampleCard title="Default Toggles" code={ToggleExampleCode}>
              <ToggleExample />
            </ExampleCard>
            <ExampleCard title="Toggle components with token objects" code={ToggleTokensObjectExampleCode}>
              <ToggleTokensObjectExample />
            </ExampleCard>
            <ExampleCard title="Toggle components with token functions" code={ToggleTokensFunctionExampleCode}>
              <ToggleTokensFunctionExample />
            </ExampleCard>
          </div>
        }
        propertiesTables={
          <PropertiesTableSet sources={[require<string>('!raw-loader!@uifabric/experiments/src/components/Toggle/Toggle.types.ts')]} />
        }
        overview={<Markdown>{require<string>('!raw-loader!office-ui-fabric-react/src/components/Toggle/docs/ToggleOverview.md')}</Markdown>}
        bestPractices={<div />}
        dos={<Markdown>{require<string>('!raw-loader!office-ui-fabric-react/src/components/Toggle/docs/ToggleDos.md')}</Markdown>}
        donts={<Markdown>{require<string>('!raw-loader!office-ui-fabric-react/src/components/Toggle/docs/ToggleDonts.md')}</Markdown>}
        isHeaderVisible={this.props.isHeaderVisible}
      />
    );
  }
}
