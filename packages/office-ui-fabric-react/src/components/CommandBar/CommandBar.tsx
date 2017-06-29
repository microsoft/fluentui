import * as React from 'react';
import {
  BaseComponent,
  css,
  getId,
  autobind,
  assign
} from '../../Utilities';
import { ICommandBar, ICommandBarProps, ICommandBarItemProps } from './CommandBar.Props';
import { SearchBox } from '../../SearchBox';
import { CommandButton } from '../../Button';
import { OverflowSet } from '../../OverflowSet';
import { ResizeGroup } from '../../ResizeGroup';
import { TooltipHost } from '../../Tooltip';

import * as stylesImport from './CommandBar.scss';
const styles: any = stylesImport;

export interface ICommandBarData {
  primaryItems: ICommandBarItemProps[];
  overflowItems: ICommandBarItemProps[];
  farItems: ICommandBarItemProps[];
  onReduceData: (data: ICommandBarData) => ICommandBarData;
}

export class CommandBar extends BaseComponent<ICommandBarProps, any> implements ICommandBar {
  public static defaultProps: ICommandBarProps = {
    items: [],
    overflowItems: [],
    farItems: [],
    searchPlaceholderText: 'Search',
    elipisisIconProps: { iconName: 'More' }
  };

  private _id: string;

  constructor(props: ICommandBarProps) {
    super(props);
    this._id = getId('CommandBar');
  }

<<<<<<< HEAD
=======
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

>>>>>>> master
  public render() {
    const {
      isSearchBoxVisible,
      className,
      items,
      overflowItems,
      farItems,
      elipisisAriaLabel,
      elipisisIconProps,
      buttonStyles,
      onRenderButton = this._onRenderButton,
      onReduceData = this._onReduceData,
    } = this.props;

    let commandBardata: ICommandBarData = {
      primaryItems: items,
      overflowItems,
      farItems,
      onReduceData: this._onReduceData
    };

    return (
<<<<<<< HEAD
      <ResizeGroup
        data={ commandBardata }
        onReduceData={ onReduceData }
        onRenderData={ (data: ICommandBarData) => {
          return (
            <div className={ css('ms-CommandBar', styles.root) }>

              {/*Optional Search*/ }
              { isSearchBoxVisible &&
                this._onRenderSearch(this.props)
              }

              {/*Primary Items*/ }
              <OverflowSet
                className={ css(styles.primarySet) }
                items={ data.primaryItems }
                overflowItems={ data.overflowItems.length ? data.overflowItems : null }
                onRenderItem={ this._onRenderItems }
                onRenderOverflowButton={ (renderedOverflowItems: ICommandBarItemProps[]) => {
                  return (
                    this._onRenderButton({
                      key: 'oveflowButton',
                      styles: { buttonStyles },
                      ariaLabel: elipisisAriaLabel,
                      className: css(styles.overflowButton),
                      menuProps: { items: renderedOverflowItems },
                      menuIconProps: elipisisIconProps,
                    })
                  );
                } }
              />

              {/*Secondary Items*/ }
              <OverflowSet
                className={ css(styles.secondarySet) }
                items={ data.farItems }
                onRenderItem={ this._onRenderItems }
                onRenderOverflowButton={ () => null }
              />
            </div>
          );
        } }
      />
=======
      <div className={ css('ms-CommandBar', styles.root, className) } ref='commandBarRegion'>
        { searchBox }
        <FocusZone ref='focusZone' className={ styles.container } direction={ FocusZoneDirection.horizontal } role='menubar' >
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
            directionalHint={ DirectionalHint.bottomAutoEdge }
            { ...contextualMenuProps }
            targetElement={ contextualMenuTarget }
            labelElementId={ expandedMenuId }
            onDismiss={ this._onContextMenuDismiss }
          />
          ) : (null)
        }
      </div >
>>>>>>> master
    );
  }

  public focus() {
<<<<<<< HEAD
    // this.refs.focusZone.focus();
=======
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

  private _asyncMeasure() {
    this._async.requestAnimationFrame(() => {
      this._updateItemMeasurements();
      this._updateRenderedItems();
    });
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
>>>>>>> master
  }

  @autobind
  private _onReduceData(data: ICommandBarData): ICommandBarData {
    let { primaryItems, overflowItems, farItems, onReduceData } = data;
    let movedItem = primaryItems[primaryItems.length - 1];

    if (movedItem !== undefined) {
      movedItem.renderedInOverflow = true;
      return {
        primaryItems: primaryItems.slice(0, -1),
        overflowItems: overflowItems.concat(movedItem),
        farItems: farItems,
        onReduceData
      };
    }

    return undefined;
  }

  @autobind
  private _onRenderSearch(props) {
    const { searchBoxProps, searchPlaceholderText } = props;
    return (
      <SearchBox
        {...searchBoxProps }
        className={ css(styles.search, searchBoxProps.className) }
        labelText={ searchPlaceholderText } />
    );
  }

  @autobind
  private _onRenderItems(item: ICommandBarItemProps) {

    if (item.onRender) { return item.onRender(item); }

    const commandButtonProps = assign({}, item, {
      styles: assign({}, item.buttonStyles, this.props.buttonStyles),
      className: css(styles.commandButton, item.className),
      text: !item.iconOnly ? item.name : '',
      menuProps: item.subMenuProps,
    });

    if (item.iconOnly && item.name !== undefined) {
      return (
        <TooltipHost content={ item.name } >
          { this._onRenderButton(commandButtonProps) }
        </TooltipHost>
      );
    }

    return this._onRenderButton(commandButtonProps);
  }

  @autobind
  private _onRenderButton(item) {
    return <CommandButton {...item} />;
  }
}
