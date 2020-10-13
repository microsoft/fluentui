import * as React from 'react';
import {
  BaseComponent,
  buttonProperties,
  anchorProperties,
  css,
  divProperties,
  getId,
  getNativeProps
} from '../../Utilities';
import { ICommandBar, ICommandBarProps, ICommandBarItemProps } from './CommandBar.types';
import { FocusZone, FocusZoneDirection } from '../../FocusZone';
import { ContextualMenu, IContextualMenuProps, IContextualMenuItem } from '../../ContextualMenu';
import { hasSubmenu } from '../../utilities/contextualMenu/index';
import { DirectionalHint } from '../../common/DirectionalHint';
import {
  Icon,
  IIconProps
} from '../../Icon';
import { FontClassNames } from '../../Styling';
import { TooltipHost } from '../../Tooltip';
import * as stylesImport from './CommandBar.scss';
import { createRef } from '../../Utilities';

const styles: any = stylesImport;

const OVERFLOW_KEY = 'overflow';
const OVERFLOW_WIDTH = 41.5;

export interface ICommandBarState {
  renderedItems?: IContextualMenuItem[];
  renderedOverflowItems?: IContextualMenuItem[];
  expandedMenuItemKey?: string;
  expandedMenuId?: string;
  contextualMenuProps?: IContextualMenuProps;
  contextualMenuTarget?: HTMLElement;
  renderedFarItems?: IContextualMenuItem[];
}

export class CommandBar extends BaseComponent<ICommandBarProps, ICommandBarState> implements ICommandBar {
  public static defaultProps: ICommandBarProps = {
    items: [],
    overflowItems: [],
    farItems: []
  };

  public refs: {
    [key: string]: React.ReactInstance;
  };

  private _searchSurface = createRef<HTMLDivElement>();
  private _commandSurface = createRef<HTMLDivElement>();
  private _commandBarRegion = createRef<HTMLDivElement>();
  private _farCommandSurface = createRef<HTMLDivElement>();
  private _focusZone = createRef<FocusZone>();
  private _overflow = createRef<HTMLDivElement>();

  private _id: string;
  private _overflowWidth: number;
  private _commandItemWidths: { [key: string]: number } | null;

  constructor(props: ICommandBarProps) {
    super(props);

    this.state = this._getStateFromProps(props);

    this._id = getId('CommandBar');
  }

  public componentDidMount() {
    // Asynchronously update command bar layout to eliminate forced synchronous reflow
    this._asyncMeasure();
    this._events.on(window, 'resize', this._updateRenderedItems);
  }

  public componentWillReceiveProps(nextProps: ICommandBarProps) {
    this.setState(this._getStateFromProps(nextProps));
    this._commandItemWidths = null;
  }

  public componentDidUpdate(prevProps: ICommandBarProps, prevStates: ICommandBarState) {
    if (!this._commandItemWidths) {
      // Asynchronously update command bar layout to eliminate forced synchronous reflow
      this._asyncMeasure();
    }
  }

