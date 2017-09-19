import * as React from 'react';
import {
  ExampleCard,
  IComponentDemoPageProps,
  ComponentPage,
  PropertiesTableSet
} from '@uifabric/example-app-base';
import { DocumentCardBasicExample } from './examples/DocumentCard.Basic.Example';
import { DocumentCardCompleteExample } from './examples/DocumentCard.Complete.Example';
import { DocumentCardCompactExample } from './examples/DocumentCard.Compact.Example';
import { ComponentStatus } from '../../demo/ComponentStatus/ComponentStatus';
import { ComponentStatusState } from '../../demo/ComponentStatus/ComponentStatusState';

const DocumentCardBasicExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/DocumentCard/examples/DocumentCard.Basic.Example.tsx') as string;
const DocumentCardCompleteExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/DocumentCard/examples/DocumentCard.Complete.Example.tsx') as string;
const DocumentCardCompactExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/DocumentCard/examples/DocumentCard.Compact.Example.tsx') as string;

export class DocumentCardPage extends React.Component<IComponentDemoPageProps, {}> {
  public render() {
    return (
      <ComponentPage
        title='DocumentCard'
        componentName='DocumentCardExample'
        exampleCards={
          <div>
            <ExampleCard title='Default DocumentCard' code={ DocumentCardBasicExampleCode }>
              <p>
                The default configuration for a card represents a single file, with space to denote the last significant event and the person involved.
              </p>
              <DocumentCardBasicExample />
            </ExampleCard>
            <ExampleCard title='DocumentCard with multiple items, commands, and views' code={ DocumentCardCompleteExampleCode }>
              <p>
                This example shows a couple of optional abilities, including being able to have a card represent multiple items, being able to expose up to three relevant commands, and showing the number of views in the bottom right corner.
              </p>
              <DocumentCardCompleteExample />
            </ExampleCard>
            <ExampleCard title='DocumentCard with compact layout ' code={ DocumentCardCompactExampleCode }>
              <p>
                When showing a card on a mobile device or a similarly narrow layout, you may choose this Compact layout which helps the filename remain scannable while giving roomy space for a preview thumbnail.
              </p>
              <DocumentCardCompactExample />
            </ExampleCard>
          </div>
        }
        propertiesTables={
          <PropertiesTableSet
            sources={ [
              require<string>('!raw-loader!office-ui-fabric-react/src/components/DocumentCard/DocumentCard.Props.ts')
            ] }
          />
        }
        overview={
          <div>
            <p>
              A DocumentCard is a card representation of a file. This is usually richer than just seeing the file in a grid view, as the card can contain additional metadata or actions.
            </p>
          </div>
        }
        bestPractices={
          <div />
        }
        dos={
          <div>
            <ul>
              <li>Use this control to represent Office documents or other user-relevant files in aggregate views, such as when you are showing the user’s most trending document.</li>
              <li>Incorporate metadata that is relevant and useful in this particular view. A card can be specialized to be about the document’s latest changes, or about the document’s popularity, as you see fit.</li>
              <li>Use the DocumentCard when you are illustrating an event that encompasses multiple files. For example, a card can be configured to represent a single upload action that consisted in adding more than one file.</li>
            </ul>
          </div>
        }
        donts={
          <div>
            <ul>
              <li>Don’t use the DocumentCard in views where the user is likely to be performing bulk operations in files, or when the list may get very long. Specifically, if you are showing all the items inside an actual folder, a card may be overkill because the majority of the items in the folder may not have interesting metadata.</li>
              <li>Don’t use the DocumentCard if space is at a premium or you can’t show relevant and timely commands or metadata. Cards are useful because they can expose on-item interactions like “Share” buttons or view counts. If your app does not need this, show a simple grid or list of items instead, which are easier to scan.</li>
            </ul>
          </div>
        }
        isHeaderVisible={ this.props.isHeaderVisible }
        componentStatus={
          <ComponentStatus
            {...ComponentStatusState.DocumentCard}
          />
        }
      />
    );
  }

}
