import * as React from 'react';
import { Check } from '@fluentui/react/lib/Check';
import { SELECTION_CHANGE } from '@fluentui/react/lib/Selection';
import {
  css,
  initializeComponentRef,
  getId,
  getNativeProps,
  divProperties,
  EventGroup,
  composeRenderFunction,
} from '../../Utilities';
import * as TileStylesModule from './Tile.scss';
import * as SignalStylesModule from '../signals/Signal.scss';
import * as CheckStylesModule from './Check.scss';
import type {
  ITileBackgroundProps,
  ITileForegroundProps,
  ITileLayout,
  ITileNameplateProps,
  ITileProps,
  TileSize,
} from './Tile.types';

const TileStyles: any = TileStylesModule;
const SignalStyles: any = SignalStylesModule;
const CheckStyles: any = CheckStylesModule;

export const TileLayoutValues = {
  nameplatePadding: 12 as 12,
  largeNameplateNameHeight: 15 as 15,
  smallNameplateNameHeight: 12 as 12,
  nameplateMargin: 0 as 0,
  largeNameplateActivityHeight: 20 as 20,
  smallNameplateActivityHeight: 20 as 20,
  foregroundMargin: 16 as 16,
};

export type TileLayoutValues = (typeof TileLayoutValues)[keyof typeof TileLayoutValues];

export interface ITileState {
  isSelected?: boolean;
  isModal?: boolean;
}

export const TileLayoutSizes: {
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
    foregroundMargin: TileLayoutValues.foregroundMargin,
  },
  large: {
    nameplatePadding: TileLayoutValues.nameplatePadding,
    nameplateNameHeight: TileLayoutValues.largeNameplateNameHeight,
    nameplateMargin: TileLayoutValues.nameplateMargin,
    nameplateActivityHeight: TileLayoutValues.largeNameplateActivityHeight,
    foregroundMargin: TileLayoutValues.foregroundMargin,
  },
};

/**
 * A tile provides a frame for a potentially-selectable item which displays its contents prominently.
 */
export class Tile extends React.Component<ITileProps, ITileState> {
  private _nameId: string;
  private _activityId: string;
  private _labelId: string;
  private _descriptionId: string;
  private _events: EventGroup;

  constructor(props: ITileProps, context: any) {
    super(props, context);

    initializeComponentRef(this);

    this._nameId = getId('Tile-name');
    this._activityId = getId('Tile-activity');
    this._labelId = getId('Tile-label');
    this._descriptionId = getId('Tile-description');

    const { selectionIndex = -1, selection } = props;

    const isSelected = !!selection && selectionIndex > -1 && selection.isIndexSelected(selectionIndex);
    const isModal = !!selection && !!selection.isModal && selection.isModal();

    this.state = {
      isSelected: isSelected,
      isModal: isModal,
    };

    this._events = new EventGroup(this);
  }

  public UNSAFE_componentWillReceiveProps(nextProps: ITileProps): void {
    const { selection, selectionIndex } = this.props;

    const { selection: nextSelection, selectionIndex: nextSelectionIndex = -1 } = nextProps;

    if (selection !== nextSelection || selectionIndex !== nextSelectionIndex) {
      const isSelected =
        !!nextSelection && nextSelectionIndex > -1 && nextSelection.isIndexSelected(nextSelectionIndex);
      const isModal = !!nextSelection && nextSelection.isModal && nextSelection.isModal();

      this.setState({
        isSelected: isSelected,
        isModal: isModal,
      });
    }
  }

  public componentDidMount(): void {
    const { selection } = this.props;

    if (selection) {
      this._events.on(selection, SELECTION_CHANGE, this._onSelectionChange);
    }
  }

  public componentDidUpdate(previousProps: ITileProps): void {
    const { selection } = this.props;

    const { selection: previousSelection } = previousProps;

    if (selection !== previousSelection) {
      if (previousSelection) {
        this._events.off(previousSelection);
      }

      if (selection) {
        this._events.on(selection, SELECTION_CHANGE, this._onSelectionChange);
      }
    }
  }

  public componentWillUnmount(): void {
    this._events.dispose();
  }

