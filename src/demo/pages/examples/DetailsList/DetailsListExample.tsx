import * as React from 'react';
import { DetailsList } from '../../../../components/DetailsList/index';
import DetailsListLayoutMode from '../../../../components/DetailsList/DetailsListLayoutMode';
import { SelectionMode } from '../../../../utilities/selection/ISelection'
import Link from '../../../../components/Link/index';
import ExampleCard from '../../../components/ExampleCard/index';
import PropertiesTable from '../../../components/PropertiesTable/index';
import Dropdown from '../../../../components/Dropdown/index';
import './DetailsListExample.scss';

let DetailsListExampleLargetSet = require('./DetailsListExample.LargeSet.txt');

const LOREM_IPSUM = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum'.split(' ');

let _cachedData;

export default class DetailsListExample extends React.Component<any, any> {
  private _testData: any[];

  constructor() {
    super();

    this._onLayoutChanged = this._onLayoutChanged.bind(this);
    this._onSelectionChanged = this._onSelectionChanged.bind(this);

    this._testData = _cachedData = _cachedData || createListItems(20000);
    this.state = {
      example1LayoutMode: DetailsListLayoutMode.justified,
      example1SelectionMode: SelectionMode.multiple
    };
  }

  public render() {
    let { example1LayoutMode, example1SelectionMode } = this.state;

    return (
      <div className='DetailsListExample'>
        <h1 className='ms-font-xxl'>DetailsList</h1>
        <p>
          <Link target='_blank' text='DetailsList' url='http://dev.office.com/fabric/components/DetailsList' /> is a derivative of <Link text='List' url='#/examples/list' /> and provides a sortable, filterable, justified table for rendering large sets of items.
        </p>

        <PropertiesTable properties={ [] } />

        <h2 className='ms-font-xl'>Examples</h2>

        <ExampleCard title='DetailsList of 20000 items, variable row heights' isOptIn={ false } code={ DetailsListExampleLargetSet }>
          <div className='DetailsListExample-configPanel'>
            <Dropdown label='Layout mode' onChange={ this._onLayoutChanged } options={
              Object.keys(DetailsListLayoutMode)
                .filter(key => !isNaN(Number(key)))
                .map(propName => (
                  { key: propName, text: DetailsListLayoutMode[propName], isSelected: example1LayoutMode === Number(propName) }
                ))
            } />
            <Dropdown label='Selection mode' onChange={ this._onSelectionChanged } options={
              Object.keys(SelectionMode)
                .filter(key => !isNaN(Number(key)))
                .map(propName => (
                  { key: propName, text: SelectionMode[propName], isSelected: example1SelectionMode === Number(propName)  }
                ))
            } />
          </div>
          <DetailsList
            items={ this._testData }
            layoutMode={ example1LayoutMode }
            selectionMode={ example1SelectionMode }
          />
        </ExampleCard>

      </div>
    );
  }

  private _onLayoutChanged(option) {
    this.setState({
      example1LayoutMode: Number(option.key)
    });
  }

  private _onSelectionChanged(option) {
    this.setState({
      example1SelectionMode: Number(option.key)
    });
  }
}

function createListItems(count: number): any {
  return Array.apply(null, Array(count)).map((item, index) => ({
    key: 'item-' + index,
    name: lorem(2),
    description: lorem(10 + Math.round(Math.random() * 50))
  }));
}

function lorem(wordCount: number): string {
  return Array.apply(null, Array(wordCount))
    .map(item => LOREM_IPSUM[Math.floor(Math.random() * LOREM_IPSUM.length)])
    .join(' ')
}