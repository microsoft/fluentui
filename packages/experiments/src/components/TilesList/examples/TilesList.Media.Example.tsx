
import * as React from 'react';
import {
  TilesList,
  ITileSize
} from '../../TilesList';
import { Tile, getTileLayout, renderTileWithLayout } from '../../../Tile';
import { Selection, SelectionZone } from 'office-ui-fabric-react/lib/Selection';
import { MarqueeSelection } from 'office-ui-fabric-react/lib/MarqueeSelection';
import { autobind } from 'office-ui-fabric-react/lib/Utilities';
import { AnimationClassNames } from 'office-ui-fabric-react/lib/Styling';
import { IExampleGroup, IExampleItem, createGroup, createMediaItems, getTileCells } from './ExampleHelpers';
import * as TilesListExampleStylesModule from './TilesList.Example.scss';

// tslint:disable-next-line:no-any
const TilesListExampleStyles = TilesListExampleStylesModule as any;

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

export class TilesListMediaExample extends React.Component<{}, {}> {
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
      // tslint:disable-next-line:jsx-ban-props
      <div style={ { padding: '4px' } }>
        <MarqueeSelection selection={ this._selection }>
          <SelectionZone
            selection={ this._selection }
            onItemInvoked={ this._onItemInvoked }
          >
            <TilesListType
              items={ items }
            />
          </SelectionZone>
        </MarqueeSelection>
      </div>
    );
  }

  @autobind
  private _onItemInvoked(item: IExampleItem, index: number, event: Event): void {
    event.stopPropagation();
    event.preventDefault();

    alert(`Invoked item '${item.name}'`);
  }

  @autobind
  private _onRenderMediaCell(item: IExampleItem, finalSize: ITileSize): JSX.Element {
    const tile = (
      <Tile
        contentSize={ finalSize }
        className={ AnimationClassNames.fadeIn400 }
        selection={ this._selection }
        selectionIndex={ item.index }
        background={
          <span /> // Placeholder
        }
        showBackgroundFrame={ true }
        itemName={ item.name }
        itemActivity={ item.key }
      />
    );

    const {
      backgroundSize = { width: 0, height: 0 }
    } = getTileLayout(tile);

    return renderTileWithLayout(tile, {
      background: (
        <img
          className={ TilesListExampleStyles.tileImage }
          src={
            `//placehold.it/${Math.round(backgroundSize.width)}x${Math.round(backgroundSize.height)}`
          }
        />
      )
    });
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