  public render() {
    const { isSearchBoxVisible, searchPlaceholderText, className } = this.props;
    const { renderedItems, contextualMenuProps, expandedMenuItemKey, expandedMenuId, renderedOverflowItems, contextualMenuTarget, renderedFarItems } = this.state;
    let searchBox;

    if (isSearchBoxVisible) {
      searchBox = (
        <div className={ css('ms-CommandBarSearch', styles.search) } ref={ this._searchSurface }>
          <input className={ css('ms-CommandBarSearch-input', styles.searchInput) } type='text' placeholder={ searchPlaceholderText } />
          <div
            className={ css(
              'ms-CommandBarSearch-iconWrapper ms-CommandBarSearch-iconSearchWrapper',
              styles.searchIconWrapper, styles.searchIconSearchWrapper) }
          >
            { <Icon iconName={ 'Search' } /> }
          </div>
          <div
            className={ css(
              'ms-CommandBarSearch-iconWrapper ms-CommandBarSearch-iconClearWrapper',
              FontClassNames.small,
              styles.searchIconWrapper,
              styles.searchIconClearWrapper
            ) }
          >
            <Icon iconName='cancel' />
          </div>
        </div>
      );
    }

    return (
      <div className={ css('ms-CommandBar', styles.root, className) } ref={ this._commandBarRegion }>
        { searchBox }
        <FocusZone componentRef={ this._focusZone } className={ styles.container } direction={ FocusZoneDirection.horizontal } role='menubar' >
          <div className={ css('ms-CommandBar-primaryCommands', styles.primaryCommands) } ref={ this._commandSurface }>
            { renderedItems!.map(item => (
              this._renderItemInCommandBar(item, expandedMenuItemKey!)
            )).concat((renderedOverflowItems && renderedOverflowItems.length) ? [
              <div className={ css('ms-CommandBarItem', styles.item) } key={ OVERFLOW_KEY } ref={ this._overflow }>
                <button
                  type='button'
                  id={ this._id + OVERFLOW_KEY }
                  className={ css('ms-CommandBarItem-link', styles.itemLink, {
                    ['is-expanded ' + styles.itemLinkIsExpanded]: (expandedMenuItemKey === OVERFLOW_KEY)
                  }) }
                  onClick={ this._onOverflowClick }
                  role='menuitem'
                  aria-expanded={ this.state.expandedMenuItemKey === OVERFLOW_KEY }
                  aria-label={ this.props.elipisisAriaLabel || '' }
                  aria-haspopup={ true }
                  data-automation-id='commandBarOverflow'
                >
                  <Icon className={ css('ms-CommandBarItem-overflow', styles.itemOverflow) } iconName='more' />
                </button>
              </div>
            ] : []) }
          </div>
          <div className={ css('ms-CommandBar-sideCommands', styles.sideCommands) } ref={ this._farCommandSurface }>
            { renderedFarItems!.map(item => (
              this._renderItemInCommandBar(item, expandedMenuItemKey!, true)
            )) }
          </div>
        </FocusZone>
        { (contextualMenuProps) ?
          (<ContextualMenu
            className={ css('ms-CommandBar-menuHost') }
            directionalHint={ DirectionalHint.bottomAutoEdge }
            { ...contextualMenuProps }
            target={ contextualMenuTarget }
            labelElementId={ expandedMenuId }
            onDismiss={ this._onContextMenuDismiss }
          />
          ) : (null)
        }
      </div >
    );
  }

  public focus() {
    const { value: focusZone } = this._focusZone;
    focusZone && focusZone.focus();
  }

  private _renderItemInCommandBar(item: ICommandBarItemProps, expandedMenuItemKey: string, isFarItem?: boolean) {
    if (item.onRender) {
      return (
        <div className={ css('ms-CommandBarItem', styles.item, item.className) } key={ item.key } ref={ item.key }>
          { item.onRender(item, this._onContextMenuDismiss) }
        </div>
      );
    }

    const itemKey = item.key;
    const isLink = item.onClick || hasSubmenu(item);
    const className = css(
      isLink ? ('ms-CommandBarItem-link ' + styles.itemLink) : ('ms-CommandBarItem-text ' + styles.itemText),
      !item.name && ('ms-CommandBarItem--noName ' + styles.itemLinkIsNoName),
      (expandedMenuItemKey === item.key) && ('is-expanded ' + styles.itemLinkIsExpanded),
      item.inactive ? styles.inactive : ''
    );

    let tooltipContent = '';

    if (item.title) {
        tooltipContent = item.title;
    }

    const hasIcon = !!item.icon || !!item.iconProps;
    const isNameVisible = !!item.name && !item.iconOnly;
    const ariaLabel = item.ariaLabel || (item.iconOnly ? item.name : undefined);

    let command: React.ReactNode;
    if (item.href) {
      // Allow the disabled property on anchor elements for commandbar
      command = (
        <a
          { ...getNativeProps(item, anchorProperties.concat(['disabled'])) }
          id={ this._id + item.key }
          className={ className }
          href={ item.disabled ? undefined : item.href }
          onClick={ item.onClick }
          title={''}
          aria-disabled={item.inactive}
          data-command-key={ itemKey }
          aria-haspopup={ hasSubmenu(item) }
          role='menuitem'
          aria-label={ ariaLabel }
        >
          { (hasIcon) ? this._renderIcon(item) : (null) }
          { isNameVisible && (
            <span
              className={ css('ms-CommandBarItem-commandText', styles.itemCommandText) }
            >
              { item.name }
            </span>
          ) }
        </a>
      );
    } else if (isLink) {
      command = (
        <button
          { ...getNativeProps(item, buttonProperties) }
          id={ this._id + item.key }
          className={ className }
          onClick={ this._onItemClick(item) }
          title={''}
          aria-disabled={item.inactive}
          data-command-key={ itemKey }
          aria-haspopup={ hasSubmenu(item) }
          aria-expanded={ hasSubmenu(item) ? expandedMenuItemKey === item.key : undefined }
          role='menuitem'
          aria-label={ ariaLabel }
        >
          { (hasIcon) ? this._renderIcon(item) : (null) }
          { isNameVisible && (
            <span
              className={ css('ms-CommandBarItem-commandText', styles.itemCommandText) }
            >
              { item.name }
            </span>
          ) }
          { hasSubmenu(item) ? (
            <Icon className={ css('ms-CommandBarItem-chevronDown', styles.itemChevronDown) } iconName='ChevronDown' />
          ) : (null) }
        </button>
      );
    } else {
      // Allow the disabled property on div elements for commandbar
      command = (
        <div
          { ...getNativeProps(item, divProperties.concat(['disabled'])) }
          id={ this._id + item.key }
          className={ className }
          title={''}
          aria-disabled={item.inactive}
          data-command-key={ itemKey }
          aria-haspopup={ hasSubmenu(item) }
          aria-label={ ariaLabel }
        >
          { (hasIcon) ? this._renderIcon(item) : (null) }
          { (isNameVisible) && (
            <span
              className={ css('ms-CommandBarItem-commandText', styles.itemCommandText) }
              aria-hidden='true'
              role='presentation'
            >
              { item.name }
            </span>
          ) }
        </div>
      );
    }

    if (item.iconOnly && item.name) {
      command = (
        <TooltipHost content={ item.name }>
          { command }
        </TooltipHost>
      );
    } else if (tooltipContent) {
      command = (
        <TooltipHost content={ tooltipContent }>
          { command }
        </TooltipHost>
      );
    }

    return (
      <div className={ css('ms-CommandBarItem', styles.item, item.className) } key={ itemKey } ref={ itemKey }>
        { command }
      </div>
    );
  }

