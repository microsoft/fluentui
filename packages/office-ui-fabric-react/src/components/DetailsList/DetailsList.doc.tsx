import * as React from 'react';

import { IDocPageProps } from '../../common/DocPage.types';
import { DetailsListStatus } from './DetailsList.checklist';

import { DetailsListDocumentsExample } from './examples/DetailsList.Documents.Example';
import { Link } from '../Link';
const DetailsListDocumentsExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/DetailsList/examples/DetailsList.Documents.Example.tsx') as string;

export const DetailsListPageProps: IDocPageProps = {
  title: 'DetailsList',
  componentName: 'DetailsList',
  componentUrl:
    'https://github.com/OfficeDev/office-ui-fabric-react/tree/master/packages/office-ui-fabric-react/src/components/DetailsList',
  componentStatus: DetailsListStatus,
  examples: [
    {
      title: 'Document DetailsList with 500 items, sorting, filtering, marquee selection, justified columns',
      code: DetailsListDocumentsExampleCode,
      view: <DetailsListDocumentsExample />
    }
  ],
  related: (
    <div>
      <ul className="ComponentPage-variantsList">
        <li>
          <Link href="/#/components/detailslist/basic">Basic</Link>
        </li>
        <li>
          <Link href="/#/components/detailslist/compact">Compact</Link>
        </li>
        <li>
          <Link href="/#/components/detailslist/grouped">Grouped</Link>
        </li>
        <li>
          <Link href="/#/components/detailslist/customitemcolumns">Custom Item Columns</Link>
        </li>
        <li>
          <Link href="/#/components/detailslist/customitemrows">Custom Item Rows</Link>
        </li>
        <li>
          <Link href="/#/components/detailslist/customgroupheaders">Custom Group Headers</Link>
        </li>
        <li>
          <Link href="/#/components/detailslist/variablerowheights">Variable Row Heights</Link>
        </li>
        <li>
          <Link href="/#/components/detailslist/draganddrop">Drag &amp; Drop</Link>
        </li>
        <li>
          <Link href="/#/components/detailslist/innernavigation">Inner Navigation</Link>
        </li>
      </ul>
    </div>
  ),
  propertiesTablesSources: [
    require<string>('!raw-loader!office-ui-fabric-react/src/components/DetailsList/DetailsList.types.ts')
  ],
  overview: require<
    string
  >('!raw-loader!office-ui-fabric-react/src/components/DetailsList/docs/DetailsListOverview.md'),
  bestPractices: '',
  dos: require<string>('!raw-loader!office-ui-fabric-react/src/components/DetailsList/docs/DetailsListDos.md'),
  donts: require<string>('!raw-loader!office-ui-fabric-react/src/components/DetailsList/docs/DetailsListDonts.md'),
  isHeaderVisible: true
};
