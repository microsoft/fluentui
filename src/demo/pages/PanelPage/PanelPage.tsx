import * as React from 'react';
import {
  Link
} from '../../../index';
import {
  ExampleCard,
  PropertiesTableSet,
  ComponentPage
} from '../../components/index';

import { PanelSmallRightExample } from './examples/Panel.SmallRight.Example';
import { PanelSmallLeftExample } from './examples/Panel.SmallLeft.Example';
import { PanelSmallFluidExample } from './examples/Panel.SmallFluid.Example';
import { PanelMediumExample } from './examples/Panel.Medium.Example';
import { PanelLargeExample } from './examples/Panel.Large.Example';
import { PanelLargeFixedExample } from './examples/Panel.LargeFixed.Example';
import { PanelExtraLargeExample } from './examples/Panel.ExtraLarge.Example';
import { PanelLightDismissExample } from './examples/Panel.LightDismiss.Example';
import { getPageRouteFromState } from '../../utilities/pageroute';
import { AppState } from '../../components/App/AppState';

const PanelSmallRightExampleCode = require('./examples/Panel.SmallRight.Example.tsx');
const PanelSmallLeftExampleCode = require('./examples/Panel.SmallLeft.Example.tsx');
const PanelSmallFluidExampleCode = require('./examples/Panel.SmallFluid.Example.tsx');
const PanelMediumExampleCode = require('./examples/Panel.Medium.Example.tsx');
const PanelLargeExampleCode = require('./examples/Panel.Large.Example.tsx');
const PanelLargeFixedExampleCode = require('./examples/Panel.LargeFixed.Example.tsx');
const PanelExtraLargeExampleCode = require('./examples/Panel.ExtraLarge.Example.tsx');
const PanelLightDismissExampleCode = require('./examples/Panel.LightDismiss.Example.tsx');

export class PanelPage extends React.Component<any, any> {
  private _url: string;

  constructor() {
    super();
    this._url = getPageRouteFromState(AppState, 'Basic components', 'Panel');
  }

  public render() {
    return (
      <ComponentPage
        title='Panel'
        componentName='PanelExample'
        exampleCards={
          [
            <ExampleCard title='Panel - Small Panel, Anchored Right, Fixed Width' code={ PanelSmallRightExampleCode }>
              <PanelSmallRightExample />
            </ExampleCard>,
            <ExampleCard title='Panel - Small Panel, Anchored Left, Fixed Width' code={ PanelSmallLeftExampleCode }>
              <PanelSmallLeftExample />
            </ExampleCard>,
            <ExampleCard title='Panel - Small Panel, Full Screen, Fluid Width' code={ PanelSmallFluidExampleCode }>
              <PanelSmallFluidExample />
            </ExampleCard>,
            <ExampleCard title='Panel - Medium' code={ PanelMediumExampleCode }>
              <PanelMediumExample />
            </ExampleCard>,
            <ExampleCard title='Panel - Large' code={ PanelLargeExampleCode }>
              <PanelLargeExample />
            </ExampleCard>,
            <ExampleCard title='Panel - LargeFixed' code={ PanelLargeFixedExampleCode }>
              <PanelLargeFixedExample />
            </ExampleCard>,
            <ExampleCard title='Panel - Extra Large' code={ PanelExtraLargeExampleCode }>
              <PanelExtraLargeExample />
            </ExampleCard>,
            <ExampleCard title='Panel - Light Dismiss' code={ PanelLightDismissExampleCode }>
              <PanelLightDismissExample />
            </ExampleCard>
          ]
        }
        propertiesTables={
          [
             <PropertiesTableSet componentName='Panel' />
          ]
        }
        overview={
          <div>
            <Link target='_blank' href='http://dev.office.com/fabric/components/panel'>Panels</Link>
            <span> are used to render an org chart, and other components.</span>
          </div>
        }
        route={ this._url }>
      </ComponentPage>
    );
  }

}
