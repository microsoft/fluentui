
import * as React from 'react';
import {
  TilesList,
  ITileSize
} from '../../TilesList';
import { Tile } from '../../../Tile';
import { Selection } from 'office-ui-fabric-react/lib/utilities/selection/Selection';
import { MarqueeSelection } from 'office-ui-fabric-react/lib/MarqueeSelection';
import { autobind } from 'office-ui-fabric-react/lib/Utilities';
import { AnimationClassNames } from 'office-ui-fabric-react/lib/Styling';
import { IExampleGroup, IExampleItem, createGroup, createMediaItems, getTileCells } from './ExampleHelpers';

function createGroups(): IExampleGroup[] {
  let offset = 0;

  const groups: IExampleGroup[] = [];

  for (let i = 0; i < 20; i++) {
    const items = createMediaItems(50 + Math.ceil(Math.random() * 6) * 50, offset);

    offset += items.length;

    groups.push(createGroup(items, 'media', i));
  }

  return groups;
}

const GROUPS = createGroups();

const ITEMS = ([] as IExampleItem[]).concat(...GROUPS.map((group: { items: IExampleItem[]; }) => group.items));

declare class TilesListClass extends TilesList<IExampleItem> { }

const TilesListType: typeof TilesListClass = TilesList;

export class TilesListMediaExample extends React.Component<any, any> {
  private _selection: Selection;

  constructor() {
    super();

    this._selection = new Selection({
      getKey: (item: IExampleItem) => item.key,
    });

    this._selection.setItems(ITEMS);
  }
  public render(): JSX.Element {
    const items = getTileCells(GROUPS, {
      onRenderCell: this._onRenderMediaCell,
      onRenderHeader: this._onRenderHeader
    });

    return (
      <div style={ { padding: '4px' } }>
        <MarqueeSelection selection={ this._selection }>
          <TilesListType
            selection={ this._selection }
            items={ items }
          />
        </MarqueeSelection>
      </div>
    );
  }

  @autobind
  private _onRenderMediaCell(item: IExampleItem, finalSize: ITileSize): JSX.Element {
    return (
      <Tile
        className={ AnimationClassNames.fadeIn400 }
        selection={ this._selection }
        selectionIndex={ item.index }
        background={
          <img
            style={ { display: 'block' } }
            src={
              `//placehold.it/${Math.round(finalSize.width)}x${Math.round(finalSize.height)}`
            }
          />
        }
        showBackgroundFrame={ true }
        itemName={ item.name }
        itemActivity={ item.key }
      />
    );
  }

  @autobind
  private _onRenderHeader(item: IExampleItem): JSX.Element {
    return (
      <div>
        <h3>{ item.name }</h3>
      </div>
    );
  }
}
