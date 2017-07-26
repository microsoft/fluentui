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
  defaultOverflowItems: ICommandBarItemProps[];
  cacheKey: string;
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
      primaryItems: [...items],
      overflowItems: [...overflowItems],
      defaultOverflowItems: [...overflowItems],
      farItems,
      cacheKey: '',
    };

    return (
      <ResizeGroup
        data={ commandBardata }
        onReduceData={ onReduceData }
        onGrowData={ this._onGrowData }
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

  private computeCacheKey(primaryItems: ICommandBarItemProps[]): string {
    return primaryItems.reduce((acc, current) => acc + current.key, '');
  }

  @autobind
  private _onReduceData(data: ICommandBarData): ICommandBarData {
    let { primaryItems, overflowItems, cacheKey } = data;
    let movedItem = primaryItems[primaryItems.length - 1];

    if (movedItem !== undefined) {
      movedItem.renderedInOverflow = true;

      overflowItems = overflowItems.concat(movedItem);
      primaryItems = primaryItems.slice(0, -1);
      cacheKey = this.computeCacheKey(primaryItems);

      return { ...data, primaryItems, overflowItems, cacheKey };
    }

    return undefined;
  }

  @autobind
  private _onGrowData(data: ICommandBarData): ICommandBarData {
    let { primaryItems, overflowItems, cacheKey } = data;
    let movedItem = overflowItems[overflowItems.length - 1];

    if (movedItem !== undefined && data.defaultOverflowItems.indexOf(movedItem) == -1) {
      movedItem.renderedInOverflow = false;

      overflowItems = overflowItems.slice(0, -1);
      primaryItems = primaryItems.concat(movedItem);
      cacheKey = this.computeCacheKey(primaryItems);

      return { ...data, primaryItems, overflowItems, cacheKey };
    }

    return undefined;
  }



  @autobind
  private _onRenderSearch(props: ICommandBarProps) {
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

    const commandButtonProps: ICommandBarItemProps = assign({}, item, {
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
  private _onRenderButton(item: ICommandBarItemProps) {
    return <CommandButton {...item as any} />;
  }
}
