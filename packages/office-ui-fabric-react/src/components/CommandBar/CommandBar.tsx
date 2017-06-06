import * as React from 'react';
import {
  BaseComponent,
  css,
  getId,
} from '../../Utilities';

import { ICommandBar, ICommandBarProps, ICommandBarItemProps } from './CommandBar.Props';
import { SearchBox } from '../../SearchBox';
import { CommandButton } from '../../Button';
import { OverflowSet } from '../../OverflowSet';
import { ResizeGroup } from '../../ResizeGroup';
import { TooltipHost } from '../../Tooltip';

import * as stylesImport from './CommandBar.scss';
const styles: any = stylesImport;

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
      searchPlaceholderText,
      searchBoxProps,
      className,
      items,
      overflowItems,
      farItems,
      elipisisAriaLabel,
      onRenderItems = this._onRenderItems
    } = this.props;

    let commandBardata = {
      primary: items,
      overflow: overflowItems || [],
      farItems: farItems || []
    };

    return (
      <ResizeGroup
        data={ commandBardata }
        onReduceData={ this._onReduceData }
        onRenderData={ (data) => {
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
                onRenderOverflowButton={ (renderedOverflowItems) => {
                  return (
                    <CommandButton
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
                onRenderOverflowButton={ (renderedItems) => {
                  return (
                    null
                  );
                } }
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

  private _onReduceData(currentdata) {
    let overflow = currentdata.overflow.concat(currentdata.primary.slice(-1));
    let primary = currentdata.primary.slice(0, -1);
    let farItems = currentdata.farItems;
    return { primary, overflow, farItems };
  }

  // Render Search
  private _onRenderSearch(props) {
    const { searchBoxProps, searchPlaceholderText } = props;
    return (
      <SearchBox
        {...searchBoxProps }
        className={ css(styles.search, searchBoxProps.className) }
        labelText={ searchPlaceholderText } />
    );
  }

  // Render Command Button
  private _onRenderItems(item) {
    const onRender = item.onRenderItem ? item.onRenderItem : item.onRender;

    if (onRender) {
      return onRender(item);
    }

    const commandButton = <CommandButton
      { ...item }

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
