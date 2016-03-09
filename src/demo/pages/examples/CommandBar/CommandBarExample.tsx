import * as React from 'react';
import Link from '../../../../components/Link/index';
import ExampleCard from '../../../components/ExampleCard/index';
import PropertiesTable from '../../../components/PropertiesTable/index';
import {CommandBarProps, ICommandBarItemProps } from './CommandBarProps';

import BasicCommandBarExample from './examples/Basic.Example';
let BasicCommandBarExampleCode = require('./examples/Basic.Example.tsx');

import FixedOverflowCommandBarExample from './examples/FixedOverflow.Example';
let FixedOverflowCommandBarExampleCode = require('./examples/FixedOverflow.Example.tsx');

import ChangingItemsCommandBarExample from './examples/ChangingItems.Example';
let ChangingItemsCommandBarExampleCode = require('./examples/ChangingItems.Example.tsx');

export default class CommandBarExample extends React.Component<any, any> {
  public render() {
    return (
      <div className='CommandBarExample'>
        <h1 className='ms-font-xxl'>CommandBar</h1>
        <div><Link target='_blank' text='CommandBars' url='http://dev.office.com/fabric/components/commandBar' /> provide a menu control to expose application commands. Command bars typically are rendered just below the header.</div>

        <h2 className='ms-font-xl'>Examples</h2>

        <ExampleCard title='CommandBar with search box and overflowing menu items' code={ BasicCommandBarExampleCode }>
          <BasicCommandBarExample />
        </ExampleCard>

        <ExampleCard title='CommandBar with no search box and fixed overflow items' code={ FixedOverflowCommandBarExampleCode }>
          <FixedOverflowCommandBarExample />
        </ExampleCard>

        <ExampleCard title='CommandBar with no search box and dynamically updated items' code={ ChangingItemsCommandBarExampleCode }>
          <ChangingItemsCommandBarExample />
        </ExampleCard>

        <PropertiesTable properties={ CommandBarProps } />

        <PropertiesTable title='ICommandBarItem Properties' properties={ ICommandBarItemProps } />

      </div>
    );
  }

}
