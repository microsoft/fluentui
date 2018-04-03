
import * as React from 'react';
import {
  TilesList,
  ITilesGridItem,
  ITilesGridSegment,
  ITileSize
} from '../../TilesList';
import {
  Tile,
  ITileProps
} from '../../../Tile';
import { Toggle } from 'office-ui-fabric-react/lib/Toggle';
import { Selection, SelectionZone } from 'office-ui-fabric-react/lib/Selection';
import { MarqueeSelection } from 'office-ui-fabric-react/lib/MarqueeSelection';
import { AnimationClassNames } from 'office-ui-fabric-react/lib/Styling';
import {
  IExampleGroup,
  IExampleItem,
  createGroup,
  createDocumentItems,
  getTileCells,
  createShimmerGroup,
  getShimmerCells
} from './ExampleHelpers';

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

const ITEMS = ([] as IExampleItem[]).concat(...GROUPS.map((group: { items: IExampleItem[]; }) => group.items));

const SHIMMER_GROUP = createShimmerGroup();

declare class TilesListClass extends TilesList<IExampleItem> { }

const TilesListType: typeof TilesListClass = TilesList;

export interface ITilesListDocumentExampleState {
  isModalSelection: boolean;
  isDataLoaded: boolean;
  cells: (ITilesGridItem<IExampleItem> | ITilesGridSegment<IExampleItem>)[];
}

export class TilesListDocumentExample extends React.Component<{}, ITilesListDocumentExampleState> {
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
      isDataLoaded: false,
      cells: getShimmerCells(SHIMMER_GROUP, {
        onRenderCell: this._onRenderShimmerCell
      })
    };
  }

  public render(): JSX.Element {
    return (
      // tslint:disable-next-line:jsx-ban-props
      <div style={ { padding: '4px' } }>
        <Toggle
          label='Enable Modal Selection'
          checked={ this.state.isModalSelection }
          onChanged={ this._onToggleIsModalSelection }
          onText='Modal'
          offText='Normal'
        />
        <Toggle
          label='Load Data'
          checked={ this.state.isDataLoaded }
          onChanged={ this._onToggleIsDataLoaded }
          onText='Loaded'
          offText='Loading...'
        />
        <MarqueeSelection selection={ this._selection }>
          <SelectionZone
            selection={ this._selection }
            onItemInvoked={ this._onItemInvoked }
            enterModalOnTouch={ true }
          >
            <TilesListType
              role='list'
              items={ this.state.cells }
            />
          </SelectionZone>
        </MarqueeSelection>
      </div>
    );
  }

  private _onToggleIsModalSelection = (checked: boolean): void => {
    this._selection.setModal(checked);
  }

  private _onToggleIsDataLoaded = (checked: boolean): void => {
    const { isDataLoaded } = this.state;
    let { cells } = this.state;

    if (cells.length && cells[0].key !== 'shimmerGroup') {
      cells = getShimmerCells(SHIMMER_GROUP, {
        onRenderCell: this._onRenderShimmerCell
      });
    } else {
      cells = getTileCells(GROUPS, {
        onRenderCell: this._onRenderDocumentCell,
        onRenderHeader: this._onRenderHeader
      });
    }

    this.setState({
      isDataLoaded: !isDataLoaded,
      cells: cells
    });
  }

  private _onSelectionChange = (): void => {
    this.setState({
      isModalSelection: this._selection.isModal()
    });
  }

  private _onItemInvoked = (item: IExampleItem, index: number, event: Event): void => {
    event.stopPropagation();
    event.preventDefault();

    alert(`Invoked item '${item.name}'`);
  }

  private _onRenderDocumentCell = (item: IExampleItem): JSX.Element => {
    return (
      <Tile
        role='listitem'
        aria-setsize={ ITEMS.length }
        aria-posinset={ item.index }
        className={ AnimationClassNames.fadeIn400 }
        selection={ this._selection }
        selectionIndex={ item.index }
        invokeSelection={ true }
        foreground={
          <img
            src={
              `https://static2.sharepointonline.com/files/fabric/assets/brand-icons/document/svg/docx_48x1.svg`
            }
            style={
              {
                display: 'block',
                width: '40px',
                height: '40px',
                margin: '11px'
              }
            }
          />
        }
        showForegroundFrame={ true }
        itemName={ item.name }
        itemActivity={ item.key }
      />
    );
  }

  private _onRenderShimmerCell(content: IExampleItem, finalSize: ITileSize): JSX.Element {
    const tileProps: ITileProps = {
      itemName: (
        <div
          // tslint:disable-next-line:jsx-ban-props
          style={
            {
              width: `${(finalSize.width * 70) / 100}px`,
              height: '7px',
              // backgroundColor: '#f4f4f4'
            }
          }
        />
      ),
      itemActivity: (
        <div
          // tslint:disable-next-line:jsx-ban-props
          style={
            {
              width: `${(finalSize.width * 30) / 100}px`,
              height: '7px',
              // backgroundColor: '#f4f4f4'
            }
          }
        />
      ),
      showForegroundFrame: true,
      foreground: (
        <div
          // tslint:disable-next-line:jsx-ban-props
          style={
            {
              width: `${(finalSize.width * 45) / 100}px`,
              height: `${(finalSize.width * 45) / 100}px`,
              // backgroundColor: '#f4f4f4'
            }
          }
        />
      )
    };

    const shimmerTile: JSX.Element = (
      <div
        // tslint:disable-next-line:jsx-ban-props
        style={
          {
            width: `100%`,
            height: `100%`,
            backgroundColor: 'red'
          }
        }
      />
    );

    return (
      shimmerTile
      // <Tile { ...tileProps } />
    );
  }

  private _onRenderHeader = (item: IExampleItem): JSX.Element => {
    return (
      <div role='presentation'>
        <h3>{ item.name }</h3>
      </div>
    );
  }
}
