import * as React from 'react';
import { Link } from 'office-ui-fabric-react/lib/Link';
import { LayerHost } from 'office-ui-fabric-react/lib/Layer';
import {
  ExampleCard,
  ComponentPage,
  IComponentDemoPageProps,
  PropertiesTableSet
} from '@uifabric/example-app-base';
import { TooltipCustomExample } from './examples/Tooltip.Custom.Example';
import { TooltipBasicExample } from './examples/Tooltip.Basic.Example';
import { TooltipInteractiveExample } from './examples/Tooltip.Interactive.Example';
import { TooltipOverflowExample } from './examples/Tooltip.Overflow.Example';
import { ComponentStatus } from '../../demo/ComponentStatus/ComponentStatus';
import { TooltipStatus } from './Tooltip.checklist';

import './TooltipPage.scss';

const TooltipBasicExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Tooltip/examples/Tooltip.Basic.Example.tsx') as string;
const TooltipCustomExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Tooltip/examples/Tooltip.Custom.Example.tsx') as string;
const TooltipInteractiveExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Tooltip/examples/Tooltip.Interactive.Example.tsx') as string;
const TooltipOverflowExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Tooltip/examples/Tooltip.Overflow.Example.tsx') as string;

export class TooltipPage extends React.Component<IComponentDemoPageProps, any> {
  public render() {
    return (
      <ComponentPage
        title='Tooltip'
        componentName='TooltipExample'
        componentUrl='https://github.com/OfficeDev/office-ui-fabric-react/tree/master/packages/office-ui-fabric-react/src/components/Tooltip'
        exampleCards={
          <LayerHost>
            <ExampleCard title='Default Tooltip' code={ TooltipBasicExampleCode }>
              <TooltipBasicExample />
            </ExampleCard>

            <ExampleCard title='Tooltip with list' code={ TooltipCustomExampleCode }>
              <TooltipCustomExample />
            </ExampleCard>

            <ExampleCard title='Tooltip with a closing delay' code={ TooltipInteractiveExampleCode }>
              <TooltipInteractiveExample />
            </ExampleCard>

            <ExampleCard title='Tooltip only on overflow' code={ TooltipOverflowExampleCode }>
              <TooltipOverflowExample />
            </ExampleCard>
          </LayerHost>
        }
        allowNativeProps={ true }
        propertiesTables={
          <PropertiesTableSet
            sources={ [
              require<string>('!raw-loader!office-ui-fabric-react/src/components/Tooltip/Tooltip.types.ts'),
              require<string>('!raw-loader!office-ui-fabric-react/src/components/Tooltip/TooltipHost.types.ts')
            ] }
          />
        }
        overview={
          <div>
            <p>Tooltips supplement content associated with a specific UI component. You can use two components, and each has different props:</p>
            <p>Tooltip: A styled tooltip that you can display on a chosen target.</p>
            <p>TooltipHost: A tooltip wrapped in a stateful parent. Tooltip will be displayed on hover or focus and removed when focus/hover removed.</p>
          </div>
        }
        isHeaderVisible={ this.props.isHeaderVisible }
        componentStatus={
          <ComponentStatus
            { ...TooltipStatus }
          />
        }
      />
    );
  }
}