  private _renderIcon(item: IContextualMenuItem) {
    // Only present to allow continued use of item.icon which is deprecated.
    const iconProps: IIconProps = item.iconProps ? item.iconProps : {
      iconName: item.icon
    };
    // Use the default icon color for the known icon names
    const iconColorClassName = iconProps.iconName === 'None' ? '' : ('ms-CommandBarItem-iconColor ' + styles.itemIconColor);
    const iconClassName = css('ms-CommandBarItem-icon', styles.itemIcon, iconColorClassName, iconProps.className);

    return <Icon { ...iconProps } className={ iconClassName } />;
  }

  private _asyncMeasure() {
    this._async.requestAnimationFrame(() => {
      this._updateItemMeasurements();
      this._updateRenderedItems();
    });
  }

  private _updateItemMeasurements() {
    // the generated width for overflow is 35 in chrome, 38 in IE, but the actual value is 41.5
    if (this._overflow.value || (this.props.overflowItems && this.props.overflowItems.length)) {
      this._overflowWidth = OVERFLOW_WIDTH;
    } else {
      this._overflowWidth = 0;
    }

    if (!this._commandItemWidths) {
      this._commandItemWidths = {};
    }

    for (let i = 0; i < this.props.items.length; i++) {
      const item = this.props.items[i];

      if (!this._commandItemWidths[item.key]) {
        const el = this.refs[item.key] as HTMLElement;

        if (el) {
          this._commandItemWidths[item.key] = el.getBoundingClientRect().width;
        }
      }
    }
  }

