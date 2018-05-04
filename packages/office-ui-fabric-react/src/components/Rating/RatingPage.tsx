import * as React from 'react';
import {
  ExampleCard,
  ComponentPage,
  IComponentDemoPageProps,
  PageMarkdown,
  PropertiesTableSet
} from '@uifabric/example-app-base';
import { RatingBasicExample } from './examples/Rating.Basic.Example';
import { RatingButtonControlledExample } from './examples/Rating.ButtonControlled.Example';
import { ComponentStatus } from '../../demo/ComponentStatus/ComponentStatus';
import { RatingStatus } from './Rating.checklist';

const RatingBasicExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Rating/examples/Rating.Basic.Example.tsx') as string;
const RatingButtonControlledExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Rating/examples/Rating.ButtonControlled.Example.tsx') as string;

export class RatingPage extends React.Component<IComponentDemoPageProps, {}> {
  public render(): JSX.Element {
    return (
      <ComponentPage
        title='Rating'
        componentName='RatingExample'
        componentUrl='https://github.com/OfficeDev/office-ui-fabric-react/tree/master/packages/office-ui-fabric-react/src/components/Rating'
        exampleCards={
          <div>
            <ExampleCard title='Rating' code={ RatingBasicExampleCode }>
              <RatingBasicExample />
            </ExampleCard>
            <ExampleCard title='Button Controlled Rating' code={ RatingButtonControlledExampleCode }>
              <RatingButtonControlledExample />
            </ExampleCard>
          </div>
        }
        propertiesTables={
          <PropertiesTableSet
            sources={ [
              require<string>('!raw-loader!office-ui-fabric-react/src/components/Rating/Rating.types.ts')
            ] }
          />
        }
        overview={
          <PageMarkdown>
            { require<string>('!raw-loader!office-ui-fabric-react/src/components/Rating/docs/RatingOverview.md') }
          </PageMarkdown>
        }
        bestPractices={
          <div />
        }
        dos={
          <PageMarkdown>
            { require<string>('!raw-loader!office-ui-fabric-react/src/components/Rating/docs/RatingDos.md') }
          </PageMarkdown>
        }
        donts={
          <PageMarkdown>
            { require<string>('!raw-loader!office-ui-fabric-react/src/components/Rating/docs/RatingDonts.md') }
          </PageMarkdown>
        }
        isHeaderVisible={ this.props.isHeaderVisible }
        componentStatus={
          <ComponentStatus
            { ...RatingStatus }
          />
        }
      />
    );
  }
}
