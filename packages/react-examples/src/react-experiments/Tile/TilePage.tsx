import * as React from 'react';
import {
  ExampleCard,
  IComponentDemoPageProps,
  ComponentPage,
  PropertiesTableSet,
} from '@fluentui/react-docsite-components';

import { TileFolderExample } from './Tile.Folder.Example';
const TileFolderExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-experiments/Tile/Tile.Folder.Example.tsx') as string;

import { TileMediaExample } from './Tile.Media.Example';
const TileMediaExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-experiments/Tile/Tile.Media.Example.tsx') as string;

import { TileDocumentExample } from './Tile.Document.Example';
const TileDocumentExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-experiments/Tile/Tile.Document.Example.tsx') as string;

export class TilePage extends React.Component<IComponentDemoPageProps, {}> {
  public render(): JSX.Element {
    return (
      <ComponentPage
        title="Tile"
        componentName="Tile"
        exampleCards={
          <div>
            <ExampleCard title="Folder Tile" isOptIn={true} code={TileFolderExampleCode}>
              <TileFolderExample />
            </ExampleCard>
            <ExampleCard title="Document Tile" isOptIn={true} code={TileDocumentExampleCode}>
              <TileDocumentExample />
            </ExampleCard>
            <ExampleCard title="Media Tile" isOptIn={true} code={TileMediaExampleCode}>
              <TileMediaExample />
            </ExampleCard>
          </div>
        }
        propertiesTables={
          <PropertiesTableSet
            sources={[
              require<string>('!raw-loader?esModule=false!@fluentui/react-experiments/src/components/Tile/Tile.types.ts'),
            ]}
          />
        }
        isHeaderVisible={this.props.isHeaderVisible}
      />
    );
  }
}
