import * as React from 'react';
import { Link } from 'office-ui-fabric-react/lib/Link';
import {
  ExampleCard,
  IComponentDemoPageProps,
  ComponentPage,
  PropertiesTableSet
} from '@uifabric/example-app-base';

import { TileMediaExample } from './examples/Tile.Media.Example';
const TileMediaExampleCode = require('!raw-loader!experiments/src/components/Tile/examples/Tile.Media.Example.tsx') as string;

import { TileDocumentExample } from './examples/Tile.Document.Example';
const TileDocumentExampleCode = require('!raw-loader!experiments/src/components/Tile/examples/Tile.Document.Example.tsx') as string;

export class TilePage extends React.Component<IComponentDemoPageProps, {}> {
  public render() {
    return (
      <ComponentPage
        title='Tile'
        componentName='Tile'
        exampleCards={
          <div>
            <ExampleCard title='Document Tile' isOptIn={ true } code={ TileDocumentExampleCode }>
              <TileDocumentExample />
            </ExampleCard>
            <ExampleCard title='Media Tile' isOptIn={ true } code={ TileMediaExampleCode }>
              <TileMediaExample />
            </ExampleCard>
          </div>
        }
        propertiesTables={
          <PropertiesTableSet
            sources={ [
              require<string>('!raw-loader!experiments/src/components/Tile/Tile.Props.ts')
            ] }
          />
        }
        overview={
          <div>
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
        isHeaderVisible={ this.props.isHeaderVisible }>
      </ComponentPage>
    );
  }
}
