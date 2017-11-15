import * as React from 'react';
import {
  ExampleCard,
  IComponentDemoPageProps,
  ComponentPage,
  PropertiesTableSet
} from '@uifabric/example-app-base';
import { VerticalDividerBasicExample } from './examples/VerticalDivider.Basic.Example';
import { VerticalDividerCustomExample } from './examples/VerticalDivider.Custom.Example';
import { ComponentStatus } from '../../demo/ComponentStatus/ComponentStatus';
import { DividerStatus } from './Divider.checklist';

const VerticalDividerBasicExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Divider/examples/VerticalDivider.Basic.Example.tsx') as string;

const VerticalDividerCustomExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Divider/examples/VerticalDivider.Custom.Example.tsx') as string;

export class DividerPage extends React.Component<IComponentDemoPageProps, {}> {
  public render() {
    return (
      <ComponentPage
        title='Divider'
        componentName='DividerExample'
        exampleCards={
          <div>
            <ExampleCard title='Vertical Divider' code={ VerticalDividerBasicExampleCode }>
              <VerticalDividerBasicExample />
            </ExampleCard>
            <ExampleCard title='Custom Vertical Divider' code={ VerticalDividerCustomExampleCode }>
              <VerticalDividerCustomExample />
            </ExampleCard>
          </div>
        }
        propertiesTables={
          <PropertiesTableSet
            sources={ [
              require<string>('!raw-loader!office-ui-fabric-react/src/components/Divider/VerticalDivider.types.ts')
            ] }
          />
        }
        overview={
          <div>
            <p>
              A Divider is a line that is used to visually differentiate different parts of a UI. They are commonly used in headers and command bars. This divider automatically center algins itself within the parent container and can be customized to be shown in different heights and colors.
            </p>
          </div>
        }
        bestPractices={
          <div>
            <p>
              Use a divider component to show a sectional or continuity change in the content between two blocks of information. The spacing around the divider is generally determined by the content surrounding it.
            </p>
            <p>
              There are two recommended divider color combinations:
              <ol>
                <li>#C8C8C8/neutralTertiaryAlt divider when used within an #F4F4F4/neutralLighter layout</li>
                <li> #EAEAEA/neutralLight divider when used within an #FFFFFF/white layout</li>
              </ol>
            </p>
          </div>
        }
        dos={
          <div>
            <ul>
              <li>Use a divider to separate sections that may not otherwise have a clear beginning or end.</li>
              <li>Use a divider to separate information blocks where the context or continuity changes between the blocks.</li>
              <li>When the divider is used to change the look of the page but does not have all the functional, interactive, or structural relevance implied by the element type, or may be used to provide for an accessible fallback in older browsers that do not support WAI-ARIA use role="presentation".</li>
            </ul>
          </div>
        }
        donts={
          <div>
            <ul>
              <li>Do not use dividers for graphic decoration.</li>
            </ul>
          </div>

        }
        isHeaderVisible={ this.props.isHeaderVisible }
        componentStatus={
          <ComponentStatus
            {...DividerStatus}
          />
        }
      />
    );
  }
}
