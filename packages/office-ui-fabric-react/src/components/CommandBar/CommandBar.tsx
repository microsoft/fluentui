import * as React from 'react';
import {
  BaseComponent,
  css,
  getId,
  autobind,
  assign
} from '../../Utilities';
import { ICommandBar, ICommandBarProps, ICommandBarItemProps } from './CommandBar.Props';
import { CommandButton } from '../../Button';
import { OverflowSet } from '../../OverflowSet';
import { FocusZone } from '../../FocusZone';
import { ResizeGroup } from '../../ResizeGroup';
import { TooltipHost } from '../../Tooltip';
import * as stylesImport from './CommandBar.scss';
const styles: any = stylesImport;

export interface ICommandBarData {
  primaryItems: ICommandBarItemProps[];
  overflowItems: ICommandBarItemProps[];
  farItems: ICommandBarItemProps[];
  originalOverflowItems: ICommandBarItemProps[];
  cacheKey: string;
}

const COMMANDBAR_HEIGHT = '40px';

export class CommandBar extends BaseComponent<ICommandBarProps, any> implements ICommandBar {
  public static defaultProps: ICommandBarProps = {
    items: [],
    overflowItems: [],
    farItems: [],
    elipisisIconProps: { iconName: 'More' }
  };

  public refs: {
    overflowSet: OverflowSet
  }

  private _id: string;

  constructor(props: ICommandBarProps) {
    super(props);
    this._id = getId('CommandBar');
  }

  public render() {
    const {
      className,
      items,
      overflowItems,
      farItems,
      elipisisAriaLabel,
      elipisisIconProps,
      buttonStyles,
      onRenderButton = this._onRenderButton,
      onReduceData = this._onReduceData,
      onGrowData = this._onGrowData,
    } = this.props;

    let commandBardata: ICommandBarData = {
      primaryItems: [...items],
      overflowItems: [...overflowItems],
      originalOverflowItems: [...overflowItems], // for tracking
      farItems,
      cacheKey: '',
    };

    return (
      <ResizeGroup
        data={ commandBardata }
        onReduceData={ onReduceData }
        onGrowData={ onGrowData }
        onRenderData={ (data: ICommandBarData) => {
          return (
            <div className={ css('ms-CommandBar', styles.root) }>

              {/*Primary Items*/ }
              <OverflowSet
                ref='overflowSet'
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
    this.refs.overflowSet.focus();
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
    let { primaryItems, overflowItems, cacheKey, originalOverflowItems } = data;
    let movedItem = overflowItems[overflowItems.length - 1];

    // Make sure that moved item exists and is not one of the original overflow items
    if (movedItem !== undefined && originalOverflowItems.indexOf(movedItem) == -1) {
      movedItem.renderedInOverflow = false;

      overflowItems = overflowItems.slice(0, -1);
      primaryItems = primaryItems.concat(movedItem);
      cacheKey = this.computeCacheKey(primaryItems);

      return { ...data, primaryItems, overflowItems, cacheKey };
    }

    return undefined;
  }

  @autobind
  private _onRenderItems(item: ICommandBarItemProps) {
    let { buttonStyles } = this.props;

    if (item.onRender) { return item.onRender(item); }

    const commandButtonProps: ICommandBarItemProps = assign({}, item, {
      styles: { root: { height: COMMANDBAR_HEIGHT }, ...item.buttonStyles, ...buttonStyles },
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
