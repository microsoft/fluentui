import * as React from 'react';
import {
  ExampleCard,
  IComponentDemoPageProps,
  ComponentPage,
  PageMarkdown,
  PropertiesTableSet
} from '@uifabric/example-app-base';
import { FacepileAddFaceExample } from './examples/Facepile.AddFace.Example';
import { FacepileBasicExample } from './examples/Facepile.Basic.Example';
import { FacepileOverflowExample } from './examples/Facepile.Overflow.Example';
import { ComponentStatus } from '../../demo/ComponentStatus/ComponentStatus';
import { FacepileStatus } from './Facepile.checklist';

const FacepileAddFaceExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Facepile/examples/Facepile.AddFace.Example.tsx') as string;
const FacepileBasicExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Facepile/examples/Facepile.Basic.Example.tsx') as string;
const FacepileOverflowExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Facepile/examples/Facepile.Overflow.Example.tsx') as string;

export class FacepilePage extends React.Component<IComponentDemoPageProps, {}> {
  public render(): JSX.Element {
    return (
      <ComponentPage
        title='Facepile'
        componentName='FacepileExample'
        componentUrl='https://github.com/OfficeDev/office-ui-fabric-react/tree/master/packages/office-ui-fabric-react/src/components/Facepile'
        exampleCards={
          <div>
            <ExampleCard title='Facepile with size and fade in options' code={ FacepileBasicExampleCode }>
              <FacepileBasicExample />
            </ExampleCard>
            <ExampleCard title='Facepile with overflow buttons' code={ FacepileOverflowExampleCode }>
              <FacepileOverflowExample />
            </ExampleCard>
            <ExampleCard title='Facepile with face adding functionality' code={ FacepileAddFaceExampleCode }>
              <FacepileAddFaceExample />
            </ExampleCard>
          </div>
        }
        propertiesTables={
          <PropertiesTableSet
            sources={ [
              require<string>('!raw-loader!office-ui-fabric-react/src/components/Facepile/Facepile.types.ts')
            ] }
          />
        }
        overview={
          <PageMarkdown>
            { require<string>('!raw-loader!office-ui-fabric-react/src/components/Facepile/docs/FacepileOverview.md') }
          </PageMarkdown>
        }
        bestPractices={
          <div />
        }
        dos={
          <PageMarkdown>
            { require<string>('!raw-loader!office-ui-fabric-react/src/components/Facepile/docs/FacepileDos.md') }
          </PageMarkdown>
        }
        donts={
          <PageMarkdown>
            { require<string>('!raw-loader!office-ui-fabric-react/src/components/Facepile/docs/FacepileDonts.md') }
          </PageMarkdown>
        }
        isHeaderVisible={ this.props.isHeaderVisible }
        componentStatus={
          <ComponentStatus
            { ...FacepileStatus }
          />
        }
      />
    );
  }
}