  private _updateRenderedItems() {
    const { items, overflowItems } = this.props;
    const commandSurface = this._commandSurface.value;
    const farCommandSurface = this._farCommandSurface.value;
    const commandBarRegion = this._commandBarRegion.value;
    const searchSurface = this._searchSurface.value;
    const renderedItems = [...items];
    let renderedOverflowItems = overflowItems;
    let consumedWidth = 0;
    const isOverflowVisible = overflowItems && overflowItems.length;

    if (!commandSurface || !commandBarRegion) {
      return;
    }

    const style = window.getComputedStyle(commandSurface);
    let availableWidth = commandBarRegion.clientWidth - parseInt(style.marginLeft!, 10) - parseInt(style.marginRight!, 10);
    if (searchSurface) {
      availableWidth -= searchSurface.getBoundingClientRect().width;
    }
    if (farCommandSurface) {
      availableWidth -= farCommandSurface.getBoundingClientRect().width;
    }

    if (isOverflowVisible) {
      availableWidth -= this._overflowWidth;
    }

    if (!this._commandItemWidths) {
      this._asyncMeasure();
      return;
    }

    for (let i = 0; i < renderedItems.length; i++) {
      const item = renderedItems[i];
      const itemWidth = this._commandItemWidths[item.key];

      if ((consumedWidth + itemWidth) >= availableWidth) {
        if (i > 0 && !isOverflowVisible && (availableWidth - consumedWidth) < OVERFLOW_WIDTH) {
          i--;
        }

        renderedOverflowItems = renderedItems.splice(i).concat(overflowItems!);
        break;
      } else {
        consumedWidth += itemWidth;
      }

    }

    const renderedContextualMenuProps = this._getContextualMenuPropsAfterUpdate(
      renderedItems.concat(this.state.renderedFarItems!),
      renderedOverflowItems!);

    this.setState({
      renderedItems: renderedItems,
      renderedOverflowItems: renderedOverflowItems,
      expandedMenuItemKey: renderedContextualMenuProps ? this.state.expandedMenuItemKey : undefined,
      contextualMenuProps: renderedContextualMenuProps!,
      contextualMenuTarget: renderedContextualMenuProps ? this.state.contextualMenuTarget : undefined
    });
  }

  private _onItemClick(item: IContextualMenuItem): (ev: React.MouseEvent<HTMLButtonElement>) => void {
    return (ev: React.MouseEvent<HTMLButtonElement>): void => {
      if (item.inactive) {
        return;
      }

      if (item.key === this.state.expandedMenuItemKey || !hasSubmenu(item)) {
        this._onContextMenuDismiss();
      } else {
        this.setState({
          expandedMenuId: ev.currentTarget.id,
          expandedMenuItemKey: item.key,
          contextualMenuProps: this._getContextualMenuPropsFromItem(item),
          contextualMenuTarget: ev.currentTarget
        });
      }
      if (item.onClick) {
        item.onClick(ev, item);
      }
    };
  }

  private _onOverflowClick = (ev: React.MouseEvent<HTMLButtonElement>) => {
    if (this.state.expandedMenuItemKey === OVERFLOW_KEY) {
      this._onContextMenuDismiss();
    } else {
      this.setState({
        expandedMenuId: ev.currentTarget.id,
        expandedMenuItemKey: OVERFLOW_KEY,
        contextualMenuProps: { items: this.state.renderedOverflowItems! },
        contextualMenuTarget: ev.currentTarget
      });
    }
  }

  private _onContextMenuDismiss = (ev?: any) => {
    const { value: commandSurface } = this._commandSurface;

    if (!ev || !ev.relatedTarget || commandSurface && !commandSurface.contains(ev.relatedTarget as HTMLElement)) {
      const { contextualMenuProps } = this.state;

      if (contextualMenuProps && contextualMenuProps.onDismiss) {
        this.state.contextualMenuProps!.onDismiss!(ev);
      }

      this.setState({
        expandedMenuItemKey: undefined,
        contextualMenuProps: undefined,
        contextualMenuTarget: undefined
      });
    } else {
      ev.stopPropagation();
      ev.preventDefault();
    }
  }

  private _getStateFromProps(nextProps: ICommandBarProps): ICommandBarState {
    return {
      renderedItems: nextProps.items || [],
      contextualMenuProps: this._getContextualMenuPropsAfterUpdate(
        nextProps.items.concat(nextProps.farItems!),
        nextProps.overflowItems!)!,
      renderedFarItems: nextProps.farItems || undefined
    };
  }

  private _getContextualMenuPropsAfterUpdate(renderedItems: IContextualMenuItem[], overflowItems: IContextualMenuItem[]) {
    if (this.state && this.state.expandedMenuItemKey) {
      if (this.state.expandedMenuItemKey === OVERFLOW_KEY) {
        // Keep the overflow menu open
        return { items: overflowItems };
      } else {
        // Find the currently open key in the new props
        const matchingItem = renderedItems.filter(item => item.key === this.state.expandedMenuItemKey);

        if (matchingItem.length === 1) {
          return this._getContextualMenuPropsFromItem(matchingItem[0]);
        }
      }
    }

    return null;
  }

  private _getContextualMenuPropsFromItem(item: IContextualMenuItem) {
    return item.subMenuProps || (item.items && { items: item.items });
  }
}
