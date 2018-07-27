import * as React from 'react';

import { BaseComponent, css, nullRender } from '../../Utilities';
import {
  ICommandBar,
  ICommandBarItemProps,
  ICommandBarProps,
  ICommandBarStyleProps,
  ICommandBarStyles
} from './CommandBar.types';
import { IOverflowSet, OverflowSet } from '../../OverflowSet';
import { IResizeGroup, ResizeGroup } from '../../ResizeGroup';
import { FocusZone, FocusZoneDirection } from '../../FocusZone';
import { classNamesFunction, createRef } from '../../Utilities';

import { CommandBarButton, IButtonProps } from '../../Button';
import { TooltipHost } from '../../Tooltip';

const getClassNames = classNamesFunction<ICommandBarStyleProps, ICommandBarStyles>();

export interface ICommandBarData {
  /**
   * Items being rendered in the primary region
   */
  primaryItems: ICommandBarItemProps[];
  /**
   * Items being rendered in the overflow
   */
  overflowItems: ICommandBarItemProps[];
  /**
   * Items being rendered on the far side
   */
  farItems: ICommandBarItemProps[] | undefined;
  /**
   * Length of original overflowItems to ensure that they are not moved into primary region on resize
   */
  minimumOverflowItems: number;
  /**
   * Unique string used to cache the width of the command bar
   */
  cacheKey: string;
}

export class CommandBarBase extends BaseComponent<ICommandBarProps, {}> implements ICommandBar {
  public static defaultProps: ICommandBarProps = {
    items: [],
    overflowItems: []
  };

  private _setSize: number;
  private _overflowSet = createRef<IOverflowSet>();
  private _resizeGroup = createRef<IResizeGroup>();
  private _classNames: { [key in keyof ICommandBarStyles]: string };

  public render(): JSX.Element {
    const {
      className,
      items,
      overflowItems,
      farItems,
      styles,
      theme,
      onReduceData = this._onReduceData,
      onGrowData = this._onGrowData
    } = this.props;

    const commandBarData: ICommandBarData = {
      primaryItems: [...items],
      overflowItems: [...overflowItems!],
      minimumOverflowItems: [...overflowItems!].length, // for tracking
      farItems,
      cacheKey: ''
    };

    this._setAriaPosinset(commandBarData);
    this._classNames = getClassNames(styles!, { theme: theme!, className });

    return (
      <ResizeGroup
        componentRef={this._resizeGroup}
        className={className}
        data={commandBarData}
        onReduceData={onReduceData}
        onGrowData={onGrowData}
        onRenderData={this._onRenderData}
      />
    );
  }

  public focus(): void {
    const { current: overflowSet } = this._overflowSet;

    overflowSet && overflowSet.focus();
  }

  public remeasure(): void {
    this._resizeGroup.current && this._resizeGroup.current.remeasure();
  }

  private _setAriaPosinset(data: ICommandBarData): ICommandBarData {
    this._setSize = data.primaryItems.length + (data.overflowItems.length > 0 ? 1 : 0);

    data.primaryItems = data.primaryItems.map((item, i, array) => {
      item['aria-posinset'] = i + 1;
      item['aria-setsize'] = this._setSize;
      return item;
    });

    if (data.farItems) {
      data.farItems = data.farItems.map((item, i, array) => {
        item['aria-posinset'] = i + 1;
        item['aria-setsize'] = array.length;
        return item;
      });
    }

    return data;
  }

  private _onRenderData = (data: ICommandBarData): JSX.Element => {
    return (
      <FocusZone
        className={css(this._classNames.root)}
        direction={FocusZoneDirection.horizontal}
        role={'menubar'}
        aria-label={this.props.ariaLabel}
      >
        {/*Primary Items*/}
        <OverflowSet
          componentRef={this._resolveRef('_overflowSet')}
          className={css(this._classNames.primarySet)}
          doNotContainWithinFocusZone={true}
          role={'presentation'}
          items={data.primaryItems}
          overflowItems={data.overflowItems.length ? data.overflowItems : undefined}
          onRenderItem={this._onRenderItem}
          onRenderOverflowButton={this._onRenderOverflowButton}
        />

        {/*Secondary Items*/}
        {data.farItems && (
          <OverflowSet
            className={css(this._classNames.secondarySet)}
            doNotContainWithinFocusZone={true}
            role={'presentation'}
            items={data.farItems}
            onRenderItem={this._onRenderItem}
            onRenderOverflowButton={nullRender}
          />
        )}
      </FocusZone>
    );
  };

