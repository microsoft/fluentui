import * as React from 'react';
import {
  ExampleCard,
  IComponentDemoPageProps,
  ComponentPage,
  PageMarkdown,
  PropertiesTableSet
} from '@uifabric/example-app-base';
import { SpinnerBasicExample } from './examples/Spinner.Basic.Example';
import { ComponentStatus } from '../../demo/ComponentStatus/ComponentStatus';
import { SpinnerStatus } from './Spinner.checklist';

const SpinnerBasicExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Spinner/examples/Spinner.Basic.Example.tsx') as string;

export class SpinnerPage extends React.Component<IComponentDemoPageProps, {}> {
  public render(): JSX.Element {
    return (
      <ComponentPage
        title='Spinner'
        componentName='SpinnerExample'
        componentUrl='https://github.com/OfficeDev/office-ui-fabric-react/tree/master/packages/office-ui-fabric-react/src/components/Spinner'
        exampleCards={
          <ExampleCard
            title='Various Spinner Types'
            code={ SpinnerBasicExampleCode }
          >
            <SpinnerBasicExample />
          </ExampleCard>
        }
        propertiesTables={
          <PropertiesTableSet
            sources={ [
              require<string>('!raw-loader!office-ui-fabric-react/src/components/Spinner/Spinner.types.ts')
            ] }
          />
        }
        overview={
          <PageMarkdown>
            { require<string>('!raw-loader!office-ui-fabric-react/src/components/Spinner/docs/SpinnerOverview.md') }
          </PageMarkdown>
        }
        bestPractices={
          <div />
        }
        dos={
          <PageMarkdown>
            { require<string>('!raw-loader!office-ui-fabric-react/src/components/Spinner/docs/SpinnerDos.md') }
          </PageMarkdown>
        }
        donts={
          <PageMarkdown>
            { require<string>('!raw-loader!office-ui-fabric-react/src/components/Spinner/docs/SpinnerDonts.md') }
          </PageMarkdown>
        }
        isHeaderVisible={ this.props.isHeaderVisible }
        componentStatus={
          <ComponentStatus
            { ...SpinnerStatus }
          />
        }
      />
    );
  }
}
