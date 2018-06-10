import * as React from 'react';
import {
  ExampleCard,
  IComponentDemoPageProps,
  ComponentPage,
  PropertiesTableSet,
  PageMarkdown,
} from '@uifabric/example-app-base';

import { ComponentStatus } from '../../demo/ComponentStatus/ComponentStatus';
import { BreadcrumbStatus } from './Breadcrumb.checklist';
import { BreadcrumbBasicExample } from './examples/Breadcrumb.Basic.Example';
import { BreadcrumbStaticExample } from './examples/Breadcrumb.Static.Example';

const BreadcrumbBasicExampleCode = require(
  '!raw-loader!office-ui-fabric-react/src/components/Breadcrumb/examples/Breadcrumb.Basic.Example.tsx'
) as string;
const BreadcrumbStaticExampleCode = require(
  '!raw-loader!office-ui-fabric-react/src/components/Breadcrumb/examples/Breadcrumb.Static.Example.tsx'
) as string;

export class BreadcrumbPage extends React.Component<IComponentDemoPageProps, any> {
  public render(): JSX.Element {
    return (
      <ComponentPage
        title='Breadcrumb'
        componentName='BreadcrumbExample'
        componentUrl='https://github.com/OfficeDev/office-ui-fabric-react/tree/master/packages/office-ui-fabric-react/src/components/Breadcrumb'
        exampleCards={
          <div>
            <ExampleCard
              title='Default Breadcrumb'
              code={ BreadcrumbBasicExampleCode }
            >
              <BreadcrumbBasicExample />
            </ExampleCard>
            <ExampleCard
              title='Breadcrumb with static width '
              code={ BreadcrumbStaticExampleCode }
            >
              <BreadcrumbStaticExample />
            </ExampleCard>
          </div>
        }
        propertiesTables={
          <PropertiesTableSet
            sources={ [
              require<string>('!raw-loader!office-ui-fabric-react/src/components/Breadcrumb/Breadcrumb.types.ts')
            ] }
          />
        }
        overview={
          <PageMarkdown>
            { require<string>('!raw-loader!office-ui-fabric-react/src/components/Breadcrumb/docs/BreadcrumbOverview.md') }
          </PageMarkdown>
        }
        bestPractices={
          <div />
        }
        dos={
          <PageMarkdown>
            { require<string>('!raw-loader!office-ui-fabric-react/src/components/Breadcrumb/docs/BreadcrumbDos.md') }
          </PageMarkdown>
        }
        donts={
          <PageMarkdown>
            { require<string>('!raw-loader!office-ui-fabric-react/src/components/Breadcrumb/docs/BreadcrumbDonts.md') }
          </PageMarkdown>
        }
        isHeaderVisible={ this.props.isHeaderVisible }
        componentStatus={
          <ComponentStatus
            { ...BreadcrumbStatus }
          />
        }
      />
    );
  }
}