  private _onRenderItem = (item: ICommandBarItemProps): JSX.Element | React.ReactNode => {
    const { buttonAs: CommandButtonType = CommandBarButton } = this.props;

    const itemText = item.text || item.name;

    if (item.onRender) {
      // These are the top level items, there is no relevant menu dismissing function to
      // provide for the IContextualMenuItem onRender function. Pass in a no op function instead.
      return item.onRender(item, () => undefined);
    }
    const commandButtonProps: ICommandBarItemProps = {
      ...item,
      styles: { root: { height: '100%' }, ...item.buttonStyles },
      className: css('ms-CommandBarItem-link', item.className),
      text: !item.iconOnly ? itemText : undefined,
      menuProps: item.subMenuProps
    };

    if (item.iconOnly && itemText !== undefined) {
      return (
        <TooltipHost content={itemText} {...item.tooltipHostProps}>
          <CommandButtonType {...commandButtonProps as IButtonProps} />
        </TooltipHost>
      );
    }

    return <CommandButtonType {...commandButtonProps as IButtonProps} />;
  };

  private _onRenderOverflowButton = (overflowItems: ICommandBarItemProps[]): JSX.Element => {
    const {
      overflowButtonAs: OverflowButtonType = CommandBarButton,
      overflowButtonProps = {} // assure that props is not empty
    } = this.props;

    const combinedOverflowItems: ICommandBarItemProps[] = [
      ...(overflowButtonProps.menuProps ? overflowButtonProps.menuProps.items : []),
      ...overflowItems
    ];

    const overflowProps: IButtonProps = {
      ...overflowButtonProps,
      styles: { menuIcon: { fontSize: '17px' }, ...overflowButtonProps.styles },
      className: css('ms-CommandBar-overflowButton', overflowButtonProps.className),
      menuProps: { ...overflowButtonProps.menuProps, items: combinedOverflowItems },
      menuIconProps: { iconName: 'More', ...overflowButtonProps.menuIconProps }
    };

    return (
      <OverflowButtonType
        aria-posinset={this._setSize}
        aria-setsize={this._setSize}
        {...overflowProps as IButtonProps}
      />
    );
  };

  private _computeCacheKey(data: ICommandBarData): string {
    const { primaryItems, farItems = [], overflowItems } = data;
    const returnKey = (acc: string, current: ICommandBarItemProps): string => {
      const { cacheKey = current.key } = current;
      return acc + cacheKey;
    };

    const primaryKey = primaryItems.reduce(returnKey, '');
    const farKey = farItems.reduce(returnKey, '');
    const overflowKey = !!overflowItems.length ? 'overflow' : '';

    return [primaryKey, farKey, overflowKey].join(' ');
  }

  private _onReduceData = (data: ICommandBarData): ICommandBarData | undefined => {
    const { shiftOnReduce, onDataReduced } = this.props;
    let { primaryItems, overflowItems, cacheKey } = data;

    // Use first item if shiftOnReduce, otherwise use last item
    const movedItem = primaryItems[shiftOnReduce ? 0 : primaryItems.length - 1];

    if (movedItem !== undefined) {
      movedItem.renderedInOverflow = true;

      overflowItems = [movedItem, ...overflowItems];
      primaryItems = shiftOnReduce ? primaryItems.slice(1) : primaryItems.slice(0, -1);

      const newData = this._setAriaPosinset({ ...data, primaryItems, overflowItems });

      cacheKey = this._computeCacheKey(newData);

      if (onDataReduced) {
        onDataReduced(movedItem);
      }

      return { ...newData, cacheKey };
    }

    return undefined;
  };

  private _onGrowData = (data: ICommandBarData): ICommandBarData | undefined => {
    const { shiftOnReduce, onDataGrown } = this.props;
    const { minimumOverflowItems } = data;
    let { primaryItems, overflowItems, cacheKey } = data;
    const movedItem = overflowItems[0];

    // Make sure that moved item exists and is not one of the original overflow items
    if (movedItem !== undefined && overflowItems.length > minimumOverflowItems) {
      movedItem.renderedInOverflow = false;

      overflowItems = overflowItems.slice(1);
      // if shiftOnReduce, movedItem goes first, otherwise, last.
      primaryItems = shiftOnReduce ? [movedItem, ...primaryItems] : [...primaryItems, movedItem];

      const newData = this._setAriaPosinset({ ...data, primaryItems, overflowItems });
      cacheKey = this._computeCacheKey(newData);

      if (onDataGrown) {
        onDataGrown(movedItem);
      }

      return { ...newData, cacheKey };
    }

    return undefined;
  };
}
