import * as React from 'react';
import {
  Link
} from '../../../index';
import {
  ExampleCard,
  PropertiesTableSet
} from '../../components/index';
import { items, farItems, textOnlyItems, iconOnlyItems } from './examples/data';

import { CommandBarBasicExample } from './examples/CommandBar.Basic.Example';
import { CommandBarFixedOverflowExample } from './examples/CommandBar.FixedOverflow.Example';
import { CommandBarRandomItemsExample } from './examples/CommandBar.RandomItems.Example';
import { CommandBarNonFocusableItemsExample } from './examples/CommandBar.NonFocusable.Example';

const CommandBarBasicExampleCode = require('./examples/CommandBar.Basic.Example.tsx');
const CommandBarFixedOverflowExampleCode = require('./examples/CommandBar.FixedOverflow.Example.tsx');
const CommandBarRandomItemsExampleCode = require('./examples/CommandBar.RandomItems.Example.tsx');
const CommandBarNoFocusableItemsExampleCode = require('./examples/CommandBar.NonFocusable.Example.tsx');

export class CommandBarPage extends React.Component<any, any> {
  public render() {
    let cmdBarParamsTextAndIcons: any = { items: items, farItems: farItems };
    let cmdBarParamsTextOnly: any = { items: textOnlyItems, farItems: farItems };
    let cmdBarParamsIconOnly: any = { items: iconOnlyItems, farItems: farItems };

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
        <ExampleCard title='CommandBar with search box and overflowing menu items with only text' code={ CommandBarBasicExampleCode }>
          <CommandBarBasicExample {... cmdBarParamsTextOnly} />
        </ExampleCard>
        <ExampleCard title='CommandBar with search box and overflowing menu items with only icons' code={ CommandBarBasicExampleCode }>
          <CommandBarBasicExample {... cmdBarParamsIconOnly} />
        </ExampleCard>
        <ExampleCard title='CommandBar with no search box and fixed overflow items' code={ CommandBarFixedOverflowExampleCode }>
          <CommandBarFixedOverflowExample />
        </ExampleCard>
        <ExampleCard title='CommandBar with no search box and dynamically updated items' code={ CommandBarRandomItemsExampleCode }>
          <CommandBarRandomItemsExample />
        </ExampleCard>
        <ExampleCard title='CommandBar with not focusable items' code={ CommandBarNoFocusableItemsExampleCode }>
          <CommandBarNonFocusableItemsExample />
        </ExampleCard>
        <PropertiesTableSet componentName='CommandBar' />
        <PropertiesTableSet componentName='ContextualMenu' renderOnly={ ['IContextualMenuItem'] } />
      </div>
    );
  }

}
