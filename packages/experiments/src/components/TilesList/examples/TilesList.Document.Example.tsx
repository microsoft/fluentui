
import * as React from 'react';
import {
  TilesList,
  ITilesGridItem,
  ITilesGridSegment
} from '../../TilesList';
import {
  Tile
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
  createShimmerGroups
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

const SHIMMER_GROUPS = createShimmerGroups('document', 0);

const ITEMS = ([] as IExampleItem[]).concat(...GROUPS.map((group: { items: IExampleItem[]; }) => group.items));

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
      cells: getTileCells(SHIMMER_GROUPS, {
        onRenderCell: this._onRenderShimmerCell,
        onRenderHeader: this._onRenderHeader,
        shimmerMode: true
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

    if (cells.length && !cells[0].isPlaceholder) {
      cells = getTileCells(SHIMMER_GROUPS, {
        onRenderCell: this._onRenderShimmerCell,
        onRenderHeader: this._onRenderHeader,
        shimmerMode: true
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

  private _onRenderShimmerCell(item: IExampleItem): JSX.Element {
    return (
      <Tile
        shimmerPlaceholder={ true }
        foreground={ <div /> } // placeholder
        itemName={ item.name } // placeholder
        itemActivity={ item.key } // placeholder
      />
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
