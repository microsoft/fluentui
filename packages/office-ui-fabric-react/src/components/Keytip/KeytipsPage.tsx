import { KeytipLayer } from 'office-ui-fabric-react/lib/KeytipLayer';
import * as React from 'react';

import {
  ComponentPage,
  ExampleCard,
  IComponentDemoPageProps,
  PageMarkdown,
  PropertiesTableSet
} from '@uifabric/example-app-base';

import { ComponentStatus } from '../../demo/ComponentStatus/ComponentStatus';
import { KeytipStatus } from './Keytip.checklist';
import { KeytipsBasicExample } from './examples/Keytips.Basic.Example';
import { KeytipsButtonExample } from './examples/Keytips.Button.Example';
import { KeytipsCommandBarExample } from './examples/Keytips.CommandBar.Example';
import { KeytipsOverflowExample } from './examples/Keytips.Overflow.Example';

const KeytipsBasicCode = require('!raw-loader!office-ui-fabric-react/src/components/Keytip/examples/Keytips.Basic.Example.tsx') as string;
const KeytipsButtonCode = require('!raw-loader!office-ui-fabric-react/src/components/Keytip/examples/Keytips.Button.Example.tsx') as string;
const KeytipsCommandBarCode = require('!raw-loader!office-ui-fabric-react/src/components/Keytip/examples/Keytips.CommandBar.Example.tsx') as string;
const KeytipsOverflowCode = require('!raw-loader!office-ui-fabric-react/src/components/Keytip/examples/Keytips.Overflow.Example.tsx') as string;

export class KeytipsPage extends React.Component<IComponentDemoPageProps, {}> {
  public render(): JSX.Element {
    return (
      <div>
        <ComponentPage
          title='Keytips'
          componentName='Keytips'
          exampleCards={
            <div>
              <p>Press Alt-Win to enable keytips, Esc to return up a level, and Alt-Win again to exit keytip mode</p>
              <ExampleCard title='Keytips on Buttons' code={ KeytipsButtonCode }>
                <KeytipsButtonExample />
              </ExampleCard>
              <ExampleCard title='Keytips in a CommandBar' code={ KeytipsCommandBarCode }>
                <KeytipsCommandBarExample />
              </ExampleCard>
              <ExampleCard title='Keytips in an OverflowWell' code={ KeytipsOverflowCode }>
                <KeytipsOverflowExample />
              </ExampleCard>
              <ExampleCard title='Keytips Example' code={ KeytipsBasicCode }>
                <KeytipsBasicExample />
              </ExampleCard>
            </div>
          }
          propertiesTables={
            <PropertiesTableSet
              sources={ [
                require<string>('!raw-loader!office-ui-fabric-react/src/components/Keytip/Keytip.types.ts'),
                require<string>('!raw-loader!office-ui-fabric-react/src/components/KeytipLayer/KeytipLayer.types.ts'),
              ] }
            />
          }
          overview={
            <PageMarkdown>
              { require<string>('!raw-loader!office-ui-fabric-react/src/components/Keytip/docs/KeytipOverview.md') }
            </PageMarkdown>
          }
          dos={
            <PageMarkdown>
              { require<string>('!raw-loader!office-ui-fabric-react/src/components/Keytip/docs/KeytipDos.md') }
            </PageMarkdown>
          }
          donts={
            <PageMarkdown>
              { require<string>('!raw-loader!office-ui-fabric-react/src/components/Keytip/docs/KeytipDonts.md') }
            </PageMarkdown>
          }
          isHeaderVisible={ this.props.isHeaderVisible }
          componentStatus={
            <ComponentStatus
              { ...KeytipStatus }
            />
          }
        />
        <KeytipLayer content='Alt Windows' />
      </div>
    );
  }
}