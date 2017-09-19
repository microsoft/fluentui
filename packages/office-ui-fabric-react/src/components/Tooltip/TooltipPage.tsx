import * as React from 'react';
import { Link } from 'office-ui-fabric-react/lib/Link';
import { LayerHost } from 'office-ui-fabric-react/lib/Layer';
import {
  ExampleCard,
  ComponentPage,
  PropertiesTableSet
} from '@uifabric/example-app-base';
import { TooltipCustomExample } from './examples/Tooltip.Custom.Example';
import { TooltipBasicExample } from './examples/Tooltip.Basic.Example';
import { TooltipOverflowExample } from './examples/Tooltip.Overflow.Example';
import { ComponentStatus } from '../../demo/ComponentStatus/ComponentStatus';
import { ComponentStatusState } from '../../demo/ComponentStatus/ComponentStatusState';

import './TooltipPage.scss';

const TooltipBasicExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Tooltip/examples/Tooltip.Basic.Example.tsx') as string;
const TooltipCustomExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Tooltip/examples/Tooltip.Custom.Example.tsx') as string;
const TooltipOverflowExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Tooltip/examples/Tooltip.Overflow.Example.tsx') as string;

export class TooltipPage extends React.Component<any, any> {
  public render() {
    return (
      <ComponentPage
        title='Tooltip'
        componentName='TooltipExample'
        exampleCards={
          <LayerHost>
            <ExampleCard title='Default Tooltip' code={ TooltipBasicExampleCode }>
              <TooltipBasicExample />
            </ExampleCard>

            <ExampleCard title='Tooltip with list' code={ TooltipCustomExampleCode }>
              <TooltipCustomExample />
            </ExampleCard>

            <ExampleCard title='Tooltip only on overflow' code={ TooltipOverflowExampleCode }>
              <TooltipOverflowExample />
            </ExampleCard>
          </LayerHost>
        }
        propertiesTables={
          <PropertiesTableSet
            sources={ [
              require<string>('!raw-loader!office-ui-fabric-react/src/components/Tooltip/Tooltip.Props.ts')
            ] }
          />
        }
        overview={
          <div>
            <Link target='_blank' href='http://dev.office.com/fabric/components/Tooltip'>Tooltips</Link>
            <span> supplement content associated with a specific UI component.</span>
          </div>
        }
        componentStatus={
          <ComponentStatus
            {...ComponentStatusState.Tooltip}
          />
        }
      />
    );
  }
}
