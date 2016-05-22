import * as React from 'react';
import {
  ExampleCard,
  PropertiesTableSet
} from '../../components/index';

import { DocumentCardBasicExample } from './examples/DocumentCard.Basic.Example';
import { DocumentCardCompleteExample } from './examples/DocumentCard.Complete.Example';

const DocumentCardBasicExampleCode = require('./examples/DocumentCard.Basic.Example.tsx');
const DocumentCardCompleteExampleCode = require('./examples/DocumentCard.Complete.Example.tsx');

export class DocumentCardPage extends React.Component<any, any> {
  public render() {
    return (
      <div>
        <h1 className='ms-font-xxl'>DocumentCard</h1>
        <div>A card representation of a document. Can be configured with various card parts, including a preview, title, and location.</div>
        <h2 className='ms-font-xl'>Examples</h2>
        <ExampleCard title='DocumentCard Basic' code={ DocumentCardBasicExampleCode }>
          <DocumentCardBasicExample />
        </ExampleCard>
        <ExampleCard title='DocumentCard Complete' code={ DocumentCardCompleteExampleCode }>
          <DocumentCardCompleteExample />
        </ExampleCard>

        <PropertiesTableSet componentName='DocumentCard' />
      </div>
    );
  }

}
