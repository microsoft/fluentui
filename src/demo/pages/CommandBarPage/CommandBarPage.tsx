import * as React from 'react';
import {
  Link
} from '../../../index';
import {
  ExampleCard,
  PropertiesTableSet
} from '../../components/index';
import { items, farItems } from './examples/data';

import { CommandBarBasicExample } from './examples/CommandBar.Basic.Example';
import { CommandBarNonFocusableItemsExample } from './examples/CommandBar.NonFocusable.Example';

const CommandBarBasicExampleCode = require('./examples/CommandBar.Basic.Example.tsx');
const CommandBarNoFocusableItemsExampleCode = require('./examples/CommandBar.NonFocusable.Example.tsx');

export class CommandBarPage extends React.Component<any, any> {
  public render() {
    let cmdBarParamsTextAndIcons: any = { items: items, farItems: farItems };

    return (
      <div>
        <h1 className='ms-font-xxl'>CommandBar</h1>
        <div>
          <Link target='_blank' href='http://dev.office.com/fabric/components/commandBar'>CommandBars</Link>
          <span> provide a menu control to expose application commands. Command bars typically are rendered just below the header.</span>
        </div>
        <h2 className='ms-font-xl'>Examples</h2>
        <ExampleCard title='CommandBar with search box and overflowing menu items' code={ CommandBarBasicExampleCode }>
          <CommandBarBasicExample {... cmdBarParamsTextAndIcons} />
        </ExampleCard>
        <ExampleCard title='CommandBar with non-focusable items' code={ CommandBarNoFocusableItemsExampleCode }>
          <CommandBarNonFocusableItemsExample />
        </ExampleCard>
        <PropertiesTableSet componentName='CommandBar' />
        <PropertiesTableSet componentName='ContextualMenu' renderOnly={ ['IContextualMenuItem'] } />
      </div>
    );
  }

}
