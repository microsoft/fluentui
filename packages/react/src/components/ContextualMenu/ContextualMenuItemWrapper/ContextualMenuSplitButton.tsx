import * as React from 'react';
import {
  buttonProperties,
  getNativeProps,
  KeyCodes,
  mergeAriaAttributeValues,
  memoizeFunction,
  Async,
  EventGroup,
  getId,
  composeComponentAs,
  IComponentAs,
} from '../../../Utilities';
import { ContextualMenuItem } from '../ContextualMenuItem';
import { getSplitButtonVerticalDividerClassNames } from '../ContextualMenu.classNames';
import { KeytipData } from '../../../KeytipData';
import { getIsChecked, getMenuItemAriaRole, hasSubmenu, isItemDisabled } from '../../../utilities/contextualMenu/index';
import { VerticalDivider } from '../../../Divider';
import { ContextualMenuItemWrapper } from './ContextualMenuItemWrapper';
import type { IContextualMenuItem } from '../ContextualMenu.types';
import type { IMenuItemClassNames } from '../ContextualMenu.classNames';
import type { IKeytipProps } from '../../../Keytip';
import type { IContextualMenuItemWrapperProps } from './ContextualMenuItemWrapper.types';
import { IContextualMenuItemProps } from '../ContextualMenuItem.types';

export interface IContextualMenuSplitButtonState {}

const TouchIdleDelay = 500; /* ms */

export class ContextualMenuSplitButton extends ContextualMenuItemWrapper {
  private _splitButton: HTMLDivElement;
  private _lastTouchTimeoutId: number | undefined;
  private _processingTouch: boolean;
  private _ariaDescriptionId: string;
  private _dismissLabelId: string;

  private _async: Async;
  private _events: EventGroup;

  private _getMemoizedMenuButtonKeytipProps = memoizeFunction((keytipProps: IKeytipProps) => {
    return {
      ...keytipProps,
      hasMenu: true,
    };
  });

  constructor(props: IContextualMenuItemWrapperProps) {
    super(props);

    this._async = new Async(this);
    this._events = new EventGroup(this);
    this._dismissLabelId = getId();
  }

  public componentDidMount() {
    if (this._splitButton && 'onpointerdown' in this._splitButton) {
      this._events.on(this._splitButton, 'pointerdown', this._onPointerDown, true);
    }
  }

  public componentWillUnmount(): void {
    this._async.dispose();
    this._events.dispose();
  }

  public render(): JSX.Element | null {
    const {
      item,
      classNames,
      index,
      focusableElementIndex,
      totalItemCount,
      hasCheckmarks,
      hasIcons,
      onItemMouseLeave,
      expandedMenuItemKey,
    } = this.props;

    const itemHasSubmenu = hasSubmenu(item);

    let { keytipProps } = item;
    if (keytipProps) {
      keytipProps = this._getMemoizedMenuButtonKeytipProps(keytipProps);
    }

    // Check for ariaDescription to set the _ariaDescriptionId and render a hidden span with
    // the description in it to be added to ariaDescribedBy
    const { ariaDescription } = item;
    if (ariaDescription) {
      this._ariaDescriptionId = getId();
    }

    const ariaChecked = getIsChecked(item) ?? undefined;

    return (
      <KeytipData keytipProps={keytipProps} disabled={isItemDisabled(item)}>
        {(keytipAttributes: any): JSX.Element => (
          <div
            data-ktp-target={keytipAttributes['data-ktp-target']}
            ref={(splitButton: HTMLDivElement) => (this._splitButton = splitButton)}
            role={getMenuItemAriaRole(item)}
            aria-label={item.ariaLabel}
            className={classNames.splitContainer}
            aria-disabled={isItemDisabled(item)}
            aria-expanded={itemHasSubmenu ? item.key === expandedMenuItemKey : undefined}
            aria-haspopup={true}
            aria-describedby={mergeAriaAttributeValues(
              item.ariaDescribedBy,
              ariaDescription ? this._ariaDescriptionId : undefined,
              keytipAttributes['aria-describedby'],
            )}
            aria-checked={ariaChecked}
            aria-posinset={focusableElementIndex + 1}
            aria-setsize={totalItemCount}
            onMouseEnter={this._onItemMouseEnterPrimary}
            onMouseLeave={
              onItemMouseLeave ? onItemMouseLeave.bind(this, { ...item, subMenuProps: null, items: null }) : undefined
            }
            onMouseMove={this._onItemMouseMovePrimary}
            onKeyDown={this._onItemKeyDown}
            onClick={this._executeItemClick}
            onTouchStart={this._onTouchStart}
            tabIndex={0}
            data-is-focusable={true}
            aria-roledescription={item['aria-roledescription']}
          >
            {this._renderSplitPrimaryButton(item, classNames, index, hasCheckmarks!, hasIcons!)}
            {this._renderSplitDivider(item)}
            {this._renderSplitIconButton(item, classNames, index, keytipAttributes)}
            {this._renderAriaDescription(ariaDescription, classNames.screenReaderText)}
          </div>
        )}
      </KeytipData>
    );
  }