  public render(): JSX.Element {
    const {
      children,
      selectionIndex = -1,
      invokeSelection = false,
      selection,
      background: propsBackground,
      foreground: propsForeground,
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
      download,
      hrefLang,
      media,
      rel,
      target,
      isFluentStyling,
      ariaLabelSelected,
      nameplateOnlyOnHover,
      disabled = false,
      onRenderBackground: propsOnRenderBackground,
      onRenderForeground: propsOnRenderForeground,
      onRenderNameplate: propsOnRenderNameplate,
      ...divProps
    } = this.props;

    const { isSelected = false, isModal = false } = this.state;

    const { isSelectable = !disabled && !!selection && selectionIndex > -1 } = this.props;
    const isInvokable = (!!href || !!onClick || !!invokeSelection) && !isModal;
    const ariaLabelWithSelectState = isSelected && ariaLabelSelected ? `${ariaLabel}, ${ariaLabelSelected}` : ariaLabel;

    const tileLayout = getTileLayoutFromProps(this.props);

    const background = typeof propsBackground === 'function' ? propsBackground(tileLayout) : propsBackground;
    const foreground = typeof propsForeground === 'function' ? propsForeground(tileLayout) : propsForeground;

    const onRenderBackground = propsOnRenderBackground
      ? composeRenderFunction(propsOnRenderBackground, this._onRenderBackground)
      : this._onRenderBackground;
    const onRenderForeground = propsOnRenderForeground
      ? composeRenderFunction(propsOnRenderForeground, this._onRenderForeground)
      : this._onRenderForeground;
    const onRenderNameplate = propsOnRenderNameplate
      ? composeRenderFunction(propsOnRenderNameplate, this._onRenderNameplate)
      : this._onRenderNameplate;

    const content = (
      <>
        {ariaLabel ? (
          <span key="label" id={this._labelId} className={css('ms-Tile-label', TileStylesModule.label)}>
            {ariaLabelWithSelectState}
          </span>
        ) : null}
        {onRenderBackground({
          background,
          hideBackground,
          ...tileLayout,
          isSelected,
        })}
        {onRenderForeground({
          foreground,
          hideForeground,
          ...tileLayout,
          isSelected,
        })}
        {onRenderNameplate({
          itemName,
          itemActivity,
          nameplateOnlyOnHover,
          ...tileLayout,
          isSelected,
        })}
      </>
    );

    const LinkAs = href ? 'a' : onClick ? 'button' : 'span';

    const link = (
      <LinkAs
        href={href}
        onClick={onClick}
        download={download}
        hrefLang={hrefLang}
        media={media}
        target={target}
        rel={rel === undefined ? (href && target ? 'noopener' : undefined) : rel}
        ref={this.props.linkRef}
        data-selection-invoke={isInvokable && selectionIndex > -1 ? true : undefined}
        className={css('ms-Tile-link', TileStyles.link)}
      >
        {content}
      </LinkAs>
    );

    return (
      <div
        aria-selected={isSelected}
        {...getNativeProps(divProps, divProperties)}
        aria-labelledby={ariaLabel ? this._labelId : this._nameId}
        aria-describedby={ariaLabelWithSelectState || descriptionAriaLabel ? this._descriptionId : this._activityId}
        aria-disabled={disabled || undefined}
        className={css('ms-Tile', className, TileStyles.tile, {
          [`ms-Tile--isSmall ${TileStyles.isSmall}`]: tileSize === 'small',
          [`ms-Tile--isLarge ${TileStyles.isLarge}`]: tileSize === 'large',
          [`ms-Tile--hasBackgroundFrame ${TileStyles.hasBackgroundFrame}`]: showBackgroundFrame,
          [`ms-Tile--hasForegroundFrame ${TileStyles.hasForegroundFrame}`]: showForegroundFrame,
          [`ms-Tile--isSelected ${TileStyles.selected} ${SignalStyles.selected}`]: isSelected,
          [`ms-Tile--isSelectable ${TileStyles.selectable}`]: isSelectable,
          [`ms-Tile--hasBackground ${TileStyles.hasBackground}`]: !!background,
          [SignalStyles.dark]: !!background && !hideBackground,
          [`ms-Tile--showBackground ${TileStyles.showBackground}`]: !hideBackground,
          [`ms-Tile--invokable ${TileStyles.invokable}`]: isInvokable,
          [`ms-Tile--uninvokable ${TileStyles.uninvokable}`]: !isInvokable,
          [`ms-Tile--isDisabled ${TileStyles.disabled}`]: disabled,
          [`ms-Tile--showCheck ${TileStyles.showCheck}`]: isModal,
          [`ms-Tile--isFluentStyling ${TileStyles.isFluentStyling}`]: isFluentStyling,
        })}
        data-selection-disabled={disabled || undefined}
        data-is-focusable={true}
        data-is-sub-focuszone={true}
        data-disable-click-on-enter={true}
        data-selection-index={selectionIndex > -1 ? selectionIndex : undefined}
        data-selection-touch-invoke={isInvokable && selectionIndex > -1 ? true : undefined}
      >
        {link}
        {descriptionAriaLabel ? (
          <span key="description" role="presentation" hidden={true} id={this._descriptionId}>
            {descriptionAriaLabel}
          </span>
        ) : null}
        {isSelectable
          ? this._onRenderCheck({
              isSelected: isSelected,
            })
          : null}
      </div>
    );
  }

