import * as React from 'react';
import { ExampleCard, IComponentDemoPageProps, ComponentPage, PropertiesTableSet } from '@uifabric/example-app-base';

import { SelectedPeopleListBasicExample } from './examples/SelectedPeopleList.Basic.Example';
const SelectedPeopleListBasicExampleCode = require('!raw-loader!./examples/SelectedPeopleList.Basic.Example') as string;

import { SelectedPeopleListWithEditInContextMenuExample } from './examples/SelectedPeopleList.WithEditInContextMenu.Example';
const SelectedPeopleListWithEditInContextMenuExampleCode = require('!raw-loader!./examples/SelectedPeopleList.WithEditInContextMenu.Example') as string;

import { SelectedPeopleListWithGroupExpandExample } from './examples/SelectedPeopleList.WithGroupExpand.Example';
const SelectedPeopleListWithGroupExpandExampleCode = require('!raw-loader!./examples/SelectedPeopleList.WithGroupExpand.Example') as string;

import { SelectedPeopleListWithEditExample } from './examples/SelectedPeopleList.WithEdit.Example';
const SelectedPeopleListWithEditExampleCode = require('!raw-loader!./examples/SelectedPeopleList.WithEdit.Example') as string;

import { SelectedPeopleListWithContextMenuExample } from './examples/SelectedPeopleList.WithContextMenu.Example';
const SelectedPeopleListWithContextMenuExampleCode = require('!raw-loader!./examples/SelectedPeopleList.WithContextMenu.Example') as string;

export class SelectedPeopleListPage extends React.Component<IComponentDemoPageProps, {}> {
  public render(): JSX.Element {
    return (
      <ComponentPage
        title="SelectedPeopleList"
        componentName="SelectedPeopleList"
        exampleCards={
          <div>
            <ExampleCard title="Basic" isOptIn={true} code={SelectedPeopleListBasicExampleCode}>
              <SelectedPeopleListBasicExample />
            </ExampleCard>
            <ExampleCard
              title="With Copying, Editing, and Expansion"
              isOptIn={true}
              code={SelectedPeopleListWithEditInContextMenuExampleCode}
            >
              <SelectedPeopleListWithEditInContextMenuExample />
            </ExampleCard>
            <ExampleCard title="With A Context Menu" isOptIn={true} code={SelectedPeopleListWithContextMenuExampleCode}>
              <SelectedPeopleListWithContextMenuExample />
            </ExampleCard>
            <ExampleCard title="With Expandable Groups" isOptIn={true} code={SelectedPeopleListWithGroupExpandExampleCode}>
              <SelectedPeopleListWithGroupExpandExample />
            </ExampleCard>
            <ExampleCard title="With Editing" isOptIn={true} code={SelectedPeopleListWithEditExampleCode}>
              <SelectedPeopleListWithEditExample />
            </ExampleCard>
            <ExampleCard title="With Edit as an option in the context menu" isOptIn={true} code={SelectedPeopleListWithEditExampleCode}>
              <SelectedPeopleListWithEditInContextMenuExample />
            </ExampleCard>
          </div>
        }
        propertiesTables={
          <PropertiesTableSet sources={[require<string>('!raw-loader!@uifabric/experiments/src/components/Tile/Tile.types.ts')]} />
        }
        overview={<div />}
        bestPractices={<div />}
        dos={
          <div>
            <ul>
              <li>Use them to display a list of picked people</li>
            </ul>
          </div>
        }
        donts={
          <div>
            <ul>
              <li>Use them to display things that aren't people</li>
            </ul>
          </div>
        }
        isHeaderVisible={this.props.isHeaderVisible}
      />
    );
  }
}
