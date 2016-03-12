import * as React from 'react';
import {
  Link
} from '../../../components/index';
import {
  ExampleCard,
  PropertiesTable
} from '../../components/index';
import SearchBoxProps from './SearchBoxProps';

import SearchBoxBasicExample from './examples/SearchBox.Basic.Example';
let SearchBoxBasicExampleCode = require('./examples/SearchBox.Basic.Example.tsx');

export default class SearchBoxPage extends React.Component<any, any> {
  public render() {
    return (
      <div>
        <h1 className='ms-font-xxl'>SearchBox</h1>
        <div><Link target='_blank' text='SearchBoxes' url='http://dev.office.com/fabric/components/SearchBox' /> provide a box for searching, complete with auto complete callbacks and suggestions.</div>
        <h2 className='ms-font-xl'>Examples</h2>
        <ExampleCard title='SearchBox' code={ SearchBoxBasicExampleCode }>
          <SearchBoxBasicExample />
        </ExampleCard>
        <PropertiesTable properties={ SearchBoxProps } />
      </div>
    );
  }

}