  private _onRenderBackground = (backgroundProps?: ITileBackgroundProps): JSX.Element | null => {
    if (!backgroundProps) {
      return null;
    }

    const { background, hideBackground, className } = backgroundProps;

    return background ? (
      <span
        key="background"
        className={css(
          'ms-Tile-background',
          TileStyles.background,
          {
            [`ms-Tile-background--hide ${TileStyles.backgroundHide}`]: hideBackground,
          },
          className,
        )}
      >
        {background}
      </span>
    ) : null;
  };

  private _onRenderForeground = (foregroundProps?: ITileForegroundProps): JSX.Element | null => {
    if (!foregroundProps) {
      return null;
    }

    const { foreground, hideForeground, className } = foregroundProps;

    return foreground ? (
      <span key="foreground" role="presentation" className={css('ms-Tile-aboveNameplate', TileStyles.aboveNameplate)}>
        <span role="presentation" className={css('ms-Tile-content', TileStyles.content)}>
          <span
            role="presentation"
            className={css(
              'ms-Tile-foreground',
              TileStyles.foreground,
              {
                [`ms-Tile-foreground--hide ${TileStyles.foregroundHide}`]: hideForeground,
              },
              className,
            )}
          >
            {foreground}
          </span>
        </span>
      </span>
    ) : null;
  };

  private _onRenderNameplate = (nameplateProps?: ITileNameplateProps): JSX.Element | null => {
    if (!nameplateProps) {
      return null;
    }

    const { itemName, itemActivity, nameplateOnlyOnHover, className } = nameplateProps;

    return itemName || itemActivity ? (
      <span
        key="nameplate"
        className={css(
          'ms-Tile-nameplate',
          TileStyles.nameplate,
          { [TileStyles.onlyOnHover]: nameplateOnlyOnHover },
          className,
        )}
      >
        {itemName ? (
          <span id={this._nameId} className={css('ms-Tile-name', TileStyles.name)}>
            {itemName}
          </span>
        ) : null}
        {itemActivity ? (
          <span id={this._activityId} className={css('ms-Tile-activity', TileStyles.activity)}>
            {itemActivity}
          </span>
        ) : null}
      </span>
    ) : null;
  };

  private _onRenderCheck({ isSelected }: { isSelected: boolean }): JSX.Element {
    const { toggleSelectionAriaLabel } = this.props;

    return (
      <span
        key="check"
        role="checkbox"
        aria-label={toggleSelectionAriaLabel}
        className={css('ms-Tile-check', TileStyles.check, CheckStyles.checkHost, {
          [CheckStyles.hostShowCheck]: this.state.isModal,
        })}
        data-selection-toggle={true}
        aria-checked={isSelected}
      >
        <Check checked={isSelected} />
      </span>
    );
  }

  private _onSelectionChange = (): void => {
    const { selection, selectionIndex = -1 } = this.props;

    const isSelected = selectionIndex > -1 && !!selection && selection.isIndexSelected(selectionIndex);
    const isModal = !!selection && !!selection.isModal && selection.isModal();

    this.setState({
      isSelected: isSelected,
      isModal: isModal,
    });
  };
}

export type { ITileLayout };

export function getTileLayout(tileElement: JSX.Element): ITileLayout {
  const tileProps: ITileProps = tileElement.props;

  return getTileLayoutFromProps(tileProps);
}

function getTileLayoutFromProps(tileProps: ITileProps): ITileLayout {
  const { contentSize, tileSize = 'large' } = tileProps;

  if (!contentSize) {
    return {};
  }

  const width = contentSize.width;

  const { nameplatePadding, nameplateMargin, nameplateActivityHeight, nameplateNameHeight, foregroundMargin } =
    TileLayoutSizes[tileSize];

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
      height: contentSize.height - foregroundMargin - nameplateHeight,
    },
    backgroundSize: contentSize,
  };
}

export function renderTileWithLayout(tileElement: JSX.Element, props: Partial<ITileProps>): JSX.Element {
  const Tag = tileElement.type;

  return <Tag {...tileElement.props} {...props} />;
}
