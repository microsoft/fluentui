import * as React from 'react';
import { Link } from '@fluentui/react/lib/Link';
import { Checkbox } from '@fluentui/react/lib/Checkbox';
import {
  ExampleCard,
  IComponentDemoPageProps,
  ComponentPage,
  PropertiesTableSet,
} from '@fluentui/react-docsite-components';

import { TilesListBasicExample } from './TilesList.Basic.Example';
const TilesListBasicExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-experiments/TilesList/TilesList.Basic.Example.tsx') as string;

import { TilesListDocumentExample } from './TilesList.Document.Example';
const TilesListDocumentExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-experiments/TilesList/TilesList.Document.Example.tsx') as string;

import { TilesListMediaExample } from './TilesList.Media.Example';

const TilesListMediaExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react-experiments/TilesList/TilesList.Media.Example.tsx') as string;

export interface ITilesListPageState {
  size: 'small' | 'large';
}

export class TilesListPage extends React.Component<IComponentDemoPageProps, ITilesListPageState> {
  constructor(props: {}) {
    super(props);

    this.state = {
      size: 'large',
    };
  }

  public render(): JSX.Element {
    const { size } = this.state;

    return (
      <ComponentPage
        title="TilesList"
        componentName="TilesListExample"
        exampleCards={
          <div>
            <ExampleCard title="TilesList with basic tiles" isOptIn={true} code={TilesListBasicExampleCode}>
              <TilesListBasicExample />
            </ExampleCard>
            <ExampleCard
              title="TilesList with document tiles and placeholders when data is missing"
              isOptIn={true}
              code={TilesListDocumentExampleCode}
            >
              <Checkbox label="Use large tiles" checked={size === 'large'} onChange={this._onIsLargeChanged} />
              <TilesListDocumentExample tileSize={size} />
            </ExampleCard>
            <ExampleCard title="TilesList with media tiles" isOptIn={true} code={TilesListMediaExampleCode}>
              <TilesListMediaExample />
            </ExampleCard>
          </div>
        }
        propertiesTables={
          <PropertiesTableSet
            sources={[
              require<string>('!raw-loader?esModule=false!@fluentui/react-experiments/src/components/TilesList/TilesList.types.ts'),
            ]}
          />
        }
        overview={
          <div>
            <p>
              <code>TilesList</code> is a specialization of the{' '}
              <Link href="#/examples/List" underline>
                <code>List</code>
              </Link>{' '}
              component. It is intended to represent items visually using one or more content-focused flowing grids.
            </p>
            <p>
              <code>TilesList</code> is designed to be used in conjunction with the <code>Tile</code> component.{' '}
              <code>Tile</code> provides a standardized form for a focusable and selectable content item.
            </p>
          </div>
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
        isHeaderVisible={this.props.isHeaderVisible}
      />
    );
  }

  private _onIsLargeChanged = (event: React.FormEvent<HTMLInputElement>, checked: boolean): void => {
    this.setState({
      size: checked ? 'large' : 'small',
    });
  };
}
