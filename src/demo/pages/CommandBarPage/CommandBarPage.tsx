import * as React from 'react';
import {
  Link
} from '../../../components/index';
import {
  ExampleCard,
  PropertiesTableSet
} from '../../components/index';

import CommandBarBasicExample from './examples/CommandBar.Basic.Example';
let CommandBarBasicExampleCode = require('./examples/CommandBar.Basic.Example.tsx');

import CommandBarFixedOverflowExample from './examples/CommandBar.FixedOverflow.Example';
let CommandBarFixedOverflowExampleCode = require('./examples/CommandBar.FixedOverflow.Example.tsx');

import CommandBarRandomItemsExample from './examples/CommandBar.RandomItems.Example';
let CommandBarRandomItemsExampleCode = require('./examples/CommandBar.RandomItems.Example.tsx');

export default class CommandBarPage extends React.Component<any, any> {
  public render() {
    return (
      <div>
        <h1 className='ms-font-xxl'>CommandBar</h1>
        <div>
          <Link target='_blank' href='http://dev.office.com/fabric/components/commandBar'>CommandBars</Link>
          <span> provide a menu control to expose application commands. Command bars typically are rendered just below the header.</span>
        </div>
        <h2 className='ms-font-xl'>Examples</h2>
        <ExampleCard title='CommandBar with search box and overflowing menu items' code={ CommandBarBasicExampleCode }>
          <CommandBarBasicExample />
        </ExampleCard>
        <ExampleCard title='CommandBar with no search box and fixed overflow items' code={ CommandBarFixedOverflowExampleCode }>
          <CommandBarFixedOverflowExample />
        </ExampleCard>
        <ExampleCard title='CommandBar with no search box and dynamically updated items' code={ CommandBarRandomItemsExampleCode }>
          <CommandBarRandomItemsExample />
        </ExampleCard>
        <PropertiesTableSet componentName='CommandBar' />
        <PropertiesTableSet componentName='ContextualMenu' renderOnly={ ['IContextualMenuItem'] } />
      </div>
    );
  }

}
