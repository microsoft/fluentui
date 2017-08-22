import * as React from 'react';
import { Link } from 'office-ui-fabric-react/lib/Link';
import {
  ExampleCard,
  IComponentDemoPageProps,
  ComponentPage,
  PropertiesTableSet
} from '@uifabric/example-app-base';

import { TilesListBasicExample } from './examples/TilesList.Basic.Example';
const TilesListBasicExampleCode = require('!raw-loader!experiments/src/components/TilesList/examples/TilesList.Basic.Example.tsx') as string;

import { TilesListDocumentExample } from './examples/TilesList.Document.Example';
const TilesListDocumentExampleCode = require('!raw-loader!experiments/src/components/TilesList/examples/TilesList.Document.Example.tsx') as string;

import { TilesListMediaExample } from './examples/TilesList.Media.Example';
const TilesListMediaExampleCode = require('!raw-loader!experiments/src/components/TilesList/examples/TilesList.Media.Example.tsx') as string;

export class TilesListPage extends React.Component<IComponentDemoPageProps, {}> {
  public render() {
    return (
      <ComponentPage
        title='TilesList'
        componentName='TilesListExample'
        exampleCards={
          <div>
            <ExampleCard title='TilesList with basic tiles' isOptIn={ true } code={ TilesListBasicExampleCode }>
              <TilesListBasicExample />
            </ExampleCard>
            <ExampleCard title='TilesList with document tiles' isOptIn={ true } code={ TilesListDocumentExampleCode }>
              <TilesListDocumentExample />
            </ExampleCard>
            <ExampleCard title='TilesList with media tiles' isOptIn={ true } code={ TilesListMediaExampleCode }>
              <TilesListMediaExample />
            </ExampleCard>
          </div>
        }
        propertiesTables={
          <PropertiesTableSet
            sources={ [
              require<string>('!raw-loader!experiments/src/components/TilesList/TilesList.Props.ts')
            ] }
          />
        }
        overview={
          <div>
            <p>
              <code>TilesList</code> is a specialization of the <Link href='#/examples/List'><code>List</code></Link> component.
              It is intended to represent items visual using a one or mote content-focused flowing grids.
            </p>
            <p>
              <code>TilesList</code> is designed to be used in conjunction with the <code>Tile</code> component. The <code>Tile</code> component provides a standardized form of focusable and selectable content item.
            </p>
          </div>
        }
        bestPractices={
          <div></div>
        }
        dos={
          <div>
            <ul>
              <li>Use them to represent a large collection of items visually.</li>
            </ul>
          </div>
        }
        donts={
          <div>
            <ul>
              <li>Use them for general layout of components that are not part of the same set.</li>
            </ul>
          </div>
        }
        isHeaderVisible={ this.props.isHeaderVisible }
      >
      </ComponentPage>
    );
  }
}
