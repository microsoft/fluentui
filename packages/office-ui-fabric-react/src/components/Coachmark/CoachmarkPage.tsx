import * as React from 'react';
import {
  ExampleCard,
  IComponentDemoPageProps,
  ComponentPage,
  PropertiesTableSet,
  PageMarkdown,
} from '@uifabric/example-app-base';

import { CoachmarkBasicExample } from './examples/Coachmark.Basic.Example';
const CoachmarkBasicExampleCode =
  require('!raw-loader!office-ui-fabric-react/src/components/Coachmark/examples/Coachmark.Basic.Example.tsx') as string;

export class CoachmarkPage extends React.Component<IComponentDemoPageProps, {}> {
  public render(): JSX.Element {
    return (
      <ComponentPage
        title='Coachmark'
        componentName='Coachmark'
        componentUrl='https://github.com/OfficeDev/office-ui-fabric-react/tree/master/packages/office-ui-fabric-react/src/components/Coachmark'
        exampleCards={
          <div>
            <ExampleCard title='Coachmark Basic' isOptIn={ true } code={ CoachmarkBasicExampleCode }>
              <CoachmarkBasicExample />
            </ExampleCard>
          </div>
        }
        propertiesTables={
          <PropertiesTableSet
            sources={ [
              require<string>('!raw-loader!office-ui-fabric-react/src/components/Coachmark/Coachmark.types.ts')
            ] }
          />
        }
        overview={
          <PageMarkdown>
            { require<string>('!raw-loader!office-ui-fabric-react/src/components/Coachmark/docs/CoachmarkOverview.md') }
          </PageMarkdown>
        }
        bestPractices={
          <div />
        }
        dos={
          <PageMarkdown>
            { require<string>('!raw-loader!office-ui-fabric-react/src/components/Coachmark/docs/CoachmarkDos.md') }
          </PageMarkdown>
        }
        donts={
          <PageMarkdown>
            { require<string>('!raw-loader!office-ui-fabric-react/src/components/Coachmark/docs/CoachmarkDonts.md') }
          </PageMarkdown>
        }
        isHeaderVisible={ this.props.isHeaderVisible }
      />
    );
  }
}