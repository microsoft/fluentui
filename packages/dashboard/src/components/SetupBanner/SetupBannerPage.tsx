import * as React from 'react';
import { ExampleCard, IComponentDemoPageProps, ComponentPage, PropertiesTableSet } from '@uifabric/example-app-base';
import { SetupBannerBasicExample } from './examples/SetupBanner.Basic.Example';
const SetupBannerBasicExampleCode = require('!raw-loader!@uifabric/dashboard/src/components/SetupBanner/examples/SetupBanner.Basic.Example.tsx') as string;

export class SetupBannerPage extends React.Component<IComponentDemoPageProps, {}> {
  public render(): JSX.Element {
    return (
      <ComponentPage
        title="SetupBanner"
        componentName="SetupBanner"
        exampleCards={
          <div>
            <ExampleCard title="Basic Setup Banner" code={SetupBannerBasicExampleCode}>
              <SetupBannerBasicExample />
            </ExampleCard>
          </div>
        }
        propertiesTables={
          <PropertiesTableSet
            sources={[require<string>('!raw-loader!@uifabric/dashboard/src/components/SetupBanner/SetupBanner.types.ts')]}
          />
        }
        overview={
          <div>
            <p>The setup banner control allows you to display a banner to the user to complete setup.</p>
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
        isHeaderVisible={this.props.isHeaderVisible}
      />
    );
  }
}
