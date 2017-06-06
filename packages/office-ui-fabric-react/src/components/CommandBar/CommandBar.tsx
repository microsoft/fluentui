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

// Internal data structure for passing command bar data around
interface ICommandBarData {
  primary: ICommandBarItemProps[];
  overflow: ICommandBarItemProps[];
  farItems: ICommandBarItemProps[];
}

export class CommandBar extends BaseComponent<ICommandBarProps, any> implements ICommandBar {
  public static defaultProps = {
    items: [],
    overflowItems: [],
    farItems: [],
    searchPlaceholderText: 'Search'
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
      buttonStyles,
      onRenderItems = this._onRenderItems
    } = this.props;

    let commandBardata: ICommandBarData = {
      primary: items,
      overflow: overflowItems,
      farItems: farItems
    };

    return (
      <ResizeGroup
        data={ commandBardata }
        onReduceData={ this._onReduceData }
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
                items={ data.primary }
                overflowItems={ data.overflow.length ? data.overflow : null }
                onRenderItem={ onRenderItems }
                onRenderOverflowButton={ (renderedOverflowItems: ICommandBarItemProps[]) => {
                  return (
                    <CommandButton
                      styles={ buttonStyles }
                      ariaLabel={ elipisisAriaLabel }
                      className={ css(styles.overflowButton) }
                      menuProps={ { items: renderedOverflowItems } }
                      menuIconProps={ { iconName: 'More' } }
                    />
                  );
                } }
              />

              {/*Secondary Items*/ }
              <OverflowSet
                className={ css(styles.secondarySet) }
                items={ data.farItems }
                onRenderItem={ onRenderItems }
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
  private _onReduceData(currentdata: ICommandBarData) {
    let movedItem = currentdata.primary[currentdata.primary.length - 1];
    movedItem.renderedInOverflow = true;

    return {
      primary: currentdata.primary.slice(0, -1),
      overflow: currentdata.overflow.concat(movedItem),
      farItems: currentdata.farItems
    };
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
  private _onRenderItems(item) {

    if (item.onRender) {
      return item.onRender(item);
    }

    const commandButton = <CommandButton
      { ...item }
      styles={ assign({}, item.buttonStyles, this.props.buttonStyles) }
      className={ css(styles.commandButton, item.className) }
      text={ !item.iconOnly ? item.name : '' }
      iconProps={ { iconName: item.icon } }
      menuProps={ item.subMenuProps }
    />;

    if (item.iconOnly && item.name !== undefined) {
      return (
        <TooltipHost content={ item.name } >
          { commandButton }
        </TooltipHost>
      );
    }

    return commandButton;
  }
}
