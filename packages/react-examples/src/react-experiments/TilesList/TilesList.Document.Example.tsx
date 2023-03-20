import * as React from 'react';
import {
  TilesList,
  ITilesGridItem,
  ITilesGridSegment,
  ITilesGridItemCellProps,
} from '@fluentui/react-experiments/lib/TilesList';
import { Tile, ShimmerTile } from '@fluentui/react-experiments/lib/Tile';
import { Toggle } from '@fluentui/react/lib/Toggle';
import { Selection, SelectionZone } from '@fluentui/react/lib/Selection';
import { MarqueeSelection } from '@fluentui/react/lib/MarqueeSelection';
import { AnimationClassNames } from '@fluentui/react/lib/Styling';
import {
  IExampleGroup,
  IExampleItem,
  createGroup,
  createDocumentItems,
  getExampleTilesListCells,
  createShimmerGroups,
  onRenderTilesListExampleRoot,
  onRenderTilesListExampleRow,
} from '@fluentui/react-examples/lib/react-experiments/TilesList/ExampleHelpers';
import { ShimmerElementType, ShimmerElementsGroup } from '@fluentui/react/lib/Shimmer';
import { FLUENT_CDN_BASE_URL } from '@fluentui/style-utilities';

const HEADER_VERTICAL_PADDING = 13;
const HEADER_FONT_SIZE = 18;

function createGroups(): IExampleGroup[] {
  let offset = 0;

  const groups: IExampleGroup[] = [];

  for (let i = 0; i < 20; i++) {
    const items = createDocumentItems(50 + Math.ceil(Math.random() * 6) * 50, offset);

    offset += items.length;

    groups.push(createGroup(items, 'document', i));
  }

  return groups;
}

const GROUPS = createGroups();

const SHIMMER_GROUPS = createShimmerGroups('document', 0);

const ITEMS = ([] as IExampleItem[]).concat(...GROUPS.map((group: { items: IExampleItem[] }) => group.items));

export interface ITilesListDocumentExampleState {
  isModalSelection: boolean;
  isDataLoaded: boolean;
  cells: (ITilesGridItem<IExampleItem> | ITilesGridSegment<IExampleItem>)[];
  isFluentStyling: boolean;
}

export interface ITilesListDocumentExampleProps {
  tileSize: 'large' | 'small';
}

export class TilesListDocumentExample extends React.Component<
  ITilesListDocumentExampleProps,
  ITilesListDocumentExampleState
