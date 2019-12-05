import * as React from 'react';

import { BaseComponent, css, nullRender } from '../../Utilities';
import { ICommandBar, ICommandBarItemProps, ICommandBarProps, ICommandBarStyleProps, ICommandBarStyles } from './CommandBar.types';
import { IOverflowSet, OverflowSet } from '../../OverflowSet';
import { IResizeGroup, ResizeGroup } from '../../ResizeGroup';
import { FocusZone, FocusZoneDirection } from '../../FocusZone';
import { classNamesFunction } from '../../Utilities';
import { CommandBarButton, IButtonProps } from '../../Button';
import { TooltipHost } from '../../Tooltip';
import { IComponentAs, getNativeProps, divProperties } from '@uifabric/utilities';
import { mergeStyles, IStyle } from '@uifabric/styling';

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

  private _overflowSet = React.createRef<IOverflowSet>();
  private _resizeGroup = React.createRef<IResizeGroup>();
  private _classNames: { [key in keyof ICommandBarStyles]: string };

  public render(): JSX.Element {
    const {
      items,
      overflowItems,
      farItems,
      styles,
      theme,
      dataDidRender,
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

    this._classNames = getClassNames(styles!, { theme: theme! });

    // ResizeGroup will render these attributes to the root <div>.
    // TODO We may need to elevate classNames from <FocusZone> into <ResizeGroup> ?
    const nativeProps = getNativeProps<React.HTMLAttributes<HTMLDivElement>>(this.props, divProperties);

    return (
      <ResizeGroup
        {...nativeProps}
        componentRef={this._resizeGroup}
        data={commandBarData}
        onReduceData={onReduceData}
        onGrowData={onGrowData}
        onRenderData={this._onRenderData}
        dataDidRender={dataDidRender}
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
            items={data.farItems}
            onRenderItem={this._onRenderItem}
            onRenderOverflowButton={nullRender}
          />
        )}
      </FocusZone>
    );
  };

  private _onRenderItem = (item: ICommandBarItemProps): JSX.Element | React.ReactNode => {
    if (item.onRender) {
      // These are the top level items, there is no relevant menu dismissing function to
      // provide for the IContextualMenuItem onRender function. Pass in a no op function instead.
      return item.onRender(item, () => undefined);
    }

    const itemText = item.text || item.name;
    const rootStyles: IStyle = {
      height: '100%'
    };
    const labelStyles: IStyle = {
      whiteSpace: 'nowrap'
    };
    const commandButtonProps: ICommandBarItemProps = {
      allowDisabledFocus: true,
      role: 'menuitem',
      ...item,
      styles: {
        ...item.buttonStyles,
        root: item.buttonStyles ? mergeStyles(rootStyles, item.buttonStyles.root) : rootStyles,
        label: item.buttonStyles ? mergeStyles(labelStyles, item.buttonStyles.label) : labelStyles
      },
      className: css('ms-CommandBarItem-link', item.className),
      text: !item.iconOnly ? itemText : undefined,
      menuProps: item.subMenuProps,
      onClick: this._onButtonClick(item)
    };

    if (item.iconOnly && itemText !== undefined) {
      return (
        <TooltipHost content={itemText} {...item.tooltipHostProps}>
          {this._commandButton(item, commandButtonProps)}
        </TooltipHost>
      );
    }

    return this._commandButton(item, commandButtonProps);
  };

  private _commandButton = (item: ICommandBarItemProps, props: ICommandBarItemProps): JSX.Element => {
    const ButtonAs = this.props.buttonAs as IComponentAs<ICommandBarItemProps> | undefined;
    const CommandBarButtonAs = item.commandBarButtonAs as IComponentAs<ICommandBarItemProps> | undefined;
    const DefaultButtonAs = (CommandBarButton as {}) as IComponentAs<ICommandBarItemProps>;

    // The prop types between these three possible implementations overlap enough that a force-cast is safe.
    const Type = ButtonAs || CommandBarButtonAs || DefaultButtonAs;

    // Always pass the default implementation to the override so it may be composed.
    return <Type {...props as ICommandBarItemProps} defaultRender={DefaultButtonAs} />;
  };

  private _onButtonClick(item: ICommandBarItemProps): (ev: React.MouseEvent<HTMLButtonElement>) => void {
    return ev => {
      // inactive is deprecated. remove check in 7.0
      if (item.inactive) {
        return;
      }
      if (item.onClick) {
        item.onClick(ev, item);
      }
    };
  }

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

    return <OverflowButtonType {...overflowProps as IButtonProps} />;
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

      const newData = { ...data, primaryItems, overflowItems };
      cacheKey = this._computeCacheKey(newData);

      if (onDataReduced) {
        onDataReduced(movedItem);
      }

      newData.cacheKey = cacheKey;
      return newData;
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

      const newData = { ...data, primaryItems, overflowItems };
      cacheKey = this._computeCacheKey(newData);

      if (onDataGrown) {
        onDataGrown(movedItem);
      }

      newData.cacheKey = cacheKey;
      return newData;
    }

    return undefined;
  };
}
