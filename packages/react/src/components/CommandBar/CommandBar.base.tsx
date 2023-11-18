import * as React from 'react';
import {
  classNamesFunction,
  css,
  nullRender,
  getNativeProps,
  divProperties,
  composeComponentAs,
  initializeComponentRef,
} from '../../Utilities';
import { OverflowSet } from '../../OverflowSet';
import { ResizeGroup } from '../../ResizeGroup';
import { FocusZone, FocusZoneDirection } from '../../FocusZone';
import { CommandBarButton } from '../../Button';
import { TooltipHost } from '../../Tooltip';
import { getCommandButtonStyles } from './CommandBar.styles';
import type { IComponentAs } from '../../Utilities';
import type {
  ICommandBar,
  ICommandBarItemProps,
  ICommandBarProps,
  ICommandBarStyleProps,
  ICommandBarStyles,
} from './CommandBar.types';
import type { IOverflowSet } from '../../OverflowSet';
import type { IResizeGroup } from '../../ResizeGroup';
import type { IButtonProps } from '../../Button';

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

export class CommandBarBase extends React.Component<ICommandBarProps, {}> implements ICommandBar {
  public static defaultProps: ICommandBarProps = {
    items: [],
    overflowItems: [],
  };

  private _overflowSet = React.createRef<IOverflowSet>();
  private _resizeGroup = React.createRef<IResizeGroup>();
  private _classNames: { [key in keyof ICommandBarStyles]: string };

  constructor(props: ICommandBarProps) {
    super(props);

    initializeComponentRef(this);
  }

