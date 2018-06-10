import * as React from 'react';
import {
  ExampleCard,
  ComponentPage,
  IComponentDemoPageProps,
  PageMarkdown,
  PropertiesTableSet
} from '@uifabric/example-app-base';
import { ScrollablePaneDefaultExample } from './examples/ScrollablePane.Default.Example';
import { ScrollablePaneDetailsListExample } from './examples/ScrollablePane.DetailsList.Example';
import { ComponentStatus } from '../../demo/ComponentStatus/ComponentStatus';
import { ScrollablePaneStatus } from './ScrollablePane.checklist';

const ScrollablePaneDefaultExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/ScrollablePane/examples/ScrollablePane.Default.Example.tsx') as string;

const ScrollablePaneDetailsListExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/ScrollablePane/examples/ScrollablePane.DetailsList.Example.tsx') as string;

export class ScrollablePanePage extends React.Component<IComponentDemoPageProps, any> {
  public render(): JSX.Element {
    return (
      <ComponentPage
        title='ScrollablePane'
        componentName='ScrollablePaneExample'
        componentUrl='https://github.com/OfficeDev/office-ui-fabric-react/tree/master/packages/office-ui-fabric-react/src/components/ScrollablePane'
        exampleCards={
          <div>
            <ExampleCard title='Default' code={ ScrollablePaneDefaultExampleCode }>
              <ScrollablePaneDefaultExample />
            </ExampleCard>
            <ExampleCard title='DetailsList Locked Header' code={ ScrollablePaneDetailsListExampleCode }>
              <ScrollablePaneDetailsListExample />
            </ExampleCard>
          </div>
        }
        allowNativeProps={ true }
        nativePropsElement={ ['a', 'button'] }
        propertiesTables={
          <div>
            <PropertiesTableSet
              sources={ [
                require<string>('!raw-loader!office-ui-fabric-react/src/components/ScrollablePane/ScrollablePane.types.ts'),
                require<string>('!raw-loader!office-ui-fabric-react/src/components/Sticky/Sticky.types.ts')
              ] }
            />
          </div>
        }
        overview={
          <PageMarkdown>
            { require<string>('!raw-loader!office-ui-fabric-react/src/components/ScrollablePane/docs/ScrollablePaneOverview.md') }
          </PageMarkdown>
        }
        bestPractices={
          <div />
        }
        dos={
          <PageMarkdown>
            { require<string>('!raw-loader!office-ui-fabric-react/src/components/ScrollablePane/docs/ScrollablePaneDos.md') }
          </PageMarkdown>
        }
        donts={
          <PageMarkdown>
            { require<string>('!raw-loader!office-ui-fabric-react/src/components/ScrollablePane/docs/ScrollablePaneDonts.md') }
          </PageMarkdown>
        }
        isHeaderVisible={ this.props.isHeaderVisible }
        componentStatus={
          <ComponentStatus
            { ...ScrollablePaneStatus }
          />
        }
      />
    );
  }

}
