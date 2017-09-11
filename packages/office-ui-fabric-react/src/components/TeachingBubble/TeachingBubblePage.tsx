import * as React from 'react';
import { Link } from 'office-ui-fabric-react/lib/Link';
import { LayerHost } from 'office-ui-fabric-react/lib/Layer';
import {
  ExampleCard,
  ComponentPage,
  PropertiesTableSet,
  ComponentStatus
} from '@uifabric/example-app-base';
import { TeachingBubbleBasicExample } from './examples/TeachingBubble.Basic.Example';
import { TeachingBubbleCondensedExample } from './examples/TeachingBubble.Condensed.Example';
import { TeachingBubbleIllustrationExample } from './examples/TeachingBubble.Illustration.Example';
import { ComponentStatusState } from '../ComponentStatus/ComponentStatusState';

const TeachingBubbleBasicExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/TeachingBubble/examples/TeachingBubble.Basic.Example.tsx') as string;
const TeachingBubbleCondensedExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/TeachingBubble/examples/TeachingBubble.Condensed.Example.tsx') as string;
const TeachingBubbleIllustrationExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/TeachingBubble/examples/TeachingBubble.Basic.Example.tsx') as string;

export class TeachingBubblePage extends React.Component<any, any> {
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
          </LayerHost>
        }
        propertiesTables={
          <PropertiesTableSet
            sources={ [
              require<string>('!raw-loader!office-ui-fabric-react/src/components/TeachingBubble/TeachingBubble.Props.ts')
            ] }
          />
        }
        overview={
          <div>
            <Link target='_blank' href='http://dev.office.com/fabric/components/TeachingBubble'>TeachingBubbles</Link>
            <span> allow the user to display important hints on their web pages with a callout box.</span>
          </div>
        }
        componentStatus={
          <ComponentStatus
            {...ComponentStatusState.TeachingBubble}
          >
          </ComponentStatus>
        }
      />
    );
  }
}
