import * as React from 'react';
import {
  ExampleCard,
  PropertiesTableSet
} from '../../components/index';

import { GroupedListBasicExample } from './examples/GroupedList.Basic.Example';
import { GroupedListCustomExample } from './examples/GroupedList.Custom.Example';

const GroupedListBasicExampleCode = require('./examples/GroupedList.Basic.Example.tsx');
const GroupedListCustomExampleCode = require('./examples/GroupedList.Custom.Example.tsx');

export class GroupedListPage extends React.Component<any, any> {

  public render() {
    return (
      <div className='ms-GroupedListPage'>
        <h1 className='ms-font-xxl'>GroupedList</h1>

        <p>Allows you to render a set of items as multiple lists with various grouping properties.</p>

        <h2 className='ms-font-xl'>Examples</h2>
        <ExampleCard title='GroupedList basic example' isOptIn={ true } code={ GroupedListBasicExampleCode }>
          <GroupedListBasicExample />
        </ExampleCard>
        <ExampleCard title='GroupedList example with custom header and footer' isOptIn={ true } code={ GroupedListCustomExampleCode }>
          <GroupedListCustomExample />
        </ExampleCard>
        <PropertiesTableSet componentName='GroupedList' />
      </div>
    );
  }

}
