import * as React from 'react';
import {
  ExampleCard,
  IComponentDemoPageProps,
  ComponentPage,
  PropertiesTableSet
} from '@uifabric/example-app-base';
import { KeytipsBasicExample } from './examples/Keytips.Basic.Example';
import { KeytipsButtonExample } from './examples/Keytips.Button.Example';
import { KeytipsCommandBarExample } from './examples/Keytips.CommandBar.Example';
import { KeytipsOverflowExample } from './examples/Keytips.Overflow.Example';
import { KeytipLayer } from 'office-ui-fabric-react/lib/KeytipLayer';
import { KeytipStatus } from './Keytip.checklist';
import { ComponentStatus } from '../../demo/ComponentStatus/ComponentStatus';

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
            <div>
              <p>
                A Keytip is a small popup near a component that indicates a key sequence that will trigger that component. These are not
                to be confused with keyboard shortcuts; they are instead key sequences to traverse through levels of UI components. Technically, a Keytip is a wrapper around a Callout where the target element is discovered through a 'data-ktp-target' attribute on that element.
              </p>
              <p>
                To enable Keytips on your page, a developer will add the KeytipLayer component somewhere in their document. It can be added   anywhere in your document, but must only be added once. Use the registerKeytip utility helper to add a Keytip. A user will
                enter and exit keytip mode with a IKeytipTransitionSequence, which is a key with any amount of modifiers (Alt, Shift, etc).
                By default, the entry and exit sequence is 'Alt-Windows' (Meta). There is also a sequence to 'return' up a level of keytips while traversing. This is by default 'Esc'.
              </p>
              <p>
                Fabric components that have keytips enabled will have an optional 'keytipProps' prop which will handler registering, unregistering, and rendering the keytip. The keySequences of the Keytip should be the full sequence to get to that keytip. There is a 'buildKeytipConfigMap' helper which will build a map of ID -> IKeytipProps to assist in defining your keytips.
              </p>
            </div>
          }
          dos={
            <div>
              <ul>
                <li>Keytip sequences can be duplicated as long as none of their siblings have the same sequence</li>
              </ul>
            </div>
          }
          donts={
            <div>
              <ul>
                <li>Don't create more than 1 KeytipLayer per app. This will cause issues with the key listeners</li>
                <li>Don't attach keytips to components that will make your page scroll. Keytip mode automically exits on scroll</li>
              </ul>
            </div>
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