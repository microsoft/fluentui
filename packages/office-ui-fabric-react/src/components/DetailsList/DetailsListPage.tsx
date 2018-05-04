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

import { DetailsListDocumentsExample } from './examples/DetailsList.Documents.Example';
import { Link } from '../..';
const DetailsListDocumentsExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/DetailsList/examples/DetailsList.Documents.Example.tsx') as string;

export class DetailsListPage extends React.Component<IComponentDemoPageProps, {}> {
  public render(): JSX.Element {
    return (
      <ComponentPage
        title='DetailsList'
        componentName='DetailsListExample'
        componentUrl='https://github.com/OfficeDev/office-ui-fabric-react/tree/master/packages/office-ui-fabric-react/src/components/DetailsList'
        exampleCards={
          <div>
            <ExampleCard title='Document DetailsList with 500 items, sorting, filtering, marquee selection, justified columns' isOptIn={ true } code={ DetailsListDocumentsExampleCode }>
              <DetailsListDocumentsExample />
            </ExampleCard>
            <h3>Additional Variants</h3>
            <ul className='ComponentPage-variantsList'>
              <li><Link href='/#/components/detailslist/basic'>Basic</Link></li>
              <li><Link href='/#/components/detailslist/compact'>Compact</Link></li>
              <li><Link href='/#/components/detailslist/grouped'>Grouped</Link></li>
              <li><Link href='/#/components/detailslist/customitemcolumns'>Custom Item Columns</Link></li>
              <li><Link href='/#/components/detailslist/customitemrows'>Custom Item Rows</Link></li>
              <li><Link href='/#/components/detailslist/customgroupheaders'>Custom Group Headers</Link></li>
              <li><Link href='/#/components/detailslist/variablerowheights'>Variable Row Heights</Link></li>
              <li><Link href='/#/components/detailslist/draganddrop'>Drag &amp; Drop</Link></li>
              <li><Link href='/#/components/detailslist/innernavigation'>Inner Navigation</Link></li>
            </ul>
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