import * as React from 'react';
import {
  ExampleCard,
  ComponentPage,
  IComponentDemoPageProps,
  PageMarkdown,
  PropertiesTableSet
} from '@uifabric/example-app-base';
import { OverlayDarkExample } from './examples/Overlay.Dark.Example';
import { OverlayLightExample } from './examples/Overlay.Light.Example';
import { ComponentStatus } from '../../demo/ComponentStatus/ComponentStatus';
import { OverlayStatus } from './Overlay.checklist';

const OverlayLightExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Overlay/examples/Overlay.Light.Example.tsx') as string;
const OverlayDarkExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Overlay/examples/Overlay.Dark.Example.tsx') as string;

export class OverlayPage extends React.Component<IComponentDemoPageProps, {}> {
  public render(): JSX.Element {
    return (
      <ComponentPage
        title='Overlay'
        componentName='OverlayExample'
        componentUrl='https://github.com/OfficeDev/office-ui-fabric-react/tree/master/packages/office-ui-fabric-react/src/components/Overlay'
        exampleCards={
          <div>
            <ExampleCard title='Light' code={ OverlayLightExampleCode }>
              <OverlayLightExample />
            </ExampleCard>
            <ExampleCard title='Dark' code={ OverlayDarkExampleCode }>
              <OverlayDarkExample />
            </ExampleCard>
          </div>
        }
        allowNativeProps={ true }
        propertiesTables={
          <PropertiesTableSet
            sources={ [
              require<string>('!raw-loader!office-ui-fabric-react/src/components/Overlay/Overlay.types.ts')
            ] }
          />
        }
        overview={
          <PageMarkdown>
            { require<string>('!raw-loader!office-ui-fabric-react/src/components/Overlay/docs/OverlayOverview.md') }
          </PageMarkdown>
        }
        bestPractices={
          <div />
        }
        dos={
          <PageMarkdown>
            { require<string>('!raw-loader!office-ui-fabric-react/src/components/Overlay/docs/OverlayDos.md') }
          </PageMarkdown>
        }
        donts={
          <PageMarkdown>
            { require<string>('!raw-loader!office-ui-fabric-react/src/components/Overlay/docs/OverlayDonts.md') }
          </PageMarkdown>
        }
        isHeaderVisible={ this.props.isHeaderVisible }
        componentStatus={
          <ComponentStatus
            { ...OverlayStatus }
          />
        }
      />
    );
  }

}
