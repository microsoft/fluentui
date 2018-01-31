import * as React from 'react';
import { LayerHost } from 'office-ui-fabric-react/lib/Layer';
import {
  ExampleCard,
  ComponentPage,
  IComponentDemoPageProps,
  PropertiesTableSet
} from '@uifabric/example-app-base';
import { TeachingBubbleBasicExample } from './examples/TeachingBubble.Basic.Example';
import { TeachingBubbleCondensedExample } from './examples/TeachingBubble.Condensed.Example';
import { TeachingBubbleIllustrationExample } from './examples/TeachingBubble.Illustration.Example';
import { TeachingBubbleWideIllustrationExample } from './examples/TeachingBubble.WideIllustration.Example';
import { TeachingBubbleSmallHeadlineExample } from './examples/TeachingBubble.SmallHeadline.Example';
import { ComponentStatus } from '../../demo/ComponentStatus/ComponentStatus';
import { TeachingBubbleStatus } from './TeachingBubble.checklist';

const TeachingBubbleBasicExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/TeachingBubble/examples/TeachingBubble.Basic.Example.tsx') as string;
const TeachingBubbleCondensedExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/TeachingBubble/examples/TeachingBubble.Condensed.Example.tsx') as string;
const TeachingBubbleIllustrationExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/TeachingBubble/examples/TeachingBubble.Basic.Example.tsx') as string;
const TeachingBubbleWideIllustrationExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/TeachingBubble/examples/TeachingBubble.WideIllustration.Example.tsx') as string;
const TeachingBubbleSmallHeadlineExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/TeachingBubble/examples/TeachingBubble.SmallHeadline.Example.tsx') as string;

export class TeachingBubblePage extends React.Component<IComponentDemoPageProps, any> {
  public render() {
    return (
      <ComponentPage
        title='TeachingBubble'
        componentName='TeachingBubbleExample'
        exampleCards={
          <LayerHost>
            <ExampleCard title='TeachingBubble' code={ TeachingBubbleBasicExampleCode }>
              <TeachingBubbleBasicExample />
            </ExampleCard>
            <ExampleCard title='TeachingBubble Condensed' code={ TeachingBubbleCondensedExampleCode }>
              <TeachingBubbleCondensedExample />
            </ExampleCard>
            <ExampleCard title='TeachingBubble with Illustration' code={ TeachingBubbleIllustrationExampleCode }>
              <TeachingBubbleIllustrationExample />
            </ExampleCard>
            <ExampleCard title='TeachingBubble wide with Illustration' code={ TeachingBubbleWideIllustrationExampleCode }>
              <TeachingBubbleWideIllustrationExample />
            </ExampleCard>
            <ExampleCard title='TeachingBubble with small headline' code={ TeachingBubbleSmallHeadlineExampleCode }>
              <TeachingBubbleSmallHeadlineExample />
            </ExampleCard>
          </LayerHost>
        }
        propertiesTables={
          <PropertiesTableSet
            sources={ [
              require<string>('!raw-loader!office-ui-fabric-react/src/components/TeachingBubble/TeachingBubble.types.ts')
            ] }
          />
        }
        overview={
          <div>
            <p>TeachingBubbles allow the user to display important hints on their web pages with a callout box.</p>
          </div>
        }
        isHeaderVisible={ this.props.isHeaderVisible }
        componentStatus={
          <ComponentStatus
            {...TeachingBubbleStatus}
          />
        }
      />
    );
  }
}
