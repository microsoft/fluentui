import * as React from 'react';
import {
  BaseComponent,
  autobind,
  buttonProperties,
  anchorProperties,
  css,
  divProperties,
  getId,
  getNativeProps
} from '../../Utilities';
import { ICommandBar, ICommandBarProps } from './CommandBar.Props';
import { FocusZone, FocusZoneDirection } from '../../FocusZone';
import { ContextualMenu, IContextualMenuProps, IContextualMenuItem, hasSubmenuItems } from '../../ContextualMenu';
import { DirectionalHint } from '../../common/DirectionalHint';
import {
  Icon,
  IconName,
  IIconProps
} from '../../Icon';
import { FontClassNames } from '../../Styling';
import styles from './CommandBar.scss';
// const styles: any = stylesImport;

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
  public static defaultProps = {
    items: [],
    overflowItems: [],
    farItems: []
  };

  public refs: {
    [key: string]: React.ReactInstance;
    commandSurface: HTMLElement;
    farCommandSurface: HTMLElement;
    commandBarRegion: HTMLElement;
    searchSurface: HTMLElement;
    focusZone: FocusZone;
  };

  private _id: string;
  private _overflowWidth: number;
  private _commandItemWidths: { [key: string]: number };

  constructor(props: ICommandBarProps) {
    super(props);

    this.state = this._getStateFromProps(props);

    this._id = getId('CommandBar');
  }

  public componentDidMount() {
    this._updateItemMeasurements();
    this._updateRenderedItems();

    this._events.on(window, 'resize', this._updateRenderedItems);
  }

  public componentWillReceiveProps(nextProps: ICommandBarProps) {
    this.setState(this._getStateFromProps(nextProps));
    this._commandItemWidths = null;
  }

  public componentDidUpdate(prevProps: ICommandBarProps, prevStates: ICommandBarState) {
    if (!this._commandItemWidths) {
      this._updateItemMeasurements();
      this._updateRenderedItems();
    }
  }

  public render() {
    const { isSearchBoxVisible, searchPlaceholderText, className } = this.props;
    const { renderedItems, contextualMenuProps, expandedMenuItemKey, expandedMenuId, renderedOverflowItems, contextualMenuTarget, renderedFarItems } = this.state;
    let searchBox;

    if (isSearchBoxVisible) {
      searchBox = (
        <div className={ css('ms-CommandBarSearch', styles.search) } ref='searchSurface'>
          <input className={ css('ms-CommandBarSearch-input', styles.searchInput) } type='text' placeholder={ searchPlaceholderText } />
          <div className={ css(
            'ms-CommandBarSearch-iconWrapper ms-CommandBarSearch-iconSearchWrapper',
            styles.searchIconWrapper, styles.searchIconSearchWrapper) }>
            { Icon({ iconName: 'Search' }) }
          </div>
          <div className={ css(
            'ms-CommandBarSearch-iconWrapper ms-CommandBarSearch-iconClearWrapper',
            FontClassNames.small,
            styles.searchIconWrapper,
            styles.searchIconClearWrapper
          ) }>
            <Icon iconName='cancel' />
          </div>
        </div>
      );
    }

    return (
      <div className={ css('ms-CommandBar', styles.root, className) } ref='commandBarRegion'>
        { searchBox }
        <FocusZone ref='focusZone' direction={ FocusZoneDirection.horizontal } role='menubar' >
          <div className={ css('ms-CommandBar-primaryCommands', styles.primaryCommands) } ref='commandSurface'>
            { renderedItems.map((item, index) => (
              this._renderItemInCommandBar(item, index, expandedMenuItemKey)
            )).concat((renderedOverflowItems && renderedOverflowItems.length) ? [
              <div className={ css('ms-CommandBarItem', styles.item) } key={ OVERFLOW_KEY } ref={ OVERFLOW_KEY }>
                <button
                  type='button'
                  id={ this._id + OVERFLOW_KEY }
                  className={ css('ms-CommandBarItem-link', styles.itemLink, {
                    ['is-expanded ' + styles.itemLinkIsExpanded]: (expandedMenuItemKey === OVERFLOW_KEY)
                  }) }
                  onClick={ this._onOverflowClick }
                  role='menuitem'
                  aria-label={ this.props.elipisisAriaLabel || '' }
                  aria-haspopup={ true }
                  data-automation-id='commandBarOverflow'
                >
                  <Icon className={ css('ms-CommandBarItem-overflow', styles.itemOverflow) } iconName='more' />
                </button>
              </div>
            ] : []) }
          </div>
          <div className={ css('ms-CommandBar-sideCommands', styles.sideCommands) } ref='farCommandSurface'>
            { renderedFarItems.map((item, index) => (
              this._renderItemInCommandBar(item, index, expandedMenuItemKey, true)
            )) }
          </div>
        </FocusZone>
        { (contextualMenuProps) ?
          (<ContextualMenu
            className={ css('ms-CommandBar-menuHost') }
            isBeakVisible={ true }
            directionalHint={ DirectionalHint.bottomAutoEdge }
            { ...contextualMenuProps }
            targetElement={ contextualMenuTarget }
            labelElementId={ expandedMenuId }
            onDismiss={ this._onContextMenuDismiss }
          />
          ) : (null) }
      </div>
    );
  }

  public focus() {
    this.refs.focusZone.focus();
  }

  private _renderItemInCommandBar(item: IContextualMenuItem, index: number, expandedMenuItemKey: string, isFarItem?: boolean) {
    if (item.onRender) {
      return <div className={ css('ms-CommandBarItem', styles.item, item.className) } key={ item.key } ref={ item.key }>
        { item.onRender(item) }
      </div>;
    }

    const itemKey = item.key || String(index);
    const isLink = item.onClick || hasSubmenuItems(item);
    const className = css(
      isLink ? ('ms-CommandBarItem-link ' + styles.itemLink) : ('ms-CommandBarItem-text ' + styles.itemText),
      !item.name && ('ms-CommandBarItem--noName ' + styles.itemLinkIsNoName),
      (expandedMenuItemKey === item.key) && ('is-expanded ' + styles.itemLinkIsExpanded)
    );
    let hasIcon = !!item.icon || !!item.iconProps;

    return <div className={ css('ms-CommandBarItem', styles.item, item.className) } key={ itemKey } ref={ itemKey }>
      { (() => {
        if (isLink) {
          return <button
            { ...getNativeProps(item, buttonProperties) }
            id={ this._id + item.key }
            className={ className }
            onClick={ (ev) => this._onItemClick(ev, item) }
            data-command-key={ index }
            aria-haspopup={ hasSubmenuItems(item) }
            role='menuitem'
            aria-label={ item.ariaLabel || item.name }
          >
            { (hasIcon) ? this._renderIcon(item) : (null) }
            { (!!item.name) && (
              <span
                className={ css('ms-CommandBarItem-commandText', styles.itemCommandText) }
              >
                { item.name }
              </span>
            ) }
            { hasSubmenuItems(item) ? (
              <Icon className={ css('ms-CommandBarItem-chevronDown', styles.itemChevronDown) } iconName='ChevronDown' />
            ) : (null) }
          </button>;
        } else if (item.href) {
          return <a
            { ...getNativeProps(item, anchorProperties) }
            id={ this._id + item.key }
            className={ className }
            href={ item.href }
            data-command-key={ index }
            aria-haspopup={ hasSubmenuItems(item) }
            role='menuitem'
            aria-label={ item.ariaLabel || item.name }
          >
            { (hasIcon) ? this._renderIcon(item) : (null) }
            { (!!item.name) && (
              <span
                className={ css('ms-CommandBarItem-commandText', styles.itemCommandText) }
              >
                { item.name }
              </span>
            ) }
          </a>;
        } else {
          return <div
            { ...getNativeProps(item, divProperties) }
            id={ this._id + item.key }
            className={ className }
            data-command-key={ index }
            aria-haspopup={ hasSubmenuItems(item) }
          >
            { (hasIcon) ? this._renderIcon(item) : (null) }
            <span className={ css(
              'ms-CommandBarItem-commandText', styles.itemCommandText) } aria-hidden='true' role='presentation'>{ item.name }</span>
          </div>;
        }
      })() }
    </div>;
  }

  private _renderIcon(item: IContextualMenuItem) {
    // Only present to allow continued use of item.icon which is deprecated.
    let iconProps: IIconProps = item.iconProps ? item.iconProps : {
      iconName: item.icon as IconName
    };
    // Use the default icon color for the known icon names
    let iconColorClassName = iconProps.iconName === 'None' ? '' : ('ms-CommandBarItem-iconColor ' + styles.itemIconColor);
    let iconClassName = css('ms-CommandBarItem-icon', styles.itemIcon, iconColorClassName, iconProps.className);

    return <Icon { ...iconProps } className={ iconClassName } />;
  }

  private _updateItemMeasurements() {
    // the generated width for overflow is 35 in chrome, 38 in IE, but the actual value is 41.5
    if (this.refs[OVERFLOW_KEY] || (this.props.overflowItems && this.props.overflowItems.length)) {
      this._overflowWidth = OVERFLOW_WIDTH;
    } else {
      this._overflowWidth = 0;
    }

    if (!this._commandItemWidths) {
      this._commandItemWidths = {};
    }

    for (let i = 0; i < this.props.items.length; i++) {
      let item = this.props.items[i];

      if (!this._commandItemWidths[item.key]) {
        let el = this.refs[item.key] as HTMLElement;

        if (el) {
          this._commandItemWidths[item.key] = el.getBoundingClientRect().width;
        }
      }
    }
  }

  private _updateRenderedItems() {
    let { items, overflowItems } = this.props;
    let commandSurface = this.refs.commandSurface;
    let farCommandSurface = this.refs.farCommandSurface;
    let commandBarRegion = this.refs.commandBarRegion;
    let searchSurface = this.refs.searchSurface;
    let renderedItems = [].concat(items);
    let renderedOverflowItems = overflowItems;
    let consumedWidth = 0;
    let isOverflowVisible = overflowItems && overflowItems.length;

    let style = window.getComputedStyle(commandSurface);
    let availableWidth = commandBarRegion.clientWidth - parseInt(style.marginLeft, 10) - parseInt(style.marginRight, 10);
    if (searchSurface) {
      availableWidth -= searchSurface.getBoundingClientRect().width;
    }
    if (farCommandSurface) {
      availableWidth -= farCommandSurface.getBoundingClientRect().width;
    }

    if (isOverflowVisible) {
      availableWidth -= this._overflowWidth;
    }

    for (let i = 0; i < renderedItems.length; i++) {
      let item = renderedItems[i];
      let itemWidth = this._commandItemWidths[item.key];

      if ((consumedWidth + itemWidth) >= availableWidth) {
        if (i > 0 && !isOverflowVisible && (availableWidth - consumedWidth) < OVERFLOW_WIDTH) {
          i--;
        }

        renderedOverflowItems = renderedItems.splice(i).concat(overflowItems);
        break;
      } else {
        consumedWidth += itemWidth;
      }

    }

    let renderedContextualMenuProps = this._getContextualMenuPropsAfterUpdate(
      renderedItems.concat(this.state.renderedFarItems),
      renderedOverflowItems);

    this.setState({
      renderedItems: renderedItems,
      renderedOverflowItems: renderedOverflowItems,
      expandedMenuItemKey: renderedContextualMenuProps ? this.state.expandedMenuItemKey : null,
      contextualMenuProps: renderedContextualMenuProps,
      contextualMenuTarget: renderedContextualMenuProps ? this.state.contextualMenuTarget : null
    });
  }

  private _onItemClick(ev, item) {
    if (item.key === this.state.expandedMenuItemKey || !hasSubmenuItems(item)) {
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
  }

  @autobind
  private _onOverflowClick(ev) {
    if (this.state.expandedMenuItemKey === OVERFLOW_KEY) {
      this._onContextMenuDismiss();
    } else {
      this.setState({
        expandedMenuId: ev.currentTarget.id,
        expandedMenuItemKey: OVERFLOW_KEY,
        contextualMenuProps: { items: this.state.renderedOverflowItems },
        contextualMenuTarget: ev.currentTarget
      });
    }
  }

  @autobind
  private _onContextMenuDismiss(ev?: any) {
    if (!ev || !ev.relatedTarget || !this.refs.commandSurface.contains(ev.relatedTarget as HTMLElement)) {
      let { contextualMenuProps } = this.state;

      if (contextualMenuProps && contextualMenuProps.onDismiss) {
        this.state.contextualMenuProps.onDismiss(ev);
      }

      this.setState({
        expandedMenuItemKey: null,
        contextualMenuProps: null,
        contextualMenuTarget: null
      });
    } else {
      ev.stopPropagation();
      ev.preventDefault();
    }
  }

  private _getStateFromProps(nextProps: ICommandBarProps) {
    return {
      renderedItems: nextProps.items || [],
      renderedOverflowItems: null,
      contextualMenuProps: this._getContextualMenuPropsAfterUpdate(
        nextProps.items.concat(nextProps.farItems),
        nextProps.overflowItems),
      renderedFarItems: nextProps.farItems || null
    };
  }

  private _getContextualMenuPropsAfterUpdate(renderedItems: IContextualMenuItem[], overflowItems: IContextualMenuItem[]) {
    if (this.state && this.state.expandedMenuItemKey) {
      if (this.state.expandedMenuItemKey === OVERFLOW_KEY) {
        // Keep the overflow menu open
        return { items: overflowItems };
      } else {
        // Find the currently open key in the new props
        let matchingItem = renderedItems.filter(item => item.key === this.state.expandedMenuItemKey);

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