  protected _onItemKeyDown = (ev: React.KeyboardEvent<HTMLElement>): void => {
    const { item, onItemKeyDown } = this.props;
    // eslint-disable-next-line deprecation/deprecation
    if (ev.which === KeyCodes.enter) {
      this._executeItemClick(ev);
      ev.preventDefault();
      ev.stopPropagation();
    } else if (onItemKeyDown) {
      onItemKeyDown(item, ev);
    }
  };

  protected _getSubmenuTarget = (): HTMLElement | undefined => {
    return this._splitButton;
  };

  protected _renderAriaDescription = (ariaDescription?: string, className?: string) => {
    // If ariaDescription is given, descriptionId will be assigned to ariaDescriptionSpan
    return ariaDescription ? (
      <span id={this._ariaDescriptionId} className={className}>
        {ariaDescription}
      </span>
    ) : null;
  };

  private _renderSplitPrimaryButton(
    item: IContextualMenuItem,
    // eslint-disable-next-line deprecation/deprecation
    classNames: IMenuItemClassNames,
    index: number,
    hasCheckmarks: boolean,
    hasIcons: boolean,
  ) {
    const { contextualMenuItemAs: ChildrenRenderer = ContextualMenuItem, onItemClick } = this.props;

    const itemProps: IContextualMenuItem = {
      key: item.key,
      disabled: isItemDisabled(item) || item.primaryDisabled,
      /* eslint-disable deprecation/deprecation */
      name: item.name,
      text: item.text || item.name,
      secondaryText: item.secondaryText,
      /* eslint-enable deprecation/deprecation */
      className: classNames.splitPrimary,
      canCheck: item.canCheck,
      isChecked: item.isChecked,
      checked: item.checked,
      iconProps: item.iconProps,
      id: this._dismissLabelId,
      onRenderIcon: item.onRenderIcon,
      data: item.data,
      'data-is-focusable': false,
    };

    const { itemProps: itemComponentProps } = item;

    return (
      <button {...getNativeProps(itemProps, buttonProperties)}>
        <ChildrenRenderer
          data-is-focusable={false}
          item={itemProps}
          classNames={classNames}
          index={index}
          onCheckmarkClick={hasCheckmarks && onItemClick ? onItemClick : undefined}
          hasIcons={hasIcons}
          {...itemComponentProps}
        />
      </button>
    );
  }

  private _renderSplitDivider(item: IContextualMenuItem) {
    const getDividerClassNames =
      item.getSplitButtonVerticalDividerClassNames || getSplitButtonVerticalDividerClassNames;
    return <VerticalDivider getClassNames={getDividerClassNames} />;
  }

