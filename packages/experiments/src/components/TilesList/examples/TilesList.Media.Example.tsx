import * as React from 'react';
import { TilesList, ITileSize, ITilesGridItem, ITilesGridSegment } from '@uifabric/experiments/lib/TilesList';
import { Tile, getTileLayout, renderTileWithLayout } from '@uifabric/experiments/lib/Tile';
import { Toggle } from 'office-ui-fabric-react/lib/Toggle';
import { Selection, SelectionZone } from 'office-ui-fabric-react/lib/Selection';
import { MarqueeSelection } from 'office-ui-fabric-react/lib/MarqueeSelection';
import { AnimationClassNames } from 'office-ui-fabric-react/lib/Styling';
import {
  IExampleGroup,
  IExampleItem,
  createGroup,
  createMediaItems,
  getTileCells
} from '@uifabric/experiments/lib/components/TilesList/examples/ExampleHelpers';
import * as TilesListExampleStylesModule from './TilesList.Example.scss';
import { lorem } from '@uifabric/example-data';
import { SignalField, SharedSignal, CommentsSignal } from '@uifabric/experiments/lib/Signals';

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

const ITEMS = ([] as IExampleItem[]).concat(...GROUPS.map((group: { items: IExampleItem[] }) => group.items));

declare class TilesListClass extends TilesList<IExampleItem> {}

const TilesListType: typeof TilesListClass = TilesList;

export interface ITilesListMediaExampleState {
  isModalSelection: boolean;
  nameplateOnlyOnHover: boolean;
  cells: (ITilesGridItem<IExampleItem> | ITilesGridSegment<IExampleItem>)[];
}

export class TilesListMediaExample extends React.Component<{}, ITilesListMediaExampleState> {
  private _selection: Selection;

  constructor(props: {}) {
    super(props);

    this._selection = new Selection({
      getKey: (item: IExampleItem) => item.key,
      onSelectionChanged: this._onSelectionChange
    });

    this._selection.setItems(ITEMS);

    this.state = {
      isModalSelection: this._selection.isModal(),
      nameplateOnlyOnHover: false,
      cells: getTileCells(GROUPS, {
        onRenderCell: this._onRenderMediaCell,
        onRenderHeader: this._onRenderHeader
      })
    };
  }

  public render(): JSX.Element {
    return (
      // tslint:disable-next-line:jsx-ban-props
      <div style={{ padding: '4px' }}>
        <Toggle
          label="Enable Modal Selection"
          checked={this.state.isModalSelection}
          onChange={this._onToggleIsModalSelection}
          onText="Modal"
          offText="Normal"
        />
        <Toggle
          label="Hide Nameplates Until Hovered"
          checked={this.state.nameplateOnlyOnHover}
          onChange={this._onToggleNameplateOnlyOnHover}
          onText="Shown on hover"
          offText="Always shown"
        />
        <MarqueeSelection selection={this._selection}>
          <SelectionZone selection={this._selection} onItemInvoked={this._onItemInvoked} enterModalOnTouch={true}>
            <TilesListType role="list" items={this.state.cells} />
          </SelectionZone>
        </MarqueeSelection>
      </div>
    );
  }

  private _onToggleIsModalSelection = (event: React.MouseEvent<HTMLElement>, checked: boolean): void => {
    this._selection.setModal(checked);
  };

  private _onToggleNameplateOnlyOnHover = (event: React.MouseEvent<HTMLElement>, checked: boolean): void => {
    this.setState({
      nameplateOnlyOnHover: checked,
      cells: getTileCells(GROUPS, {
        onRenderCell: this._onRenderMediaCell,
        onRenderHeader: this._onRenderHeader
      })
    });
  };

  private _onSelectionChange = (): void => {
    this.setState({
      isModalSelection: this._selection.isModal()
    });
  };

  private _onItemInvoked = (item: IExampleItem, index: number, event: Event): void => {
    event.stopPropagation();
    event.preventDefault();

    alert(`Invoked item '${item.name}'`);
  };

  private _onRenderMediaCell = (item: IExampleItem, finalSize: ITileSize): JSX.Element => {
    const pixelWidth = Math.round(finalSize.width);
    const pixelHeight = Math.round(finalSize.height);

    const tile = (
      <Tile
        role="listitem"
        aria-setsize={ITEMS.length}
        aria-posinset={item.index}
        contentSize={finalSize}
        className={AnimationClassNames.fadeIn400}
        selection={this._selection}
        selectionIndex={item.index}
        invokeSelection={true}
        background={
          <span /> // Placeholder
        }
        showBackgroundFrame={true}
        itemName={item.name}
        itemActivity={
          <>
            <div style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {pixelWidth}&#x205F;&times;&#x205F;{pixelHeight}&ensp;&middot;&ensp;3.14&nbsp;MB
            </div>
            <SignalField
              before={
                <>
                  <SharedSignal key={1} />
                  <CommentsSignal key={2} />
                </>
              }
            >
              {lorem(7)}
            </SignalField>
          </>
        }
        nameplateOnlyOnHover={this.state.nameplateOnlyOnHover}
      />
    );

    const { backgroundSize = { width: 0, height: 0 } } = getTileLayout(tile);

    return renderTileWithLayout(tile, {
      background: (
        <img
          className={TilesListExampleStyles.tileImage}
          src={`//placehold.it/${Math.round(backgroundSize.width)}x${Math.round(backgroundSize.height)}`}
        />
      )
    });
  };

  private _onRenderHeader = (item: IExampleItem): JSX.Element => {
    return (
      <div role="presentation">
        <h3>{item.name}</h3>
      </div>
    );
  };
}
