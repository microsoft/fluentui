import * as React from 'react';
import {
  BaseComponent,
  css,
  getId,
} from '../../Utilities';

import { ICommandBar, ICommandBarProps } from './CommandBar.Props';
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
    farItems: []
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
    } = this.props;

    const commandBardata = {
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
                onRenderItem={ this._onRenderCommandButton }
                onRenderOverflowButton={ (renderedItems) => {
                  return (
                    <CommandButton
                      ariaLabel={ elipisisAriaLabel }
                      className={ css(styles.overflowButton) }
                      menuProps={ { items: renderedItems } }
                      menuIconProps={ { iconName: 'More' } }
                    />
                  );
                } }
              />

              {/*Secondary Items*/ }
              <OverflowSet
                className={ css(styles.secondarySet) }
                items={ data.farItems }
                onRenderItem={ this._onRenderCommandButton }
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
        labelText={ searchPlaceholderText || 'Search' } />
    );
  }

  // Render Command Button
  private _onRenderCommandButton(item) {
    if (item.onRender) {
      return item.onRender(item);
    }

    const commandButton = <CommandButton
      { ...item }

      className={ css(styles.commandButton, item.className) }
      text={ !item.iconOnly ? item.name : '' }
      iconProps={ { iconName: item.icon } }
      menuProps={ item.subMenuProps }
    />;

    if (item.iconOnly) {
      return (
        <TooltipHost content={ item.name } >
          { commandButton }
        </TooltipHost>
      );
    }

    return commandButton;

  }
}
