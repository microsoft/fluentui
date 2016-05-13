import * as React from 'react';
import {
  Link
} from '../../../index';
import {
  ExampleCard,
  PropertiesTableSet
} from '../../components/index';

import SearchBoxSmallExample from './examples/SearchBox.Small.Example';
let SearchBoxSmallExampleCode = require('./examples/SearchBox.Small.Example.tsx');

import SearchBoxFullSizeExample from './examples/SearchBox.FullSize.Example';
let SearchBoxFullSizeExampleCode = require('./examples/SearchBox.FullSize.Example.tsx');

export default class SearchBoxPage extends React.Component<any, any> {
  public render() {
    return (
      <div>
        <h1 className='ms-font-xxl'>SearchBox</h1>
        <div>
          <Link target='_blank' href='http://dev.office.com/fabric/components/SearchBox'>SearchBoxes</Link>
          <span> provide a box for searching, complete with auto complete callbacks and suggestions.</span>
        </div>
        <h2 className='ms-font-xl'>Examples</h2>
        <ExampleCard title='SearchBox' code={ SearchBoxSmallExampleCode }>
          <SearchBoxSmallExample />
        </ExampleCard>
        <ExampleCard title='SearchBox - No Parent Container' code={ SearchBoxFullSizeExampleCode }>
          <SearchBoxFullSizeExample />
        </ExampleCard>
        <PropertiesTableSet componentName='SearchBox' />
      </div>
    );
  }

}
