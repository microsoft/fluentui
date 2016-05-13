import * as React from 'react';
import {
  Link
} from '../../../index';
import {
  ExampleCard,
  PropertiesTableSet
} from '../../components/index';

import PanelSmallRightExample from './examples/Panel.SmallRight.Example';
let PanelSmallRightExampleCode = require('./examples/Panel.SmallRight.Example.tsx');

import PanelSmallLeftExample from './examples/Panel.SmallLeft.Example';
let PanelSmallLeftExampleCode = require('./examples/Panel.SmallLeft.Example.tsx');

import PanelSmallFluidExample from './examples/Panel.SmallFluid.Example';
let PanelSmallFluidExampleCode = require('./examples/Panel.SmallFluid.Example.tsx');

import PanelMediumExample from './examples/Panel.Medium.Example';
let PanelMediumExampleCode = require('./examples/Panel.Medium.Example.tsx');

import PanelLargeExample from './examples/Panel.Large.Example';
let PanelLargeExampleCode = require('./examples/Panel.Large.Example.tsx');

import PanelLargeFixedExample from './examples/Panel.LargeFixed.Example';
let PanelLargeFixedExampleCode = require('./examples/Panel.LargeFixed.Example.tsx');

import PanelExtraLargeExample from './examples/Panel.ExtraLarge.Example';
let PanelExtraLargeExampleCode = require('./examples/Panel.ExtraLarge.Example.tsx');

import PanelLightDismissExample from './examples/Panel.LightDismiss.Example';
let PanelLightDismissExampleCode = require('./examples/Panel.LightDismiss.Example.tsx');

export default class PanelPage extends React.Component<any, any> {
  public render() {
    return (
      <div className='ms-PanelPage'>
        <h1 className='ms-font-xxl'>Panel</h1>
        <div>
          <Link target='_blank' href='http://dev.office.com/fabric/components/panel'>Panels</Link>
          <span> are used to render an org chart, and other components.</span>
        </div>
        <h2 className='ms-font-xl'>Examples</h2>

        <ExampleCard title='Panel - Small Panel, Anchored Right, Fixed Width' code={ PanelSmallRightExampleCode }>
          <PanelSmallRightExample />
        </ExampleCard>

        <ExampleCard title='Panel - Small Panel, Anchored Left, Fixed Width' code={ PanelSmallLeftExampleCode }>
          <PanelSmallLeftExample />
        </ExampleCard>

        <ExampleCard title='Panel - Small Panel, Full Screen, Fluid Width' code={ PanelSmallFluidExampleCode }>
          <PanelSmallFluidExample />
        </ExampleCard>

        <ExampleCard title='Panel - Medium' code={ PanelMediumExampleCode }>
          <PanelMediumExample />
        </ExampleCard>

        <ExampleCard title='Panel - Large' code={ PanelLargeExampleCode }>
          <PanelLargeExample />
        </ExampleCard>

        <ExampleCard title='Panel - LargeFixed' code={ PanelLargeFixedExampleCode }>
          <PanelLargeFixedExample />
        </ExampleCard>

        <ExampleCard title='Panel - Extra Large' code={ PanelExtraLargeExampleCode }>
          <PanelExtraLargeExample />
        </ExampleCard>

        <ExampleCard title='Panel - Light Dismiss' code={ PanelLightDismissExampleCode }>
          <PanelLightDismissExample />
        </ExampleCard>

        <PropertiesTableSet componentName='Panel' />
      </div>
    );
  }

}
