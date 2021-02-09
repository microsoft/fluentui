import * as React from 'react';
import {
  ExampleCard,
  IComponentDemoPageProps,
  ComponentPage,
  Markdown,
  PropertiesTableSet,
} from '@fluentui/react-docsite-components';

import { ToggleExample } from './Toggle.Example';
const ToggleExampleCode = require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-experiments/Toggle/Toggle.Example.tsx') as string;

import { ToggleTokensObjectExample } from './Toggle.Tokens.Object.Example';
const ToggleTokensObjectExampleCode = require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-experiments/Toggle/Toggle.Tokens.Object.Example.tsx') as string;

import { ToggleTokensFunctionExample } from './Toggle.Tokens.Function.Example';
const ToggleTokensFunctionExampleCode = require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-experiments/Toggle/Toggle.Tokens.Function.Example.tsx') as string;

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
          <PropertiesTableSet
            sources={[
              require<
                string
              >('!raw-loader?esModule=false!@fluentui/react-experiments/src/components/Toggle/Toggle.types.ts'),
            ]}
          />
        }
        overview={
          <Markdown>
            {require<
              string
            >('!raw-loader?esModule=false!@fluentui/react-examples/src/react/Toggle/docs/ToggleOverview.md')}
          </Markdown>
        }
        bestPractices={
          <Markdown>
            {require<
              string
            >('!raw-loader?esModule=false!@fluentui/react-examples/src/react/Toggle/docs/ToggleBestPractices.md')}
          </Markdown>
        }
        isHeaderVisible={this.props.isHeaderVisible}
      />
    );
  }
}
