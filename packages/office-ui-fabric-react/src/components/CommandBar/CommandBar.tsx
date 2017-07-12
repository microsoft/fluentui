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

<<<<<<< HEAD
export class CommandBar extends BaseComponent<ICommandBarProps, any> implements ICommandBar {
=======
export class CommandBar extends BaseComponent<ICommandBarProps, ICommandBarState> implements ICommandBar {
>>>>>>> 5.0
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

<<<<<<< HEAD
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
=======
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

  private _onItemClick(ev: React.MouseEvent<HTMLButtonElement>, item: IContextualMenuItem) {
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
  private _onOverflowClick(ev: React.MouseEvent<HTMLButtonElement>) {
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
>>>>>>> 5.0
  }

  @autobind
  private _onRenderItems(item: ICommandBarItemProps) {

    if (item.onRender) { return item.onRender(item); }

<<<<<<< HEAD
    const commandButtonProps = assign({}, item, {
      styles: assign({}, item.buttonStyles, this.props.buttonStyles),
      className: css(styles.commandButton, item.className),
      text: !item.iconOnly ? item.name : '',
      menuProps: item.subMenuProps,
    });
=======
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

  private _getStateFromProps(nextProps: ICommandBarProps): ICommandBarState {
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
>>>>>>> 5.0

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
