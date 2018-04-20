import * as React from 'react';
import {
  ExampleCard,
  ComponentPage,
  IComponentDemoPageProps,
  PageMarkdown,
  PropertiesTableSet
} from '@uifabric/example-app-base';
import { ToggleBasicExample } from './examples/Toggle.Basic.Example';
import { ToggleAriaLabelExample } from './examples/Toggle.AriaLabel.Example';
import { ComponentStatus } from '../../demo/ComponentStatus/ComponentStatus';
import { ToggleStatus } from './Toggle.checklist';

const ToggleBasicExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Toggle/examples/Toggle.Basic.Example.tsx') as string;
const ToggleAriaLabelExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Toggle/examples/Toggle.AriaLabel.Example.tsx') as string;

export class TogglePage extends React.Component<IComponentDemoPageProps, {}> {
  public render(): JSX.Element {
    return (
      <ComponentPage
        title='Toggle'
        componentName='ToggleExample'
        componentUrl='https://github.com/OfficeDev/office-ui-fabric-react/tree/master/packages/office-ui-fabric-react/src/components/Toggle'
        exampleCards={
          <div>
            <ExampleCard
              title='Default Toggles'
              code={ ToggleBasicExampleCode }
            >
              <ToggleBasicExample />
            </ExampleCard>
            <ExampleCard
              title='Toggle with specialized aria labels for the screen-reader to announce when the toggle is on and off'
              code={ ToggleAriaLabelExampleCode }
            >
              <ToggleAriaLabelExample />
            </ExampleCard>
          </div>
        }
        allowNativeProps={ true }
        nativePropsElement={ 'input' }
        propertiesTables={
          <PropertiesTableSet
            sources={ [
              require<string>('!raw-loader!office-ui-fabric-react/src/components/Toggle/Toggle.types.ts')
            ] }
          />
        }
        overview={
          <PageMarkdown>
            { require<string>('!raw-loader!office-ui-fabric-react/src/components/Toggle/docs/ToggleOverview.md') }
          </PageMarkdown>
        }
        bestPractices={
          <div />
        }
        dos={
          <PageMarkdown>
            { require<string>('!raw-loader!office-ui-fabric-react/src/components/Toggle/docs/ToggleDos.md') }
          </PageMarkdown>
        }
        donts={
          <PageMarkdown>
            { require<string>('!raw-loader!office-ui-fabric-react/src/components/Toggle/docs/ToggleDonts.md') }
          </PageMarkdown>
        }
        isHeaderVisible={ this.props.isHeaderVisible }
        componentStatus={
          <ComponentStatus
            { ...ToggleStatus }
          />
        }
      />
    );
  }
}
