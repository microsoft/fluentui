import * as React from 'react';
import {
  ExampleCard,
  IComponentDemoPageProps,
  ComponentPage,
  PageMarkdown,
  PropertiesTableSet
} from '@uifabric/example-app-base';
import { ListBasicExample } from './examples/List.Basic.Example';
import { ListGridExample } from './examples/List.Grid.Example';
import { ListScrollingExample } from './examples/List.Scrolling.Example';
import { ListGhostingExample } from './examples/List.Ghosting.Example';
import { createListItems } from '@uifabric/example-app-base';
import { ComponentStatus } from '../../demo/ComponentStatus/ComponentStatus';
import { ListStatus } from './List.checklist';

const ListBasicExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/List/examples/List.Basic.Example.tsx') as string;
const ListGridExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/List/examples/List.Grid.Example.tsx') as string;
const ListScrollingExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/List/examples/List.Scrolling.Example.tsx') as string;
const ListGhostingExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/List/examples/List.Ghosting.Example.tsx') as string;

let _cachedItems: any;

export class ListPage extends React.Component<IComponentDemoPageProps, {}> {
  constructor(props: IComponentDemoPageProps) {
    super(props);

    _cachedItems = _cachedItems || createListItems(5000);
  }

  public render(): JSX.Element {
    return (
      <ComponentPage
        title='List'
        componentName='ListExample'
        componentUrl='https://github.com/OfficeDev/office-ui-fabric-react/tree/master/packages/office-ui-fabric-react/src/components/List'
        exampleCards={
          <div>
            <ExampleCard title='List of 5000 grid items' isOptIn={ true } code={ ListGridExampleCode }>
              <ListGridExample items={ _cachedItems } />
            </ExampleCard>
            <ExampleCard title='List of 5000 variable height items' isOptIn={ true } code={ ListBasicExampleCode }>
              <ListBasicExample items={ _cachedItems } />
            </ExampleCard>
            <ExampleCard title='Scrolling items into view' isOptIn={ true } code={ ListScrollingExampleCode }>
              <ListScrollingExample items={ _cachedItems } />
            </ExampleCard>
            <ExampleCard title='Rendering ghost items while the list is scrolling' isOptIn={ true } code={ ListGhostingExampleCode }>
              <ListGhostingExample items={ _cachedItems } />
            </ExampleCard>
          </div>
        }
        allowNativeProps={ true }
        propertiesTables={
          <PropertiesTableSet
            sources={ [
              require<string>('!raw-loader!office-ui-fabric-react/src/components/List/List.types.ts')
            ] }
          />
        }
        overview={
          <PageMarkdown>
            { require<string>('!raw-loader!office-ui-fabric-react/src/components/List/docs/ListOverview.md') }
          </PageMarkdown>
        }
        isHeaderVisible={ this.props.isHeaderVisible }
        componentStatus={
          <ComponentStatus
            { ...ListStatus }
          />
        }
      />
    );
  }
}
