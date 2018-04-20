import * as React from 'react';
import {
  ExampleCard,
  IComponentDemoPageProps,
  ComponentPage,
  PageMarkdown,
  PropertiesTableSet
} from '@uifabric/example-app-base';
import { DialogBasicExample } from './examples/Dialog.Basic.Example';
import { DialogLargeHeaderExample } from './examples/Dialog.LargeHeader.Example';
import { DialogBlockingExample } from './examples/Dialog.Blocking.Example';
import { ComponentStatus } from '../../demo/ComponentStatus/ComponentStatus';
import { DialogStatus } from './Dialog.checklist';

const DialogBasicExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Dialog/examples/Dialog.Basic.Example.tsx') as string;
const DialogLargeHeaderExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Dialog/examples/Dialog.LargeHeader.Example.tsx') as string;
const DialogBlockingExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Dialog/examples/Dialog.Blocking.Example.tsx') as string;

export class DialogPage extends React.Component<IComponentDemoPageProps, {}> {
  public render(): JSX.Element {
    return (
      <ComponentPage
        title='Dialog'
        componentName='DialogExample'
        componentUrl='https://github.com/OfficeDev/office-ui-fabric-react/tree/master/packages/office-ui-fabric-react/src/components/Dialog'
        exampleCards={
          <div>
            <ExampleCard title='Default Dialog' code={ DialogBasicExampleCode }>
              <DialogBasicExample />
            </ExampleCard>
            <ExampleCard title='Dialog with large header and ChoiceGroup' code={ DialogLargeHeaderExampleCode }>
              <p>
                Use this Dialog sparingly, when calling extra attention to the content. It can be used in situations where you want to teach the user something or notify them of an important change.
              </p>
              <DialogLargeHeaderExample />
            </ExampleCard>
            <ExampleCard title='Blocking Dialog' code={ DialogBlockingExampleCode }>
              <p>
                A blocking Dialog disables all other actions and commands on the page behind it. They should be used very sparingly, only when it is critical that the user makes a choice or provides information before they can proceed. Blocking Dialogs are generally used for irreversible or potentially destructive tasks.
              </p>
              <DialogBlockingExample />
            </ExampleCard>
          </div>
        }
        propertiesTables={
          <PropertiesTableSet
            sources={ [
              require<string>('!raw-loader!office-ui-fabric-react/src/components/Dialog/Dialog.types.ts')
            ] }
          />
        }
        overview={
          <PageMarkdown>
            { require<string>('!raw-loader!office-ui-fabric-react/src/components/Dialog/docs/DialogOverview.md') }
          </PageMarkdown>
        }
        bestPractices={
          <div />
        }
        dos={
          <PageMarkdown>
            { require<string>('!raw-loader!office-ui-fabric-react/src/components/Dialog/docs/DialogDos.md') }
          </PageMarkdown>
        }
        donts={
          <PageMarkdown>
            { require<string>('!raw-loader!office-ui-fabric-react/src/components/Dialog/docs/DialogDonts.md') }
          </PageMarkdown>
        }
        isHeaderVisible={ this.props.isHeaderVisible }
        componentStatus={
          <ComponentStatus
            { ...DialogStatus }
          />
        }
      />
    );
  }
}
