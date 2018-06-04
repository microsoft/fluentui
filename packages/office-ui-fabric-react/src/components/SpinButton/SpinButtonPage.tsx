import * as React from 'react';
import {
  ExampleCard,
  IComponentDemoPageProps,
  ComponentPage,
  PageMarkdown,
  PropertiesTableSet
} from '@uifabric/example-app-base';
import { SpinButtonBasicExample } from './examples/SpinButton.Basic.Example';
import { SpinButtonBasicDisabledExample } from './examples/SpinButton.BasicDisabled.Example';
import { SpinButtonStatefulExample } from './examples/SpinButton.Stateful.Example';
import { SpinButtonBasicWithIconExample } from './examples/SpinButton.BasicWithIcon.Example';
import { SpinButtonBasicWithIconDisabledExample } from './examples/SpinButton.BasicWithIconDisabled.Example';
import { SpinButtonBasicWithEndPositionExample } from './examples/SpinButton.BasicWithEndPosition.Example';
import { SpinButtonCustomStyledExample } from './examples/SpinButton.CustomStyled.Example';
import { ComponentStatus } from '../../demo/ComponentStatus/ComponentStatus';
import { SpinButtonStatus } from './SpinButton.checklist';

const SpinButtonBasicExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/SpinButton/examples/SpinButton.Basic.Example.tsx') as string;
const SpinButtonBasicDisabledExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/SpinButton/examples/SpinButton.BasicDisabled.Example.tsx') as string;
const SpinButtonStatefulExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/SpinButton/examples/SpinButton.Stateful.Example.tsx') as string;
const SpinButtonBasicWithIconExampleCode = require
  ('!raw-loader!office-ui-fabric-react/src/components/SpinButton/examples/SpinButton.BasicWithIcon.Example.tsx') as string;
const SpinButtonBasicWithIconDisabledExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/SpinButton/examples/SpinButton.BasicWithIconDisabled.Example.tsx') as string;
const SpinButtonBasicWithEndPositionExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/SpinButton/examples/SpinButton.BasicWithEndPosition.Example.tsx') as string;
const SpinButtonCustomStyledExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/SpinButton/examples/SpinButton.CustomStyled.Example.tsx') as string;

export class SpinButtonPage extends React.Component<IComponentDemoPageProps, {}> {
  public render(): JSX.Element {
    return (
      <ComponentPage
        title='SpinButton'
        componentName='SpinButtonExample'
        componentUrl='https://github.com/OfficeDev/office-ui-fabric-react/tree/master/packages/office-ui-fabric-react/src/components/SpinButton'
        exampleCards={
          <div>
            <ExampleCard
              title={ 'Basic SpinButton' }
              code={ SpinButtonBasicExampleCode }
            >
              <SpinButtonBasicExample />
            </ExampleCard>
            <ExampleCard
              title={ 'Basic Disabled SpinButton' }
              code={ SpinButtonBasicDisabledExampleCode }
            >
              <SpinButtonBasicDisabledExample />
            </ExampleCard>
            <ExampleCard
              title={ 'Stateful SpinButton' }
              code={ SpinButtonStatefulExampleCode }
            >
              <SpinButtonStatefulExample />
            </ExampleCard>
            <ExampleCard
              title={ 'Basic SpinButton With Icon' }
              code={ SpinButtonBasicWithIconExampleCode }
            >
              <SpinButtonBasicWithIconExample />
            </ExampleCard>
            <ExampleCard
              title={ 'Basic SpinButton With Icon Disabled' }
              code={ SpinButtonBasicWithIconDisabledExampleCode }
            >
              <SpinButtonBasicWithIconDisabledExample />
            </ExampleCard>
            <ExampleCard
              title={ 'Basic SpinButton With Icon and Positioned at the End' }
              code={ SpinButtonBasicWithEndPositionExampleCode }
            >
              <SpinButtonBasicWithEndPositionExample />
            </ExampleCard>
            <ExampleCard
              title={ 'Custom Styled SpinButton' }
              code={ SpinButtonCustomStyledExampleCode }
            >
              <SpinButtonCustomStyledExample />
            </ExampleCard>

          </div>
        }
        propertiesTables={
          <PropertiesTableSet
            sources={ [
              require<string>('!raw-loader!office-ui-fabric-react/src/components/SpinButton/SpinButton.types.ts')
            ] }
          />
        }
        overview={
          <PageMarkdown>
            { require<string>('!raw-loader!office-ui-fabric-react/src/components/SpinButton/docs/SpinButtonOverview.md') }
          </PageMarkdown>
        }
        bestPractices={
          <div />
        }
        dos={
          <PageMarkdown>
            { require<string>('!raw-loader!office-ui-fabric-react/src/components/SpinButton/docs/SpinButtonDos.md') }
          </PageMarkdown>
        }
        donts={
          <PageMarkdown>
            { require<string>('!raw-loader!office-ui-fabric-react/src/components/SpinButton/docs/SpinButtonDonts.md') }
          </PageMarkdown>
        }
        isHeaderVisible={ this.props.isHeaderVisible }
        componentStatus={
          <ComponentStatus
            { ...SpinButtonStatus }
          />
        }
      />
    );
  }
}