> {
  private _selection: Selection;

  constructor(props: ITilesListDocumentExampleProps) {
    super(props);

    this._selection = new Selection({
      getKey: (item: IExampleItem) => item.key,
      onSelectionChanged: this._onSelectionChange,
    });

    this._selection.setItems(ITEMS);

    this.state = {
      isModalSelection: this._selection.isModal(),
      isDataLoaded: false,
      isFluentStyling: false,
      cells: getExampleTilesListCells(SHIMMER_GROUPS, {
        onRenderCell: this._onRenderShimmerCell,
        onRenderHeader: this._onRenderShimmerHeader,
        size: props.tileSize,
        shimmerMode: true,
      }),
    };
  }

  public componentDidUpdate(
    previousProps: ITilesListDocumentExampleProps,
    prevState: ITilesListDocumentExampleState,
  ): void {
    const { isDataLoaded } = this.state;
    if (this.props.tileSize !== previousProps.tileSize || this.state.isFluentStyling !== prevState.isFluentStyling) {
      if (!isDataLoaded) {
        this.setState({
          cells: getExampleTilesListCells(SHIMMER_GROUPS, {
            onRenderCell: this._onRenderShimmerCell,
            onRenderHeader: this._onRenderShimmerHeader,
            size: this.props.tileSize,
            shimmerMode: true,
          }),
        });
      } else {
        this.setState({
          cells: getExampleTilesListCells(GROUPS, {
            onRenderCell: this._onRenderDocumentCell,
            onRenderHeader: this._onRenderHeader,
            size: this.props.tileSize,
          }),
        });
      }
    }
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
          label="Load Data Switch"
          checked={this.state.isDataLoaded}
          onChange={this._onToggleIsDataLoaded}
          onText="Loaded"
          offText="Loading..."
        />
        <Toggle
          label="Enable Fluent Styling"
          checked={this.state.isFluentStyling}
          onChange={this._onToggleIsFluentStyling}
          onText="Fluent"
          offText="Default"
        />
        <MarqueeSelection selection={this._selection}>
          <SelectionZone selection={this._selection} onItemInvoked={this._onItemInvoked} enterModalOnTouch={true}>
            <TilesList<IExampleItem>
              items={this.state.cells}
              role="grid"
              onRenderRoot={onRenderTilesListExampleRoot}
              onRenderRow={onRenderTilesListExampleRow}
            />
          </SelectionZone>
        </MarqueeSelection>
      </div>
    );
  }

  private _onToggleIsModalSelection = (event: React.MouseEvent<HTMLElement>, checked: boolean): void => {
    this._selection.setModal(checked);
  };

  private _onToggleIsDataLoaded = (event: React.MouseEvent<HTMLElement>, checked: boolean): void => {
    const { tileSize } = this.props;
    const { isDataLoaded } = this.state;
    let { cells } = this.state;

    if (cells.length && !cells[0].isPlaceholder) {
      cells = getExampleTilesListCells(SHIMMER_GROUPS, {
        onRenderCell: this._onRenderShimmerCell,
        onRenderHeader: this._onRenderShimmerHeader,
        shimmerMode: true,
        size: tileSize,
      });
    } else {
      cells = getExampleTilesListCells(GROUPS, {
        onRenderCell: this._onRenderDocumentCell,
        onRenderHeader: this._onRenderHeader,
        size: tileSize,
      });
    }

    this.setState({
      isDataLoaded: !isDataLoaded,
      cells: cells,
    });
  };

  private _onToggleIsFluentStyling = (event: React.MouseEvent<HTMLElement>, checked: boolean): void => {
    this.setState(
      {
        isFluentStyling: checked,
      },
      () => {
        console.log(this.state);
      },
    );
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

  private _onRenderDocumentCell = (props: ITilesGridItemCellProps<IExampleItem>): JSX.Element => {
    const { item } = props;

    const { tileSize } = this.props;
    const imgSize = tileSize === 'large' ? 64 : 48;

    return (
      <Tile
        role="gridcell"
        aria-colindex={props.position.column + 1}
        className={AnimationClassNames.fadeIn400}
        selection={this._selection}
        selectionIndex={item.index}
        isFluentStyling={this.state.isFluentStyling}
        invokeSelection={true}
        foreground={
          <img
            src={`${FLUENT_CDN_BASE_URL}/assets/item-types/${imgSize}/docx.png`}
            style={{
              display: 'block',
              width: `${imgSize}px`,
              height: `${imgSize}px`,
              margin: tileSize === 'large' ? '16px' : '7px',
            }}
          />
        }
        showForegroundFrame={true}
        itemName={item.name}
        itemActivity={item.key}
        tileSize={tileSize}
      />
    );
  };

  private _onRenderShimmerCell = (props: ITilesGridItemCellProps<IExampleItem>): JSX.Element => {
    const { finalSize } = props;

    const { tileSize } = this.props;

    return (
      <ShimmerTile
        role="presentation"
        contentSize={finalSize}
        itemName={true}
        itemActivity={true}
        itemThumbnail={true}
        tileSize={tileSize}
      />
    );
  };

  private _onRenderHeader = (props: ITilesGridItemCellProps<IExampleItem>): JSX.Element => {
    const { item } = props;

    return (
      <div
        role="gridcell"
        aria-colindex={props.position.column + 1}
        style={{
          padding: `${HEADER_VERTICAL_PADDING}px 0`,
          fontSize: `${HEADER_FONT_SIZE}px`,
          fontWeight: 700,
          lineHeight: `${HEADER_FONT_SIZE}px`,
        }}
      >
        {item.name}
      </div>
    );
  };

  private _onRenderShimmerHeader = (props: ITilesGridItemCellProps<IExampleItem>): JSX.Element => {
    return (
      <ShimmerElementsGroup
        shimmerElements={[
          { type: ShimmerElementType.line, height: HEADER_FONT_SIZE, width: '100%' }, // gap is given to maintain height
          { type: ShimmerElementType.gap, height: HEADER_VERTICAL_PADDING * 2 + HEADER_FONT_SIZE, width: 0 },
        ]}
      />
    );
  };
}
