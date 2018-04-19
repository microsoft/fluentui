import * as React from 'react';
import {
  ExampleCard,
  ComponentPage,
  IComponentDemoPageProps,
  PageMarkdown,
  PropertiesTableSet
} from '@uifabric/example-app-base';
import { SearchBoxFullSizeExample } from './examples/SearchBox.FullSize.Example';
import { SearchBoxUnderlinedExample } from './examples/SearchBox.Underlined.Example';
import { SearchBoxDisabledExample } from './examples/SearchBox.Disabled.Example';
import { SearchBoxSmallExample } from './examples/SearchBox.Small.Example';
import { ComponentStatus } from '../../demo/ComponentStatus/ComponentStatus';
import { SearchBoxStatus } from './SearchBox.checklist';

const SearchBoxFullSizeExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/SearchBox/examples/SearchBox.FullSize.Example.tsx') as string;
const SearchBoxUnderlinedExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/SearchBox/examples/SearchBox.Underlined.Example.tsx') as string;
const SearchBoxDisabledExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/SearchBox/examples/SearchBox.Disabled.Example.tsx') as string;
const SearchBoxSmallExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/SearchBox/examples/SearchBox.Small.Example.tsx') as string;

export class SearchBoxPage extends React.Component<IComponentDemoPageProps, {}> {
  public render(): JSX.Element {
    return (
      <ComponentPage
        title='SearchBox'
        componentName='SearchBoxExample'
        componentUrl='https://github.com/OfficeDev/office-ui-fabric-react/tree/master/packages/office-ui-fabric-react/src/components/SearchBox'
        exampleCards={
          <div>
            <ExampleCard
              title='Default SearchBox'
              code={ SearchBoxFullSizeExampleCode }
            >
              <SearchBoxFullSizeExample />
            </ExampleCard>
            <ExampleCard
              title='Underlined SearchBox'
              code={ SearchBoxUnderlinedExampleCode }
            >
              <SearchBoxUnderlinedExample />
            </ExampleCard>
            <ExampleCard
              title='Disabled SearchBoxes'
              code={ SearchBoxDisabledExampleCode }
            >
              <SearchBoxDisabledExample />
            </ExampleCard>
            <ExampleCard
              title='SearchBox with fixed width and custom event handling'
              code={ SearchBoxSmallExampleCode }
            >
              <SearchBoxSmallExample />
            </ExampleCard>
          </div>
        }
        propertiesTables={
          <PropertiesTableSet
            sources={ [
              require<string>('!raw-loader!office-ui-fabric-react/src/components/SearchBox/SearchBox.types.ts')
            ] }
          />
        }
        overview={
          <PageMarkdown>
            { require<string>('!raw-loader!office-ui-fabric-react/src/components/SearchBox/docs/SearchBoxOverview.md') }
          </PageMarkdown>
        }
        bestPractices={
          <div />
        }
        dos={
          <PageMarkdown>
            { require<string>('!raw-loader!office-ui-fabric-react/src/components/SearchBox/docs/SearchBoxDos.md') }
          </PageMarkdown>
        }
        donts={
          <PageMarkdown>
            { require<string>('!raw-loader!office-ui-fabric-react/src/components/SearchBox/docs/SearchBoxDonts.md') }
          </PageMarkdown>
        }
        isHeaderVisible={ this.props.isHeaderVisible }
        componentStatus={
          <ComponentStatus
            { ...SearchBoxStatus }
          />
        }
      />
    );
  }
}
