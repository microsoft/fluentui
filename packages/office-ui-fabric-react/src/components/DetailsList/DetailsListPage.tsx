import * as React from 'react';
import {
  ExampleCard,
  IComponentDemoPageProps,
  ComponentPage,
  PageMarkdown,
  PropertiesTableSet
} from '@uifabric/example-app-base';
import { ComponentStatus } from '../../demo/ComponentStatus/ComponentStatus';
import { DetailsListStatus } from './DetailsList.checklist';

export class DetailsListPage extends React.Component<IComponentDemoPageProps, {}> {
  public render(): JSX.Element {
    return (
      <ComponentPage
        title='DetailsList'
        componentName='DetailsListExample'
        componentUrl='https://github.com/OfficeDev/office-ui-fabric-react/tree/master/packages/office-ui-fabric-react/src/components/DetailsList'
        exampleCards={
          <div>
            <ExampleCard id='default' title='Document DetailsList with 500 items, sorting, filtering, marquee selection, justified columns' isOptIn={ true } code={ DetailsListDocumentsExampleCode }>
              <DetailsListDocumentsExample />
            </ExampleCard>
          </div>
        }
        propertiesTables={
          <PropertiesTableSet
            sources={ [
              require<string>('!raw-loader!office-ui-fabric-react/src/components/DetailsList/DetailsList.types.ts')
            ] }
          />
        }
        overview={
          <PageMarkdown>
            { require<string>('!raw-loader!office-ui-fabric-react/src/components/DetailsList/docs/DetailsListOverview.md') }
          </PageMarkdown>
        }
        bestPractices={
          <div />
        }
        dos={
          <PageMarkdown>
            { require<string>('!raw-loader!office-ui-fabric-react/src/components/DetailsList/docs/DetailsListDos.md') }
          </PageMarkdown>
        }
        donts={
          <PageMarkdown>
            { require<string>('!raw-loader!office-ui-fabric-react/src/components/DetailsList/docs/DetailsListDonts.md') }
          </PageMarkdown>
        }
        isHeaderVisible={ this.props.isHeaderVisible }
        componentStatus={
          <ComponentStatus
            { ...DetailsListStatus }
          />
        }
      />
    );
  }
}
