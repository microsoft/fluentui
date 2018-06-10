import * as React from 'react';
import {
  ExampleCard,
  ComponentPage,
  IComponentDemoPageProps,
  PageMarkdown,
  PropertiesTableSet
} from '@uifabric/example-app-base';
import { ProgressIndicatorBasicExample } from './examples/ProgressIndicator.Basic.Example';
import { ProgressIndicatorIndeterminateExample } from './examples/ProgressIndicator.Indeterminate.Example';
import { ComponentStatus } from '../../demo/ComponentStatus/ComponentStatus';
import { ProgressIndicatorStatus } from './ProgressIndicator.checklist';

const ProgressIndicatorBasicExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/ProgressIndicator/examples/ProgressIndicator.Basic.Example.tsx') as string;
const ProgressIndicatorIndeterminateExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/ProgressIndicator/examples/ProgressIndicator.Indeterminate.Example.tsx') as string;

export class ProgressIndicatorPage extends React.Component<IComponentDemoPageProps, {}> {
  public render(): JSX.Element {
    return (
      <ComponentPage
        title='ProgressIndicator'
        componentName='ProgressIndicatorExample'
        componentUrl='https://github.com/OfficeDev/office-ui-fabric-react/tree/master/packages/office-ui-fabric-react/src/components/ProgressIndicator'
        exampleCards={
          <div>
            <ExampleCard title='Default ProgressIndicator' code={ ProgressIndicatorBasicExampleCode }>
              <ProgressIndicatorBasicExample />
            </ExampleCard>
            <ExampleCard title='Indeterminate ProgressIndicator' code={ ProgressIndicatorIndeterminateExampleCode }>
              <ProgressIndicatorIndeterminateExample />
            </ExampleCard>
          </div>
        }
        propertiesTables={
          <PropertiesTableSet
            sources={ [
              require<string>('!raw-loader!office-ui-fabric-react/src/components/ProgressIndicator/ProgressIndicator.types.ts')
            ] }
          />
        }
        overview={
          <PageMarkdown>
            { require<string>('!raw-loader!office-ui-fabric-react/src/components/ProgressIndicator/docs/ProgressIndicatorOverview.md') }
          </PageMarkdown>
        }
        bestPractices={
          <div />
        }
        dos={
          <PageMarkdown>
            { require<string>('!raw-loader!office-ui-fabric-react/src/components/ProgressIndicator/docs/ProgressIndicatorDos.md') }
          </PageMarkdown>
        }
        donts={
          <PageMarkdown>
            { require<string>('!raw-loader!office-ui-fabric-react/src/components/ProgressIndicator/docs/ProgressIndicatorDonts.md') }
          </PageMarkdown>
        }
        isHeaderVisible={ this.props.isHeaderVisible }
        componentStatus={
          <ComponentStatus
            { ...ProgressIndicatorStatus }
          />
        }
      />
    );
  }
}
