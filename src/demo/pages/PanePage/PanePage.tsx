import * as React from 'react';
import {
  Link
} from '../../../index';
import {
  ExampleCard,
  PropertiesTableSet,
  ComponentPage
} from '../../components/index';

import { PaneSmallRightExample } from './examples/Pane.SmallRight.Example';
import { PaneSmallLeftExample } from './examples/Pane.SmallLeft.Example';
import { PaneSmallFluidExample } from './examples/Pane.SmallFluid.Example';
import { PaneMediumExample } from './examples/Pane.Medium.Example';
import { PaneLargeExample } from './examples/Pane.Large.Example';
import { PaneLargeFixedExample } from './examples/Pane.LargeFixed.Example';
import { PaneExtraLargeExample } from './examples/Pane.ExtraLarge.Example';
import { getPageRouteFromState } from '../../utilities/pageroute';
import { AppState } from '../../components/App/AppState';
import { IComponentDemoPageProps } from '../../components/ComponentPage/IComponentDemoPageProps';

const PaneSmallRightExampleCode = require('./examples/Pane.SmallRight.Example.tsx');
const PaneSmallLeftExampleCode = require('./examples/Pane.SmallLeft.Example.tsx');
const PaneSmallFluidExampleCode = require('./examples/Pane.SmallFluid.Example.tsx');
const PaneMediumExampleCode = require('./examples/Pane.Medium.Example.tsx');
const PaneLargeExampleCode = require('./examples/Pane.Large.Example.tsx');
const PaneLargeFixedExampleCode = require('./examples/Pane.LargeFixed.Example.tsx');
const PaneExtraLargeExampleCode = require('./examples/Pane.ExtraLarge.Example.tsx');

export class PanePage extends React.Component<IComponentDemoPageProps, any> {
  private _url: string;

  constructor() {
    super();
    this._url = getPageRouteFromState(AppState, 'Basic components', 'Pane');
  }

  public render() {
    return (
      <ComponentPage
        title='Pane'
        componentName='PaneExample'
        exampleCards={
          [
            <ExampleCard title='Pane - Small Pane, Full Screen, Fluid Width' code={ PaneSmallFluidExampleCode }>
              <PaneSmallFluidExample />
            </ExampleCard>,
            <ExampleCard title='Pane - Small Pane, Anchored Right, Fixed Width' code={ PaneSmallRightExampleCode }>
              <PaneSmallRightExample />
            </ExampleCard>,
            <ExampleCard title='Pane - Small Pane, Anchored Left, Fixed Width' code={ PaneSmallLeftExampleCode }>
              <PaneSmallLeftExample />
            </ExampleCard>,
            <ExampleCard title='Pane - Medium' code={ PaneMediumExampleCode }>
              <PaneMediumExample />
            </ExampleCard>,
            <ExampleCard title='Pane - Large' code={ PaneLargeExampleCode }>
              <PaneLargeExample />
            </ExampleCard>,
            <ExampleCard title='Pane - LargeFixed' code={ PaneLargeFixedExampleCode }>
              <PaneLargeFixedExample />
            </ExampleCard>,
            <ExampleCard title='Pane - Extra Large' code={ PaneExtraLargeExampleCode }>
              <PaneExtraLargeExample />
            </ExampleCard>
          ]
        }
        propertiesTables={
          [
             <PropertiesTableSet componentName='Pane' />
          ]
        }
        overview={
          <div>
            <Link target='_blank' href='http://dev.office.com/fabric/components/pane'>Panes</Link>
            <span> are used to render a split screen view.</span>
          </div>
        }
        route={ this._url }
        isHeaderVisible={ this.props.isHeaderVisible }>
      </ComponentPage>
    );
  }

}
