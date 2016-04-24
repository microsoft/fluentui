import * as React from 'react';
import {
  Link
} from '../../../components/index';
import {
  ExampleCard,
  PropertiesTableSet
} from '../../components/index';

import ListBasicExample from './examples/List.Basic.Example';
let ListBasicExampleCode = require('./examples/List.Basic.Example.tsx');

import ListMailExample from './examples/List.Mail.Example';
let ListMailExampleCode = require('./examples/List.Mail.Example.tsx');

export default class ListPage extends React.Component<any, any> {
  public render() {
    return (
      <div className='ListExample'>
        <h1 className='ms-font-xxl'>List</h1>
        <p>
          <Link target='_blank' href='http://dev.office.com/fabric/components/List'>List</Link>
          provides a base component for rendering large sets of items. It is agnostic of layout, the tile component used, and selection management. These concerns can be layered separately.
        </p>
        <p>
          <b>Performance is important, and DOM content is expensive. Therefore limit what you render.</b> Unlike a simple for loop that renders all items in a set, a List uses ui virtualization. It only renders a subset of items, and as you scroll around, the subset of rendered content is shifted to what you're looking at. This gives a much better experience for large sets, especially when the per-item components are complex/render intensive/network intensive.
        </p>
        <p>
          Lists break down the set of items passed in into pages. Only pages within a "materialized window" are actually rendered. As that window changes due to scroll events, pages that fall outside that window are removed, and their layout space is remembered and pushed into spacer elements. This gives the user the experience of browsing massive amounts of content but only using a small number of actual elements. This gives the browser much less layout to resolve, and gives React DOM diffing much less content to worry about.
        </p>
        <h2 className='ms-font-xl'>Examples</h2>
        <ExampleCard title='List with variable row heights' code={ ListBasicExampleCode }>
          <ListBasicExample />
        </ExampleCard>
        <ExampleCard title='Fixed list of 20000 email tiles' isOptIn={ true } code={ ListMailExampleCode }>
          <ListMailExample />
        </ExampleCard>
        <PropertiesTableSet componentName='List' />
      </div>
    );
  }
}
