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
import { CommandButton, IButtonProps } from '../../Button';
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

export interface ICommandBarState {
  expandedMenuItem?: IButtonProps;
}

export class CommandBar extends BaseComponent<ICommandBarProps, ICommandBarState> implements ICommandBar {
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
    this.state = {
      expandedMenuItem: null
    };
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

    let { expandedMenuItem } = this.state;

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
                onRenderItem={ this._onRenderButton }
                onRenderOverflowButton={ (renderedOverflowItems: ICommandBarItemProps[]) => {
                  return (
                    this._onRenderButton({
                      uniqueId: 'overflowButton',
                      styles: { buttonStyles },
                      ariaLabel: elipisisAriaLabel,
                      className: css(styles.overflowButton),
                      menuProps: { items: renderedOverflowItems },
                      menuIconProps: elipisisIconProps,
                      onMenuToggled: this._onMenuToggled,
                      menuOpen: this.state.expandedMenuItem === 'overflowButton'
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
  private _onMenuToggled(button: IButtonProps) {
    this.setState((prevState, prevProps) => {
      console.log(button);
      return {
        expandedMenuItem: button ? button.uniqueId : null
      };
    });
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

    item.uniqueId = item.key;

    if (item.onRender) { return item.onRender(item); }

    const commandButtonProps = assign({}, item, {
      onMenuToggled: this._onMenuToggled,
      styles: assign({}, item.buttonStyles, this.props.buttonStyles),
      className: css(styles.commandButton, item.className),
      text: !item.iconOnly ? item.name : '',
      menuProps: item.subMenuProps,
      menuOpen: this.state.expandedMenuItem === item.uniqueId
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
    return <CommandButton {...item} >{ item.name }</CommandButton>;
  }
}
