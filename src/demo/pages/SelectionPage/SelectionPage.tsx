import * as React from 'react';
import {
  ExampleCard
} from '../../components/index';

import { SelectionBasicExample } from './examples/Selection.Basic.Example';

const SelectionBasicExampleCode = require('./examples/Selection.Basic.Example.tsx');

export class SelectionPage extends React.Component<any, any> {

  public render() {
    return (
      <div className='ms-SelectionPage'>
        <h1 className='ms-font-xxl'>Selection</h1>
        <p>
          Selection is used to track the selection state of a collection of selectable items.
        </p>
        <h2 className='ms-font-xl'>Examples</h2>
        <ExampleCard title='Basic Selection Example' code={ SelectionBasicExampleCode }>
          <SelectionBasicExample />
        </ExampleCard>
      </div>
    );
  }

}