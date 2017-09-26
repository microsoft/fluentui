
import * as React from 'react';
import { ITileProps, TileSize } from './Tile.Props';
import { Check } from 'office-ui-fabric-react/lib/Check';
import { SELECTION_CHANGE } from 'office-ui-fabric-react/lib/Selection';
import { css, BaseComponent, autobind, getId } from 'office-ui-fabric-react/lib/Utilities';
import { ISize } from '@uifabric/utilities';
import * as TileStylesModule from './Tile.scss';
import * as SignalStylesModule from '../signals/Signals.scss';
import * as CheckStylesModule from 'office-ui-fabric-react/lib/components/Check/Check.scss';

// tslint:disable:no-any
const TileStyles: any = TileStylesModule;
const SignalStyles: any = SignalStylesModule;
const CheckStyles: any = CheckStylesModule;
// tslint:enable:no-any

const enum TileLayoutValues {
  nameplatePadding = 12,
  largeNameplateNameHeight = 17,
  smallNameplateNameHeight = 14,
  nameplateMargin = 4,
  largeNameplateActivityHeight = 14,
  smallNameplateActivityHeight = 14,
  foregroundMargin = 16
}

export interface ITileState {
  isSelected?: boolean;
}

const SIZES: {
  [P in TileSize]: {
    nameplatePadding: number;
    nameplateNameHeight: number;
    nameplateMargin: number;
    nameplateActivityHeight: number;
    foregroundMargin: number;
  };
} = {
    small: {
      nameplatePadding: TileLayoutValues.nameplatePadding,
      nameplateNameHeight: TileLayoutValues.smallNameplateNameHeight,
      nameplateMargin: TileLayoutValues.nameplateMargin,
      nameplateActivityHeight: TileLayoutValues.smallNameplateActivityHeight,
      foregroundMargin: TileLayoutValues.foregroundMargin
    },
    large: {
      nameplatePadding: TileLayoutValues.nameplatePadding,
      nameplateNameHeight: TileLayoutValues.largeNameplateNameHeight,
      nameplateMargin: TileLayoutValues.nameplateMargin,
      nameplateActivityHeight: TileLayoutValues.largeNameplateActivityHeight,
      foregroundMargin: TileLayoutValues.foregroundMargin
    }
  };

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
  private _labelId: string;
  private _descriptionId: string;

  // tslint:disable-next-line:no-any
  constructor(props: ITileProps, context: any) {
    super(props, context);

    this._nameId = getId('Tile-name');
    this._activityId = getId('Tile-activity');
    this._labelId = getId('Tile-label');
    this._descriptionId = getId('Tile-description');

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
      hideBackground = false,
      hideForeground = false,
      itemName,
      itemActivity,
      componentRef,
      className,
      tileSize = 'large',
      contentSize,
      ariaLabel,
      descriptionAriaLabel,
      href,
      onClick,
      ...divProps
    } = this.props;

    const isSelectable = !!selection && selectionIndex > -1;

    const {
      isSelected = false
    } = this.state;

    return (
      <div
        aria-selected={ isSelected }
        { ...divProps }
        aria-labelledby={ ariaLabel ? this._labelId : this._nameId }
        aria-describedby={ descriptionAriaLabel ? this._descriptionId : this._activityId }
        className={ css('ms-Tile', className, TileStyles.tile, {
          [`ms-Tile--isSmall ${TileStyles.isSmall}`]: tileSize === 'small',
          [`ms-Tile--isLarge ${TileStyles.isLarge}`]: tileSize === 'large',
          [`ms-Tile--hasBackgroundFrame ${TileStyles.hasBackgroundFrame}`]: showBackgroundFrame,
          [`ms-Tile--hasForegroundFrame ${TileStyles.hasForegroundFrame}`]: showForegroundFrame,
          [`ms-Tile--isSelected ${TileStyles.selected} ${SignalStyles.selected}`]: isSelected,
          [`ms-Tile--isSelectable ${TileStyles.selectable}`]: isSelectable,
          [`ms-Tile--hasBackground ${TileStyles.hasBackground}`]: !!background,
          [SignalStyles.dark]: !!background && !hideBackground,
          [`ms-Tile--showBackground ${TileStyles.showBackground}`]: !hideBackground
        }) }
        data-is-focusable={ true }
        data-is-sub-focuszone={ true }
        data-disable-click-on-enter={ true }
        data-selection-index={ (selectionIndex > -1) ? selectionIndex : undefined }
      >
        <a
          href={ href }
          onClick={ onClick }
          data-selection-invoke={ (selectionIndex > -1) ? true : undefined }
          className={ css('ms-Tile-link', TileStyles.link) }
        >
          {
            ariaLabel ? (
              <span
                id={ this._labelId }
                className={ css('ms-Tile-label', TileStylesModule.label) }
              >
                { ariaLabel }
              </span>
            ) : null
          }
          {
            background ? this._onRenderBackground({
              background: background,
              hideBackground
            }) : null
          }
          {
            foreground ? this._onRenderForeground({
              foreground: foreground,
              hideForeground
            }) : null
          }
          {
            (itemName || itemActivity) ? this._onRenderNameplate({
              name: itemName,
              activity: itemActivity
            }) : null
          }
        </a>
        {
          descriptionAriaLabel ? (
            <span
              id={ this._descriptionId }
              className={ css('ms-Tile-description', TileStylesModule.description) }
            >
              { descriptionAriaLabel }
            </span>
          ) : null
        }
        {
          isSelectable ? this._onRenderCheck({
            isSelected: isSelected
          }) : null
        }
      </div>
    );
  }

  private _onRenderBackground({
    background,
    hideBackground
  }: {
      background: React.ReactNode | React.ReactNode[];
      hideBackground: boolean;
    }): JSX.Element {
    return (
      <span
        className={ css('ms-Tile-background', TileStyles.background, {
          [`ms-Tile-background--hide ${TileStyles.backgroundHide}`]: hideBackground
        }) }
      >
        { background }
      </span>
    );
  }

  private _onRenderForeground({
    foreground,
    hideForeground
  }: {
      foreground: React.ReactNode | React.ReactNode[];
      hideForeground: boolean;
    }): JSX.Element {
    return (
      <span
        role='presentation'
        className={ css('ms-Tile-aboveNameplate', TileStyles.aboveNameplate) }
      >
        <span
          role='presentation'
          className={ css('ms-Tile-content', TileStyles.content) }
        >
          <span
            role='presentation'
            className={ css('ms-Tile-foreground', TileStyles.foreground, {
              [`ms-Tile-foreground--hide ${TileStyles.foregroundHide}`]: hideForeground
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
        className={ css('ms-Tile-check', TileStyles.check, CheckStyles.checkHost) }
        data-selection-toggle={ true }
        role='checkbox'
        aria-checked={ isSelected }
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

export interface ITileLayout {
  foregroundSize?: ISize | undefined;
  backgroundSize?: ISize | undefined;
}

export function getTileLayout(tileElement: JSX.Element): ITileLayout {
  const tileProps: ITileProps = tileElement.props;

  const {
    contentSize,
    tileSize = 'large'
  } = tileProps;

  if (!contentSize) {
    return {};
  }

  const width = contentSize.width;

  const {
    nameplatePadding,
    nameplateMargin,
    nameplateActivityHeight,
    nameplateNameHeight,
    foregroundMargin
  } = SIZES[tileSize];

  let nameplateHeight = 0;

  if (tileProps.itemName || tileProps.itemActivity) {
    nameplateHeight += nameplatePadding * 2; // 12px top/bottom padding.
    if (tileProps.itemName) {
      nameplateHeight += nameplateNameHeight;
    }
    if (tileProps.itemActivity) {
      nameplateHeight += nameplateActivityHeight + nameplateMargin;
    }
  }

  return {
    foregroundSize: {
      width: width - foregroundMargin * 2,
      height: contentSize.height - foregroundMargin - nameplateHeight
    },
    backgroundSize: contentSize
  };
}

export function renderTileWithLayout(tileElement: JSX.Element, props: Partial<ITileProps>): JSX.Element {
  const Tag = tileElement.type;

  return (
    <Tag
      { ...tileElement.props }
      { ...props }
    />
  );
}