  private _renderSplitIconButton(
    item: IContextualMenuItem,
    classNames: IMenuItemClassNames, // eslint-disable-line deprecation/deprecation
    index: number,
    keytipAttributes: any,
  ) {
    const { onItemMouseLeave, onItemMouseDown, openSubMenu, dismissSubMenu, dismissMenu } = this.props;

    let ChildrenRenderer: IComponentAs<IContextualMenuItemProps> = ContextualMenuItem;

    if (this.props.item.contextualMenuItemAs) {
      ChildrenRenderer = composeComponentAs(this.props.item.contextualMenuItemAs, ChildrenRenderer);
    }

    if (this.props.contextualMenuItemAs) {
      ChildrenRenderer = composeComponentAs(this.props.contextualMenuItemAs, ChildrenRenderer);
    }

    const itemProps: IContextualMenuItem = {
      onClick: this._onIconItemClick,
      disabled: isItemDisabled(item),
      className: classNames.splitMenu,
      subMenuProps: item.subMenuProps,
      submenuIconProps: item.submenuIconProps,
      split: true,
      key: item.key,
      'aria-labelledby': this._dismissLabelId,
    };

    const buttonProps = {
      ...getNativeProps<React.ButtonHTMLAttributes<HTMLButtonElement>>(itemProps, buttonProperties),
      ...{
        onMouseEnter: this._onItemMouseEnterIcon,
        onMouseLeave: onItemMouseLeave ? onItemMouseLeave.bind(this, item) : undefined,
        onMouseDown: (ev: React.MouseEvent<HTMLButtonElement>) =>
          onItemMouseDown ? onItemMouseDown(item, ev) : undefined,
        onMouseMove: this._onItemMouseMoveIcon,
        'data-is-focusable': false,
        'data-ktp-execute-target': keytipAttributes['data-ktp-execute-target'],
        'aria-haspopup': true,
      },
    };

    const { itemProps: itemComponentProps } = item;

    return (
      <button {...buttonProps}>
        <ChildrenRenderer
          componentRef={item.componentRef}
          item={itemProps}
          classNames={classNames}
          index={index}
          hasIcons={false}
          openSubMenu={openSubMenu}
          dismissSubMenu={dismissSubMenu}
          dismissMenu={dismissMenu}
          getSubmenuTarget={this._getSubmenuTarget}
          {...itemComponentProps}
        />
      </button>
    );
  }

  private _onItemMouseEnterPrimary = (ev: React.MouseEvent<HTMLElement>): void => {
    const { item, onItemMouseEnter } = this.props;
    if (onItemMouseEnter) {
      onItemMouseEnter({ ...item, subMenuProps: undefined, items: undefined }, ev, this._splitButton);
    }
  };

  private _onItemMouseEnterIcon = (ev: React.MouseEvent<HTMLElement>): void => {
    const { item, onItemMouseEnter } = this.props;
    if (onItemMouseEnter) {
      onItemMouseEnter(item, ev, this._splitButton);
    }
  };

  private _onItemMouseMovePrimary = (ev: React.MouseEvent<HTMLElement>): void => {
    const { item, onItemMouseMove } = this.props;
    if (onItemMouseMove) {
      onItemMouseMove({ ...item, subMenuProps: undefined, items: undefined }, ev, this._splitButton);
    }
  };

  private _onItemMouseMoveIcon = (ev: React.MouseEvent<HTMLElement>): void => {
    const { item, onItemMouseMove } = this.props;
    if (onItemMouseMove) {
      onItemMouseMove(item, ev, this._splitButton);
    }
  };

  private _onIconItemClick = (ev: React.MouseEvent<HTMLElement>): void => {
    const { item, onItemClickBase } = this.props;
    if (onItemClickBase) {
      onItemClickBase(item, ev, (this._splitButton ? this._splitButton : ev.currentTarget) as HTMLElement);
    }
  };

  private _executeItemClick = (ev: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>): void => {
    const { item, executeItemClick, onItemClick } = this.props;

    if (item.disabled || item.isDisabled) {
      return;
    }

    if (this._processingTouch && !item.canCheck && onItemClick) {
      return onItemClick(item, ev);
    }

    if (executeItemClick) {
      executeItemClick(item, ev);
    }
  };

  private _onTouchStart = (ev: React.TouchEvent<HTMLElement>): void => {
    if (this._splitButton && !('onpointerdown' in this._splitButton)) {
      this._handleTouchAndPointerEvent(ev);
    }
  };

  private _onPointerDown = (ev: PointerEvent): void => {
    if (ev.pointerType === 'touch') {
      this._handleTouchAndPointerEvent(ev);
      ev.preventDefault();
      ev.stopImmediatePropagation();
    }
  };

  private _handleTouchAndPointerEvent(ev: React.TouchEvent<HTMLElement> | PointerEvent) {
    const { onTap } = this.props;

    if (onTap) {
      onTap(ev);
    }
    // If we already have an existing timeout from a previous touch/pointer event
    // cancel that timeout so we can set a new one.
    if (this._lastTouchTimeoutId) {
      this._async.clearTimeout(this._lastTouchTimeoutId);
      this._lastTouchTimeoutId = undefined;
    }
    this._processingTouch = true;
    this._lastTouchTimeoutId = this._async.setTimeout(() => {
      this._processingTouch = false;
      this._lastTouchTimeoutId = undefined;
    }, TouchIdleDelay);
  }
}
