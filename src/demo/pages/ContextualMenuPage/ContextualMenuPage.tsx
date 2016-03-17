import * as React from 'react';
import {
  Link
} from '../../../components/index';
import {
  ExampleCard,
  PropertiesTable
} from '../../components/index';
import ContextualMenuProps from './ContextualMenuProps';

import ContextualMenuBasicExample from './examples/ContextualMenu.Basic.Example';
let ContextualMenuBasicExampleCode = require('./examples/ContextualMenu.Basic.Example.tsx');

import ContextualMenuDirectionalExample from './examples/ContextualMenu.Directional.Example';
let ContextualMenuDirectionalExampleCode = require('./examples/ContextualMenu.Directional.Example.tsx');

export default class ContextualMenuPage extends React.Component<any, any> {
  public render() {
    return (
      <div className='ms-ContextualMenuPage'>
        <h1 className='ms-font-xxl'>ContextualMenu</h1>
        <div><Link target='_blank' text='ContextualMenus' url='http://dev.office.com/fabric/components/contextualMenu' /> provide a menu for use in context menus and dropdowns.</div>

        <h2 className='ms-font-xl'>Examples</h2>

        <ExampleCard title='ContextualMenu' code= { ContextualMenuBasicExampleCode }>
          <ContextualMenuBasicExample />
        </ExampleCard>

        <ExampleCard title='ContextualMenu beak/direction test' code= { ContextualMenuDirectionalExampleCode }>
          <ContextualMenuDirectionalExample />
        </ExampleCard>

        <PropertiesTable properties={ ContextualMenuProps } />

      </div>
    );
  }
}
