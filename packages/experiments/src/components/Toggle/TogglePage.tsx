import * as React from 'react';
import { ExampleCard, IComponentDemoPageProps, ComponentPage, PageMarkdown, PropertiesTableSet } from '@uifabric/example-app-base';

import { ToggleExample } from './examples/Toggle.Example';
const ToggleExampleCode = require('!raw-loader!@uifabric/experiments/src/components/Toggle/examples/Toggle.Example.tsx') as string;

export class TogglePage extends React.Component<IComponentDemoPageProps, {}> {
  public render(): JSX.Element {
    return (
      <ComponentPage
        title=" Toggle"
        componentName=" Toggle"
        exampleCards={
          <div>
            <ExampleCard title=" Default Toggles" code={ToggleExampleCode}>
              <ToggleExample />
            </ExampleCard>
          </div>
        }
        propertiesTables={
          <PropertiesTableSet sources={[require<string>('!raw-loader!@uifabric/experiments/src/components/Toggle/Toggle.types.ts')]} />
        }
        overview={
          <PageMarkdown>{require<string>('!raw-loader!office-ui-fabric-react/src/components/Toggle/docs/ToggleOverview.md')}</PageMarkdown>
        }
        bestPractices={<div />}
        dos={<PageMarkdown>{require<string>('!raw-loader!office-ui-fabric-react/src/components/Toggle/docs/ToggleDos.md')}</PageMarkdown>}
        donts={
          <PageMarkdown>{require<string>('!raw-loader!office-ui-fabric-react/src/components/Toggle/docs/ToggleDonts.md')}</PageMarkdown>
        }
        isHeaderVisible={this.props.isHeaderVisible}
      />
    );
  }
}
