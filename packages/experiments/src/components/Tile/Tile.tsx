
import * as React from 'react';
import { ITileProps } from './Tile.Props';
import { Check } from 'office-ui-fabric-react/lib/Check';
import { SELECTION_CHANGE } from 'office-ui-fabric-react/lib/utilities/selection/index';
import { css, BaseComponent, autobind, getId } from 'office-ui-fabric-react/lib/Utilities';
import * as TileStylesModule from './Tile.scss';
import * as SignalStylesModule from '../signals/Signals.scss';

const TileStyles: any = TileStylesModule;
const SignalStyles: any = SignalStylesModule;

export interface ITileState {
  isSelected?: boolean;
}

/**
 * A tile provides a frame for a potentially-selectable item which displays its contents prominently.
 *
 * @export
 * @class Tile
 * @extends {React.Component<ITileProps, ITileState>}
 */
export class Tile extends BaseComponent<ITileProps, ITileState> {
  private _nameId: string;
  private _activityId: string;

  constructor(props: ITileProps, context: any) {
    super(props, context);

    this._nameId = getId('Tile-name');
    this._activityId = getId('Tile-activity');

    const {
      selectionIndex = -1,
      selection
    } = props;

    const isSelected = !!selection && selectionIndex > -1 && selection.isIndexSelected(selectionIndex);

    this.state = {
      isSelected: isSelected
    };
  }

  public componentWillReceiveProps(nextProps: ITileProps): void {
    const {
      selection,
      selectionIndex
    } = this.props;

    const {
      selection: nextSelection,
      selectionIndex: nextSelectionIndex = -1
    } = nextProps;

    if (selection !== nextSelection || selectionIndex !== nextSelectionIndex) {
      const isSelected = !!nextSelection && nextSelectionIndex > -1 && nextSelection.isIndexSelected(nextSelectionIndex);

      this.setState({
        isSelected: isSelected
      });
    }
  }

  public componentDidMount(): void {
    const {
      selection
    } = this.props;

    if (selection) {
      this._events.on(selection, SELECTION_CHANGE, this._onSelectionChange);
    }
  }

  public componentDidUpdate(previousProps: ITileProps): void {
    const {
      selection
    } = this.props;

    const {
      selection: previousSelection
    } = previousProps;

    if (selection !== previousSelection) {
      if (previousSelection) {
        this._events.off(previousSelection);
      }

      if (selection) {
        this._events.on(selection, SELECTION_CHANGE, this._onSelectionChange);
      }
    }
  }

  public render(): JSX.Element {
    const {
      children,
      selectionIndex = -1,
      selection,
      background,
      foreground,
      showBackgroundFrame = false,
      showForegroundFrame = false,
      itemName,
      itemActivity,
      componentRef,
      className,
      ...aProps
    } = this.props;

    const isSelectable = !!selection && selectionIndex > -1;

    const {
      isSelected = false
    } = this.state;

    const Tag = aProps.href ? 'a' : 'span';

    return (
      <Tag
        { ...(aProps.href ? aProps : {}) }
        aria-labelledby={ this._nameId }
        aria-describedby={ this._activityId }
        className={ css('ms-Tile', className, TileStyles.tile, {
          [`ms-Tile--hasBackgroundFrame ${TileStyles.hasBackgroundFrame}`]: showBackgroundFrame,
          [`ms-Tile--isSelected ${TileStyles.selected} ${SignalStyles.selected}`]: isSelected,
          [`ms-Tile--isSelectable ${TileStyles.selectable}`]: isSelectable,
          [`ms-Tile--hasBackground ${TileStyles.hasBackground} ${SignalStyles.dark}`]: !!background
        }) }
        data-is-focusable={ true }
        data-is-sub-focuszone={ true }
        data-selection-invoke={ (selectionIndex > -1) ? true : undefined }
        data-selection-index={ (selectionIndex > -1) ? selectionIndex : undefined }
      >
        {
          background ? this._onRenderBackground({
            background: background
          }) : null
        }
        {
          foreground ? this._onRenderForeground({
            foreground: foreground,
            showForegroundFrame: showForegroundFrame
          }) : null
        }
        {
          (itemName || itemActivity) ? this._onRenderNameplate({
            name: itemName,
            activity: itemActivity
          }) : null
        }
        {
          isSelectable ? this._onRenderCheck({
            isSelected: isSelected
          }) : null
        }
      </Tag>
    );
  }

  private _onRenderBackground({
    background
  }: {
      background: React.ReactNode | React.ReactNode[]
    }): JSX.Element {
    return (
      <span className={ css('ms-Tile-background', TileStyles.background) }>
        { background }
      </span>
    );
  }

  private _onRenderForeground({
    foreground,
    showForegroundFrame
  }: {
      foreground: React.ReactNode | React.ReactNode[];
      showForegroundFrame: boolean;
    }): JSX.Element {
    return (
      <span
        role='presentation'
        className={ css('ms-Tile-content', TileStyles.content) }
      >
        <span
          role='presentation'
          className={ css('ms-Tile-foreground', TileStyles.foreground) }
        >
          <span
            role='presentation'
            className={ css('ms-Tile-frame', TileStyles.frame, {
              [`ms-Tile-frame--hasForegroundFrame ${TileStyles.hasForegroundFrame}`]: showForegroundFrame
            }) }
          >
            { foreground }
          </span>
        </span>
      </span>
    );
  }

  private _onRenderNameplate({
    name,
    activity
  }: {
      name: React.ReactNode | React.ReactNode[];
      activity: React.ReactNode | React.ReactNode[];
    }): JSX.Element {
    return (
      <span
        className={ css('ms-Tile-nameplate', TileStyles.nameplate) }
      >
        {
          name ? (
            <span
              id={ this._nameId }
              className={ css('ms-Tile-name', TileStyles.name) }
            >
              { name }
            </span>
          ) : null
        }
        {
          activity ? (
            <span
              id={ this._activityId }
              className={ css('ms-Tile-activity', TileStyles.activity) }
            >
              { activity }
            </span>
          ) : null
        }
      </span>
    );
  }

  private _onRenderCheck({
    isSelected
  }: {
      isSelected: boolean;
    }): JSX.Element {
    return (
      <button
        aria-label={ this.props.toggleSelectionAriaLabel }
        className={ css('ms-Tile-check', TileStyles.check) }
        data-selection-toggle={ true }
        role='checkbox'
      >
        <Check
          checked={ isSelected }
        />
      </button>
    );
  }

  @autobind
  private _onSelectionChange(): void {
    const {
      selection,
      selectionIndex = -1
    } = this.props;

    this.setState({
      isSelected: selectionIndex > -1 && selection && selection.isIndexSelected(selectionIndex)
    });
  }
}