  public render(): JSX.Element {
    const {
      items,
      overflowItems,
      farItems,
      styles,
      theme,
      dataDidRender,
      onReduceData = this._onReduceData,
      onGrowData = this._onGrowData,
      resizeGroupAs: ResizeGroupAs = ResizeGroup,
    } = this.props;

    const commandBarData: ICommandBarData = {
      primaryItems: [...items],
      overflowItems: [...overflowItems!],
      minimumOverflowItems: [...overflowItems!].length, // for tracking
      farItems,
      cacheKey: this._computeCacheKey({
        primaryItems: [...items],
        overflow: overflowItems && overflowItems.length > 0,
        farItems,
      }),
    };

    this._classNames = getClassNames(styles!, { theme: theme! });

    // ResizeGroup will render these attributes to the root <div>.
    // TODO We may need to elevate classNames from <FocusZone> into <ResizeGroup> ?
    const nativeProps = getNativeProps<React.HTMLAttributes<HTMLDivElement>>(this.props, divProperties);

    return (
      <ResizeGroupAs
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
    const { ariaLabel, primaryGroupAriaLabel, farItemsGroupAriaLabel } = this.props;
    const hasSecondSet = data.farItems && data.farItems.length > 0;

    return (
      <FocusZone
        className={css(this._classNames.root)}
        direction={FocusZoneDirection.horizontal}
        role={'menubar'}
        aria-label={ariaLabel}
      >
        {/*Primary Items*/}
        <OverflowSet
          role={hasSecondSet ? 'group' : 'none'}
          aria-label={hasSecondSet ? primaryGroupAriaLabel : undefined}
          componentRef={this._overflowSet}
          className={css(this._classNames.primarySet)}
          items={data.primaryItems}
          overflowItems={data.overflowItems.length ? data.overflowItems : undefined}
          onRenderItem={this._onRenderItem}
          onRenderOverflowButton={this._onRenderOverflowButton}
        />

        {/*Secondary Items*/}
        {hasSecondSet && (
          <OverflowSet
            role="group"
            aria-label={farItemsGroupAriaLabel}
            className={css(this._classNames.secondarySet)}
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

    // eslint-disable-next-line deprecation/deprecation
    const itemText = item.text || item.name;
    const commandButtonProps: ICommandBarItemProps = {
      allowDisabledFocus: true,
      role: 'menuitem',
      ...item,
      styles: getCommandButtonStyles(item.buttonStyles),
      className: css('ms-CommandBarItem-link', item.className),
      text: !item.iconOnly ? itemText : undefined,
      menuProps: item.subMenuProps,
      onClick: this._onButtonClick(item),
    };

    if (item.iconOnly && (itemText !== undefined || item.tooltipHostProps)) {
      return (
        <TooltipHost role="none" content={itemText} setAriaDescribedBy={false} {...item.tooltipHostProps}>
          {this._commandButton(item, commandButtonProps)}
        </TooltipHost>
      );
    }

    return this._commandButton(item, commandButtonProps);
  };

  private _commandButton = (item: ICommandBarItemProps, props: ICommandBarItemProps): JSX.Element => {
    const ButtonAs = this.props.buttonAs as IComponentAs<ICommandBarItemProps> | undefined;
    const CommandBarButtonAs = item.commandBarButtonAs as IComponentAs<ICommandBarItemProps> | undefined;
    const DefaultButtonAs = CommandBarButton as {} as IComponentAs<ICommandBarItemProps>;

    // The prop types between these three possible implementations overlap enough that a force-cast is safe.
    let Type = DefaultButtonAs;

    if (CommandBarButtonAs) {
      Type = composeComponentAs(CommandBarButtonAs, Type);
    }

    if (ButtonAs) {
      Type = composeComponentAs(ButtonAs, Type);
    }

    // Always pass the default implementation to the override so it may be composed.
    return <Type {...(props as ICommandBarItemProps)} />;
  };

  private _onButtonClick(item: ICommandBarItemProps): (ev: React.MouseEvent<HTMLButtonElement>) => void {
    return ev => {
      // inactive is deprecated. remove check in 7.0
      // eslint-disable-next-line deprecation/deprecation
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
      overflowButtonProps = {}, // assure that props is not empty
    } = this.props;

    const combinedOverflowItems: ICommandBarItemProps[] = [
      ...(overflowButtonProps.menuProps ? overflowButtonProps.menuProps.items : []),
      ...overflowItems,
    ];

    const overflowProps: IButtonProps = {
      role: 'menuitem',
      ...overflowButtonProps,
      styles: { menuIcon: { fontSize: '17px' }, ...overflowButtonProps.styles },
      className: css('ms-CommandBar-overflowButton', overflowButtonProps.className),
      menuProps: { ...overflowButtonProps.menuProps, items: combinedOverflowItems },
      menuIconProps: { iconName: 'More', ...overflowButtonProps.menuIconProps },
    };

    const OverflowButtonType = this.props.overflowButtonAs
      ? composeComponentAs(this.props.overflowButtonAs, CommandBarButton)
      : CommandBarButton;

    return <OverflowButtonType {...(overflowProps as IButtonProps)} />;
  };

  private _computeCacheKey(data: {
    primaryItems?: ICommandBarItemProps[];
    overflow?: boolean;
    farItems?: ICommandBarItemProps[];
  }): string {
    const { primaryItems, overflow, farItems } = data;
    const returnKey = (acc: string, current: ICommandBarItemProps): string => {
      const { cacheKey = current.key } = current;
      return acc + cacheKey;
    };

    const primaryKey = primaryItems && primaryItems.reduce(returnKey, '');
    const overflowKey = overflow ? 'overflow' : '';
    const farKey = farItems && farItems.reduce(returnKey, '');

    return [primaryKey, overflowKey, farKey].join('');
  }

  private _onReduceData = (data: ICommandBarData): ICommandBarData | undefined => {
    const { shiftOnReduce, onDataReduced } = this.props;
    let { primaryItems, overflowItems, cacheKey } = data;
    const { farItems } = data;

    // Use first item if shiftOnReduce, otherwise use last item
    const movedItem = primaryItems[shiftOnReduce ? 0 : primaryItems.length - 1];

    if (movedItem !== undefined) {
      movedItem.renderedInOverflow = true;

      overflowItems = [movedItem, ...overflowItems];
      primaryItems = shiftOnReduce ? primaryItems.slice(1) : primaryItems.slice(0, -1);

      const newData = { ...data, primaryItems, overflowItems };
      cacheKey = this._computeCacheKey({ primaryItems, overflow: overflowItems.length > 0, farItems });

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
    const { farItems } = data;
    const movedItem = overflowItems[0];

    // Make sure that moved item exists and is not one of the original overflow items
    if (movedItem !== undefined && overflowItems.length > minimumOverflowItems) {
      movedItem.renderedInOverflow = false;

      overflowItems = overflowItems.slice(1);
      // if shiftOnReduce, movedItem goes first, otherwise, last.
      primaryItems = shiftOnReduce ? [movedItem, ...primaryItems] : [...primaryItems, movedItem];

      const newData = { ...data, primaryItems, overflowItems };
      cacheKey = this._computeCacheKey({ primaryItems, overflow: overflowItems.length > 0, farItems });

      if (onDataGrown) {
        onDataGrown(movedItem);
      }

      newData.cacheKey = cacheKey;
      return newData;
    }

    return undefined;
  };
}
