import * as React from 'react';
import {
  BaseComponent,
  css,
  getId,
  autobind,
  assign
} from '../../Utilities';
<<<<<<< HEAD
import { ICommandBar, ICommandBarProps, ICommandBarItemProps } from './CommandBar.Props';
import { SearchBox } from '../../SearchBox';
import { CommandButton } from '../../Button';
import { OverflowSet } from '../../OverflowSet';
import { ResizeGroup } from '../../ResizeGroup';
import { TooltipHost } from '../../Tooltip';

=======
import { ICommandBar, ICommandBarProps } from './CommandBar.Props';
import { FocusZone, FocusZoneDirection } from '../../FocusZone';
import { ContextualMenu, IContextualMenuProps, IContextualMenuItem, hasSubmenuItems } from '../../ContextualMenu';
import { CalloutLinkType } from '../../Callout';
import { DirectionalHint } from '../../common/DirectionalHint';
import {
  Icon,
  IconName,
  IIconProps
} from '../../Icon';
import { FontClassNames } from '../../Styling';
>>>>>>> commandbutton-to-actionbutton
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
            calloutProps={ { linkType: CalloutLinkType.attached } }
          />
          ) : (null)
        }
      </div >
>>>>>>> commandbutton-to-actionbutton
    );
  }

  public focus() {
    // this.refs.focusZone.focus();
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
