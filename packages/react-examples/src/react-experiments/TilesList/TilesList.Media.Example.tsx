import * as React from 'react';
import {
  TilesList,
  ITilesGridItem,
  ITilesGridSegment,
  ITilesGridItemCellProps,
} from '@fluentui/react-experiments/lib/TilesList';
import { Tile, getTileLayout, renderTileWithLayout } from '@fluentui/react-experiments/lib/Tile';
import { Toggle } from '@fluentui/react/lib/Toggle';
import { Selection, SelectionZone } from '@fluentui/react/lib/Selection';
import { MarqueeSelection } from '@fluentui/react/lib/MarqueeSelection';
import { AnimationClassNames } from '@fluentui/react/lib/Styling';
import {
  IExampleGroup,
  IExampleItem,
  createGroup,
  createMediaItems,
  getExampleTilesListCells,
  onRenderTilesListExampleRoot,
  onRenderTilesListExampleRow,
} from '@fluentui/react-examples/lib/react-experiments/TilesList/ExampleHelpers';
import * as TilesListExampleStylesModule from './TilesList.Example.scss';
import { lorem } from '@fluentui/example-data';
import { SignalField, SharedSignal, CommentsSignal } from '@fluentui/react-experiments/lib/Signals';

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
      onSelectionChanged: this._onSelectionChange,
    });

    this._selection.setItems(ITEMS);

    this.state = {
      isModalSelection: this._selection.isModal(),
      nameplateOnlyOnHover: false,
      cells: getExampleTilesListCells(GROUPS, {
        onRenderCell: this._onRenderMediaCell,
        onRenderHeader: this._onRenderHeader,
      }),
    };
  }

  public render(): JSX.Element {
    return (
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
            <TilesList<IExampleItem>
              onRenderRoot={onRenderTilesListExampleRoot}
              onRenderRow={onRenderTilesListExampleRow}
              items={this.state.cells}
              role="grid"
            />
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
      cells: getExampleTilesListCells(GROUPS, {
        onRenderCell: this._onRenderMediaCell,
        onRenderHeader: this._onRenderHeader,
      }),
    });
  };

  private _onSelectionChange = (): void => {
    this.setState({
      isModalSelection: this._selection.isModal(),
    });
  };

  private _onItemInvoked = (item: IExampleItem, index: number, event: Event): void => {
    event.stopPropagation();
    event.preventDefault();

    alert(`Invoked item '${item.name}'`);
  };

  private _onRenderMediaCell = (props: ITilesGridItemCellProps<IExampleItem>): JSX.Element => {
    const {
      finalSize,
      item,
      position: { column },
    } = props;

    const pixelWidth = Math.round(finalSize.width);
    const pixelHeight = Math.round(finalSize.height);

    const tile = (
      <Tile
        role="gridcell"
        aria-colindex={column + 1}
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
          src="https://res.cdn.office.net/files/fabric-cdn-prod_20230815.002/office-ui-fabric-react-assets/fluent-placeholder.svg"
          height={Math.round(backgroundSize.height)}
          width={Math.round(backgroundSize.width)}
        />
      ),
    });
  };

  private _onRenderHeader = (props: ITilesGridItemCellProps<IExampleItem>): JSX.Element => {
    const {
      item,
      position: { column },
    } = props;

    return (
      <div role="griditem" aria-colindex={column + 1}>
        <h3>{item.name}</h3>
      </div>
    );
  };
}
