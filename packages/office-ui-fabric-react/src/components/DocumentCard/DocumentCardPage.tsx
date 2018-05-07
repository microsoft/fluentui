import * as React from 'react';
import {
  ExampleCard,
  IComponentDemoPageProps,
  ComponentPage,
  PageMarkdown,
  PropertiesTableSet
} from '@uifabric/example-app-base';
import { DocumentCardBasicExample } from './examples/DocumentCard.Basic.Example';
import { DocumentCardCompleteExample } from './examples/DocumentCard.Complete.Example';
import { DocumentCardCompactExample } from './examples/DocumentCard.Compact.Example';
import { ComponentStatus } from '../../demo/ComponentStatus/ComponentStatus';
import { DocumentCardStatus } from './DocumentCard.checklist';

const DocumentCardBasicExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/DocumentCard/examples/DocumentCard.Basic.Example.tsx') as string;
const DocumentCardCompleteExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/DocumentCard/examples/DocumentCard.Complete.Example.tsx') as string;
const DocumentCardCompactExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/DocumentCard/examples/DocumentCard.Compact.Example.tsx') as string;

export class DocumentCardPage extends React.Component<IComponentDemoPageProps, {}> {
  public render(): JSX.Element {
    return (
      <ComponentPage
        title='DocumentCard'
        componentName='DocumentCardExample'
        componentUrl='https://github.com/OfficeDev/office-ui-fabric-react/tree/master/packages/office-ui-fabric-react/src/components/'
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
              <p>
                Also show a card with Logo, text preview and status that is used for Conversation card.
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
              require<string>('!raw-loader!office-ui-fabric-react/src/components/DocumentCard/DocumentCard.types.ts')
            ] }
          />
        }
        overview={
          <PageMarkdown>
            { require<string>('!raw-loader!office-ui-fabric-react/src/components/DocumentCard/docs/DocumentCardOverview.md') }
          </PageMarkdown>
        }
        bestPractices={
          <div />
        }
        dos={
          <PageMarkdown>
            { require<string>('!raw-loader!office-ui-fabric-react/src/components/DocumentCard/docs/DocumentCardDos.md') }
          </PageMarkdown>
        }
        donts={
          <PageMarkdown>
            { require<string>('!raw-loader!office-ui-fabric-react/src/components/DocumentCard/docs/DocumentCardDonts.md') }
          </PageMarkdown>
        }
        isHeaderVisible={ this.props.isHeaderVisible }
        componentStatus={
          <ComponentStatus
            { ...DocumentCardStatus }
          />
        }
      />
    );
  }

}
