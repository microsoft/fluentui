import * as React from 'react';
import {
  ExampleCard,
  IComponentDemoPageProps,
  ComponentPage,
  PropertiesTableSet
} from '@uifabric/example-app-base';

import { BreadcrumbBasicExample } from './examples/Breadcrumb.Basic.Example';
import { BreadcrumbStaticExample } from './examples/Breadcrumb.Static.Example';

const BreadcrumbBasicExampleCode = require(
  '!raw-loader!office-ui-fabric-react/src/components/Breadcrumb/examples/Breadcrumb.Basic.Example.tsx'
) as string;
const BreadcrumbStaticExampleCode = require(
  '!raw-loader!office-ui-fabric-react/src/components/Breadcrumb/examples/Breadcrumb.Static.Example.tsx'
) as string;

export class BreadcrumbPage extends React.Component<IComponentDemoPageProps, any> {
  public render() {
    return (
      <ComponentPage
        title='Breadcrumb'
        componentName='BreadcrumbExample'
        exampleCards={
          <div>
            <ExampleCard
              title='Simple breadcrumb'
              code={ BreadcrumbBasicExampleCode }
            >
              <BreadcrumbBasicExample />
            </ExampleCard>
            <ExampleCard
              title='Static width'
              code={ BreadcrumbStaticExampleCode }
            >
              <BreadcrumbStaticExample />
            </ExampleCard>
          </div>
        }
        propertiesTables={
          <PropertiesTableSet
            sources={ [
              require<string>('!raw-loader!office-ui-fabric-react/src/components/Breadcrumb/Breadcrumb.Props.ts')
            ] }
          />
        }
        overview={
          <div>
            <p>Breadcrumbs should be used as a navigational aid in your app or site. They indicate the current page’s location within a hierarchy and help the user understand where they are in relation to the rest of that hierarchy. They also afford one-click access to higher levels of that hierarchy.</p>
            <p>Breadcrumbs are typically placed, in horizontal form, under the masthead or navigation of an experience, above the primary content area.</p>
          </div>
        }
        related={
          <a href='https://dev.office.com/fabric-js/Components/Breadcrumb/Breadcrumb.html'>Fabric JS</a>
        }
        bestPractices={
          <div></div>
        }
        dos={
          <div>
            <ul>
              <li>Place Breadcrumbs at the top of a page, above a list of items, or above the main content of a page.</li>
            </ul>
          </div>
        }
        donts={
          <div>
            <ul>
              <li>Don't use Breadcrumbs as a primary way to navigate an app or site.</li>
            </ul>
          </div>
        }
        isHeaderVisible={ this.props.isHeaderVisible }
      >
      </ComponentPage>
    );
  }
}
