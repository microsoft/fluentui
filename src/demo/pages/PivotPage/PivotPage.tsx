import * as React from 'react';
import {
  Link
} from '../../../index';
import {
  ExampleCard,
  PropertiesTableSet
} from '../../components/index';

import { PivotBasicExample } from './examples/Pivot.Basic.Example';
import { PivotLargeExample } from './examples/Pivot.Large.Example';
import { PivotTabsExample } from './examples/Pivot.Tabs.Example';
import { PivotTabsLargeExample } from './examples/Pivot.TabsLarge.Example';
import { PivotFabricExample } from './examples/Pivot.Fabric.Example';
import { PivotOnChangeExample } from './examples/Pivot.OnChange.Example';

const PivotBasicExampleCode = require('./examples/Pivot.Basic.Example.tsx');
const PivotLargeExampleCode = require('./examples/Pivot.Large.Example.tsx');
const PivotTabsExampleCode = require('./examples/Pivot.Tabs.Example.tsx');
const PivotTabsLargesExampleCode = require('./examples/Pivot.TabsLarge.Example.tsx');
const PivotFabricExampleCode = require('./examples/Pivot.Fabric.Example.tsx');
const PivotOnChangeExampleCode = require('./examples/Pivot.OnChange.Example.tsx');

export class PivotPage extends React.Component<any, any> {
  public render() {
    return (
      <div className='PivotPageExample'>
        <h1 className='ms-font-xxl'>Pivot</h1>
        <div>
          <Link target='_blank' href='http://dev.office.com/fabric/components/Pivot'>Pivots</Link>
          <span> are used for grouping components under a set of Links or Tabs</span>
        </div>
        <h2 className='ms-font-xl'>Examples</h2>
        <ExampleCard title='Pivot' code={ PivotBasicExampleCode }>
          <PivotBasicExample />
        </ExampleCard>
        <ExampleCard title='Pivot - Large' code={ PivotLargeExampleCode }>
          <PivotLargeExample />
        </ExampleCard>
        <ExampleCard title='Pivot - Tabs' code={ PivotTabsExampleCode }>
          <PivotTabsExample />
        </ExampleCard>
        <ExampleCard title='Pivot - Tabs - Large' code={ PivotTabsLargesExampleCode }>
          <PivotTabsLargeExample />
        </ExampleCard>
        <ExampleCard title='Pivot - OnChange' code={ PivotOnChangeExampleCode }>
          <PivotOnChangeExample />
        </ExampleCard>
        <ExampleCard title='Pivot - Nested Componets' code={ PivotFabricExampleCode }>
          <PivotFabricExample />
        </ExampleCard>
        <PropertiesTableSet componentName='Pivot' />
      </div>
    );
  }
}
