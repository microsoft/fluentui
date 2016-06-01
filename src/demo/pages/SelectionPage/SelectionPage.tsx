import * as React from 'react';
import { ExampleCard } from '../../components/index';

import { SelectionBasicExample } from './examples/Selection.Basic.Example';

const SelectionBasicExampleCode = require('./examples/Selection.Basic.Example.tsx');

export class SelectionPage extends React.Component<any, any> {

  public render() {
    return (
      <div className='ms-SelectionPage'>
        <h1 className='ms-font-xxl'>Selection</h1>
        <p>
          Selection is a store that maintains the selection state of items in an efficient way. It exposes methods for accessing the selection state given an item index. If the items change, it can resolve the selection if items move in the array.
        </p>
        <p>
          SelectionZone is a React component that handles selection change events. It can help abstract range selection, unselecting/selecting items based on selection modes, and handling common keystrokes like ctrl-A for select all and escape to clear selection.
        </p>
        <h2 className='ms-font-xl'>Examples</h2>
        <ExampleCard title='Basic Selection Example' code={ SelectionBasicExampleCode }>
          <SelectionBasicExample />
        </ExampleCard>
      </div>
    );
  }

}