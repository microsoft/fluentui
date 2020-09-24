import * as React from 'react';
import { ExampleCard, IComponentDemoPageProps, ComponentPage, PropertiesTableSet } from '@uifabric/example-app-base';

import { SelectedPeopleListBasicExample } from './SelectedPeopleList.Basic.Example';
const SelectedPeopleListBasicExampleCode = require('!raw-loader!./SelectedPeopleList.Basic.Example') as string;

import { SelectedPeopleListBasicDragDropExample } from './SelectedPeopleList.Basic.DragDrop.Example';
const SelectedPeopleListBasicDragDropExampleCode = require('!raw-loader!./SelectedPeopleList.Basic.DragDrop.Example') as string;

import { SelectedPeopleListDragDropBetweenWellsExample } from './SelectedPeopleList.DragDropBetweenWells.Example';
const SelectedPeopleListDragDropBetweenWellsExampleCode = require('!raw-loader!./SelectedPeopleList.DragDropBetweenWells.Example') as string;

import { SelectedPeopleListWithEditInContextMenuExample } from './SelectedPeopleList.WithEditInContextMenu.Example';
const SelectedPeopleListWithEditInContextMenuExampleCode = require('!raw-loader!./SelectedPeopleList.WithEditInContextMenu.Example') as string;

import { SelectedPeopleListWithGroupExpandExample } from './SelectedPeopleList.WithGroupExpand.Example';
const SelectedPeopleListWithGroupExpandExampleCode = require('!raw-loader!./SelectedPeopleList.WithGroupExpand.Example') as string;

import { SelectedPeopleListWithEditExample } from './SelectedPeopleList.WithEdit.Example';
const SelectedPeopleListWithEditExampleCode = require('!raw-loader!./SelectedPeopleList.WithEdit.Example') as string;

import { SelectedPeopleListWithContextMenuExample } from './SelectedPeopleList.WithContextMenu.Example';
const SelectedPeopleListWithContextMenuExampleCode = require('!raw-loader!./SelectedPeopleList.WithContextMenu.Example') as string;

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
            <ExampleCard title="Drag Drop" isOptIn={true} code={SelectedPeopleListBasicDragDropExampleCode}>
              <SelectedPeopleListBasicDragDropExample />
            </ExampleCard>
            <ExampleCard
              title="Drag Drop between wells"
              isOptIn={true}
              code={SelectedPeopleListDragDropBetweenWellsExampleCode}
            >
              <SelectedPeopleListDragDropBetweenWellsExample />
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
            <ExampleCard
              title="With Expandable Groups"
              isOptIn={true}
              code={SelectedPeopleListWithGroupExpandExampleCode}
            >
              <SelectedPeopleListWithGroupExpandExample />
            </ExampleCard>
            <ExampleCard title="With Editing" isOptIn={true} code={SelectedPeopleListWithEditExampleCode}>
              <SelectedPeopleListWithEditExample />
            </ExampleCard>
            <ExampleCard
              title="With Edit as an option in the context menu"
              isOptIn={true}
              code={SelectedPeopleListWithEditExampleCode}
            >
              <SelectedPeopleListWithEditInContextMenuExample />
            </ExampleCard>
          </div>
        }
        propertiesTables={
          <PropertiesTableSet
            sources={[require<string>('!raw-loader!@uifabric/experiments/src/components/Tile/Tile.types.ts')]}
          />
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
