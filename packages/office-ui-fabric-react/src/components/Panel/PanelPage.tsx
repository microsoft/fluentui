import * as React from 'react';
import {
  ExampleCard,
  ComponentPage,
  IComponentDemoPageProps,
  PageMarkdown,
  PropertiesTableSet
} from '@uifabric/example-app-base';
import { PanelSmallRightExample } from './examples/Panel.SmallRight.Example';
import { PanelSmallLeftExample } from './examples/Panel.SmallLeft.Example';
import { PanelSmallFluidExample } from './examples/Panel.SmallFluid.Example';
import { PanelMediumExample } from './examples/Panel.Medium.Example';
import { PanelLargeExample } from './examples/Panel.Large.Example';
import { PanelLargeFixedExample } from './examples/Panel.LargeFixed.Example';
import { PanelExtraLargeExample } from './examples/Panel.ExtraLarge.Example';
import { PanelCustomExample } from './examples/Panel.Custom.Example';
import { PanelHiddenOnDismissExample } from './examples/Panel.HiddenOnDismiss.Example';
import { PanelLightDismissExample } from './examples/Panel.LightDismiss.Example';
import { PanelLightDismissCustomExample } from './examples/Panel.LightDismissCustom.Example';
import { PanelNonModalExample } from './examples/Panel.NonModal.Example';
import { PanelFooterExample } from './examples/Panel.Footer.Example';
import { ComponentStatus } from '../../demo/ComponentStatus/ComponentStatus';
import { PanelStatus } from './Panel.checklist';

const PanelSmallRightExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Panel/examples/Panel.SmallRight.Example.tsx') as string;
const PanelSmallLeftExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Panel/examples/Panel.SmallLeft.Example.tsx') as string;
const PanelSmallFluidExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Panel/examples/Panel.SmallFluid.Example.tsx') as string;
const PanelMediumExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Panel/examples/Panel.Medium.Example.tsx') as string;
const PanelLargeExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Panel/examples/Panel.Large.Example.tsx') as string;
const PanelLargeFixedExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Panel/examples/Panel.LargeFixed.Example.tsx') as string;
const PanelExtraLargeExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Panel/examples/Panel.ExtraLarge.Example.tsx') as string;
const PanelCustomExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Panel/examples/Panel.Custom.Example.tsx') as string;
const PanelHiddenOnDismissExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Panel/examples/Panel.HiddenOnDismiss.Example.tsx') as string;
const PanelLightDismissExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Panel/examples/Panel.LightDismiss.Example.tsx') as string;
const PanelLightDismissCustomExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Panel/examples/Panel.LightDismissCustom.Example.tsx') as string;
const PanelNonModalExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Panel/examples/Panel.NonModal.Example.tsx') as string;
const PanelFooterExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Panel/examples/Panel.Footer.Example.tsx') as string;

export class PanelPage extends React.Component<IComponentDemoPageProps, {}> {
  public render(): JSX.Element {
    return (
      <ComponentPage
        title='Panel'
        componentName='PanelExample'
        componentUrl='https://github.com/OfficeDev/office-ui-fabric-react/tree/master/packages/office-ui-fabric-react/src/components/Panel'
        allowNativeProps={ true }
        exampleCards={
          <div>
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
            <ExampleCard title='Panel - Custom' code={ PanelCustomExampleCode }>
              <PanelCustomExample />
            </ExampleCard>
            <ExampleCard title='Panel - Hidden on Dismiss' code={ PanelHiddenOnDismissExampleCode }>
              <PanelHiddenOnDismissExample />
            </ExampleCard>
            <ExampleCard title='Panel - Light Dismiss' code={ PanelLightDismissExampleCode }>
              <PanelLightDismissExample />
            </ExampleCard>
            <ExampleCard title='Panel - Custom Light Dismiss' code={ PanelLightDismissCustomExampleCode }>
              <PanelLightDismissCustomExample />
            </ExampleCard>
            <ExampleCard title='Panel - Non-Modal' code={ PanelNonModalExampleCode }>
              <PanelNonModalExample />
            </ExampleCard>
            <ExampleCard title='Panel - Footer' code={ PanelFooterExampleCode }>
              <PanelFooterExample />
            </ExampleCard>
          </div>
        }
        propertiesTables={
          <PropertiesTableSet
            sources={ [
              require<string>('!raw-loader!office-ui-fabric-react/src/components/Panel/Panel.types.ts')
            ] }
          />
        }
        overview={
          <PageMarkdown>
            { require<string>('!raw-loader!office-ui-fabric-react/src/components/Panel/docs/PanelOverview.md') }
          </PageMarkdown>
        }
        bestPractices={
          <div />
        }
        dos={
          <PageMarkdown>
            { require<string>('!raw-loader!office-ui-fabric-react/src/components/Panel/docs/PanelDos.md') }
          </PageMarkdown>
        }
        donts={
          <PageMarkdown>
            { require<string>('!raw-loader!office-ui-fabric-react/src/components/Panel/docs/PanelDonts.md') }
          </PageMarkdown>
        }
        isHeaderVisible={ this.props.isHeaderVisible }
        componentStatus={
          <ComponentStatus
            { ...PanelStatus }
          />
        }
      />
    );
  }
}
