import * as React from 'react';
import {
  Link
} from '../../../index';
import {
  ExampleCard,
  PropertiesTableSet
} from '../../components/index';

import { PivotBasicExample } from './examples/Pivot.Basic.Example';
import { PivotVariationsExample } from './examples/Pivot.Variations.Example';
import { PivotCustomExample } from './examples/Pivot.Custom.Example';

const PivotBasicExampleCode = require('./examples/Pivot.Basic.Example.tsx');
const PivotVariationsExampleCode = require('./examples/Pivot.Variations.Example.tsx');
const PivotCustomExampleCode = require('./examples/Pivot.Custom.Example.tsx');

export class PivotPage extends React.Component<any, any> {
  public render() {
    return (
      <div className='PivotPageExample'>
        <h1 className='ms-font-xxl'>Pivot</h1>
        <div>
          <Link target='_blank' href='http://dev.office.com/fabric/components/Pivot'>Pivots</Link>
          <span> are used for rendering selectable section links.</span>
        </div>
        <h2 className='ms-font-xl'>Examples</h2>

        <ExampleCard title='Basic example' code={ PivotBasicExampleCode }>
          <PivotBasicExample />
        </ExampleCard>
        <ExampleCard title='Pivot variations' code={ PivotVariationsExampleCode }>
          <PivotVariationsExample />
        </ExampleCard>
        <ExampleCard title='Custom tab rendering' code={ PivotCustomExampleCode }>
          <PivotCustomExample />
        </ExampleCard>

        <PropertiesTableSet componentName='Pivot' />
        <PropertiesTableSet componentPath='components/Pivot/' componentName='PivotItem' />
      </div>
    );
  }
}
