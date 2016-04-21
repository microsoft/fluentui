import * as React from 'react';
import {
  ExampleCard,
  PropertiesTableSet
} from '../../components/index';

import DocumentCardBasicExample from './examples/DocumentCard.Basic.Example';
let DocumentCardBasicExampleCode = require('./examples/DocumentCard.Basic.Example.tsx');

import DocumentCardCompleteExample from './examples/DocumentCard.Complete.Example';
let DocumentCardCompleteExampleCode = require('./examples/DocumentCard.Complete.Example.tsx');

export default class DocumentCardPage extends React.Component<any, any> {
  public render() {
    return (
      <div>
        <h1 className='ms-font-xxl'>DocumentCard</h1>
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
