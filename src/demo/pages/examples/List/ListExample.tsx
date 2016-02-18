import * as React from 'react';
import List from '../../../../components/List/index';
import Link from '../../../../components/Link/index';
import ExampleCard from '../../../components/ExampleCard/index';
import PropertiesTable from '../../../components/PropertiesTable/index';
import './ListExample.scss';

const LOREM_IPSUM = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum'.split(' ');

let _cachedData;

export default class ListExample extends React.Component<any, any> {
  private _testData: any[];

  constructor() {
    super();

    this._testData = _cachedData = _cachedData || createListItems(20000);
  }

  public render() {
    return (
      <div className='ListExample'>
        <h1 className='ms-font-xxl'>List</h1>
        <p>
          <Link target='_blank' text='List' url='http://dev.office.com/fabric/components/List' /> provides a base component for rendering large sets of items. It is agnostic of layout, the tile component used, and selection management. These concerns can be layered separately.
        </p>
        <p>
          <b>Performance is important, and DOM content is expensive. Therefore limit what you render.</b> Unlike a simple for loop that renders all items in a set, a List uses ui virtualization. It only renders a subset of items, and as you scroll around, the subset of rendered content is shifted to what you're looking at. This gives a much better experience for large sets, especially when the per-item components are complex/render intensive/network intensive.
        </p>
        <p>
          Lists break down the set of items passed in into pages. Only pages within a "materialized window" are actually rendered. As that window changes due to scroll events, pages that fall outside that window are removed, and their layout space is remembered and pushed into spacer elements. This gives the user the experience of browsing massive amounts of content but only using a small number of actual elements. This gives the browser much less layout to resolve, and gives React DOM diffing much less content to worry about.
        </p>

        <PropertiesTable properties={ [] } />

        <h2 className='ms-font-xl'>Examples</h2>

        <ExampleCard title='List of 20000 items, variable row heights' isOptIn={ true }>
          <List
            items={ this._testData }
            onRenderCell={ (item, viewData) => (
              <div className='ListExample-itemCell'>
                <div className='ListExample-itemName ms-font-xl'>{ item.name }</div>
                <div className='ListExample-itemDesc ms-font-s'>{ item.description }</div>
              </div>
            ) }
          />
        </ExampleCard>

      </div>
    );
  }
}

function createListItems(count: number): any {
  let items = [];

  for (let i = 0; i < count; i++) {
    let wordCount = 10 + Math.round(Math.random() * 50);


    items.push({
      key: 'item-' + i,
      name: 'Item ' + i,
      description: Array.apply(null, Array(wordCount)).map(item => LOREM_IPSUM[Math.floor(Math.random() * LOREM_IPSUM.length)]).join(' ')
    });
  }

  return items;
}