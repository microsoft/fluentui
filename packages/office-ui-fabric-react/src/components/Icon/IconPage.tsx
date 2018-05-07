import * as React from 'react';
import {
  ExampleCard,
  IComponentDemoPageProps,
  ComponentPage,
  PageMarkdown,
  PropertiesTableSet
} from '@uifabric/example-app-base';
import { IconBasicExample } from './examples/Icon.Basic.Example';
import { IconSvgExample } from './examples/Icon.Svg.Example';
import { IconColorExample } from './examples/Icon.Color.Example';
import { IconImageSheetExample } from './examples/Icon.ImageSheet.Example';
import { ComponentStatus } from '../../demo/ComponentStatus/ComponentStatus';
import { IconStatus } from './Icon.checklist';

const IconBasicExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Icon/examples/Icon.Basic.Example.tsx') as string;
const IconSvgExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Icon/examples/Icon.Svg.Example.tsx') as string;
const IconColorExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Icon/examples/Icon.Color.Example.tsx') as string;
const IconImageSheetExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Icon/examples/Icon.ImageSheet.Example.tsx') as string;

export class IconPage extends React.Component<IComponentDemoPageProps, {}> {
  public render(): JSX.Element {
    return (
      <ComponentPage
        title='Icon'
        componentName='IconExample'
        componentUrl='https://github.com/OfficeDev/office-ui-fabric-react/tree/master/packages/office-ui-fabric-react/src/components/Icon'
        exampleCards={
          <div>
            <ExampleCard title='Icon' code={ IconBasicExampleCode }>
              <IconBasicExample />
            </ExampleCard>
            <ExampleCard title='Icon with custom color' code={ IconColorExampleCode }>
              <IconColorExample />
            </ExampleCard>
            <ExampleCard title='Icon using custom svg' code={ IconSvgExampleCode }>
              <IconSvgExample />
            </ExampleCard>
            <ExampleCard title='Icon using image sheet' code={ IconImageSheetExampleCode }>
              <IconImageSheetExample />
            </ExampleCard>
          </div>
        }
        allowNativeProps={ true }
        propertiesTables={
          <PropertiesTableSet
            sources={ [
              require<string>('!raw-loader!office-ui-fabric-react/src/components/Icon/Icon.types.ts')
            ] }
          />
        }
        overview={
          <PageMarkdown>
            { require<string>('!raw-loader!office-ui-fabric-react/src/components/Icon/docs/IconOverview.md') }
          </PageMarkdown>
        }
        bestPractices={
          <div />
        }
        dos={
          <PageMarkdown>
            { require<string>('!raw-loader!office-ui-fabric-react/src/components/Icon/docs/IconDos.md') }
          </PageMarkdown>
        }
        donts={
          <PageMarkdown>
            { require<string>('!raw-loader!office-ui-fabric-react/src/components/Icon/docs/IconDonts.md') }
          </PageMarkdown>
        }
        isHeaderVisible={ this.props.isHeaderVisible }
        componentStatus={
          <ComponentStatus
            { ...IconStatus }
          />
        }
      />
    );
  }
}
