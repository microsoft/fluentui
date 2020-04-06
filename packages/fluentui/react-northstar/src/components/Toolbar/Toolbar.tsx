import { Accessibility, toolbarBehavior, toggleButtonBehavior, IS_FOCUSABLE_ATTRIBUTE } from '@fluentui/accessibility';
import * as React from 'react';
import * as _ from 'lodash';
import * as customPropTypes from '@fluentui/react-proptypes';
import * as PropTypes from 'prop-types';
import { Ref } from '@fluentui/react-component-ref';
import { EventListener } from '@fluentui/react-component-event-listener';
import { getFirstFocusable } from '@fluentui/react-bindings';

import {
  childrenExist,
  createShorthandFactory,
  UIComponent,
  UIComponentProps,
  ContentComponentProps,
  ChildrenComponentProps,
  commonPropTypes,
  ColorComponentProps,
  ShorthandFactory,
} from '../../utils';

import { ComponentEventHandler, ShorthandCollection, ShorthandValue, WithAsProp, withSafeTypeForAs } from '../../types';

import ToolbarCustomItem from './ToolbarCustomItem';
import ToolbarDivider from './ToolbarDivider';
import ToolbarItem, { ToolbarItemProps } from './ToolbarItem';
import ToolbarMenu from './ToolbarMenu';
import ToolbarMenuDivider from './ToolbarMenuDivider';
import ToolbarMenuItem, { ToolbarMenuItemProps } from './ToolbarMenuItem';
import ToolbarMenuRadioGroup from './ToolbarMenuRadioGroup';
import ToolbarRadioGroup from './ToolbarRadioGroup';
import { ToolbarVariablesProvider } from './toolbarVariablesContext';
import { MoreIcon } from '@fluentui/react-icons-northstar';

export type ToolbarItemShorthandKinds = 'divider' | 'item' | 'group' | 'toggle' | 'custom';

type PositionOffset = {
  vertical: number;
  horizontal: number;
};

const WAS_FOCUSABLE_ATTRIBUTE = 'data-was-focusable';

export interface ToolbarProps
  extends UIComponentProps,
    ContentComponentProps,
    ChildrenComponentProps,
    ColorComponentProps {
  /** Accessibility behavior if overridden by the user. */
  accessibility?: Accessibility;

  /** Shorthand array of props for Toolbar. */
  items?: ShorthandCollection<ToolbarItemProps, ToolbarItemShorthandKinds>;

  /**
   *  Automatically move overflow items to overflow menu.
   *  For automatic overflow to work correctly, toolbar items including overflowMenuItem
   *  must NOT change their size! If you need to change item's size, rerender the Toolbar.
   */
  overflow?: boolean;

  /** Indicates if the overflow menu is open. Only valid if `overflow` is enabled and regular items do not fit. */
  overflowOpen?: boolean;

  /**
   * Shorthand for the overflow item which is displayed when `overflow` is enabled and regular toolbar items do not fit.
   * Do not set any menu on this item, Toolbar overrides it.
   */
  overflowItem?: ShorthandValue<ToolbarItemProps>;

  /**
   * Called when overflow is recomputed (after render, update or window resize). Even if all items fit.
   * @param itemsVisible - number of items visible
   */
  onOverflow?: (itemsVisible: number) => void;

  /**
   * Event for request to change 'overflowOpen' value.
   * @param event - React's original SyntheticEvent.
   * @param data - All props and proposed value.
   */
  onOverflowOpenChange?: ComponentEventHandler<ToolbarProps>;

  /**
   * Callback to get items to be rendered in overflow menu.
   * Called when overflow menu is rendered opened.
   * @param startIndex - Index of the first item to be displayed in the overflow menu (the first item which does not fit the toolbar).
   */
  getOverflowItems?: (startIndex: number) => ShorthandCollection<ToolbarMenuItemProps, ToolbarItemShorthandKinds>; // FIXME: use correct kind
}

class Toolbar extends UIComponent<WithAsProp<ToolbarProps>> {
  static create: ShorthandFactory<ToolbarProps>;

  static className = 'ui-toolbar';

  static displayName = 'Toolbar';

  static propTypes = {
    ...commonPropTypes.createCommon(),
    items: customPropTypes.collectionShorthandWithKindProp(['divider', 'item', 'group', 'toggle', 'custom']),
    overflow: PropTypes.bool,
    overflowOpen: PropTypes.bool,
    overflowItem: customPropTypes.shorthandAllowingChildren,
    onOverflow: PropTypes.func,
    onOverflowOpenChange: PropTypes.func,
    getOverflowItems: PropTypes.func,
  };

  static defaultProps = {
    accessibility: toolbarBehavior,
    items: [],
    overflowItem: {},
  };

  static CustomItem = ToolbarCustomItem;
  static Divider = ToolbarDivider;
  static Item = ToolbarItem;
  static Menu = ToolbarMenu;
  static MenuDivider = ToolbarMenuDivider;
  static MenuItem = ToolbarMenuItem;
  static MenuRadioGroup = ToolbarMenuRadioGroup;
  static RadioGroup = ToolbarRadioGroup;

  overflowContainerRef = React.createRef<HTMLDivElement>();
  overflowItemRef = React.createRef<HTMLElement>();
  offsetMeasureRef = React.createRef<HTMLDivElement>();
  containerRef = React.createRef<HTMLElement>();

  // index of the last visible item in Toolbar, the rest goes to overflow menu
  lastVisibleItemIndex: number;

  animationFrameId: number;
  rtl: boolean;

  renderItems(items: ShorthandCollection<ToolbarItemProps, ToolbarItemShorthandKinds>) {
    return _.map(items, (item: ShorthandValue<ToolbarItemProps & { kind?: ToolbarItemShorthandKinds }>) => {
      const kind = _.get(item, 'kind', 'item');

      switch (kind) {
        case 'divider':
          return ToolbarDivider.create(item);
        case 'group':
          return ToolbarRadioGroup.create(item);
        case 'toggle':
          return ToolbarItem.create(item, {
            defaultProps: () => ({ accessibility: toggleButtonBehavior }),
          });
        case 'custom':
          return ToolbarCustomItem.create(item);
        default:
          return ToolbarItem.create(item);
      }
    });
  }

  hide(el: HTMLElement) {
    if (el.style.visibility === 'hidden') {
      return;
    }

    if (this.context.target.activeElement === el || el.contains(this.context.target.activeElement)) {
      if (this.containerRef.current) {
        const firstFocusableItem = getFirstFocusable(
          this.containerRef.current,
          this.containerRef.current.firstElementChild as HTMLElement,
        );

        if (firstFocusableItem) {
          firstFocusableItem.focus();
        }
      }
    }

    el.style.visibility = 'hidden';
    const wasFocusable = el.getAttribute(IS_FOCUSABLE_ATTRIBUTE);
    if (wasFocusable) {
      el.setAttribute(WAS_FOCUSABLE_ATTRIBUTE, wasFocusable);
    }
    el.setAttribute(IS_FOCUSABLE_ATTRIBUTE, 'false');
  }

  show(el: HTMLElement) {
    if (el.style.visibility !== 'hidden') {
      return false;
    }

    el.style.visibility = null;
    const wasFocusable = el.getAttribute(WAS_FOCUSABLE_ATTRIBUTE);
    if (wasFocusable) {
      el.setAttribute(IS_FOCUSABLE_ATTRIBUTE, wasFocusable);
      el.removeAttribute(WAS_FOCUSABLE_ATTRIBUTE);
    } else {
      el.removeAttribute(IS_FOCUSABLE_ATTRIBUTE);
    }

    return true;
  }

  /**
   * Checks if `item` overflows a `container`.
   * TODO: check and fix all margin combination
   */
  isItemOverflowing(itemBoundingRect: ClientRect, containerBoundingRect: ClientRect) {
    return itemBoundingRect.right > containerBoundingRect.right || itemBoundingRect.left < containerBoundingRect.left;
  }

  /**
   * Checks if `item` would collide with eventual position of `overflowItem`.
   */
  wouldItemCollide(
    $item: Element,
    itemBoundingRect: ClientRect,
    overflowItemBoundingRect: ClientRect,
    containerBoundingRect: ClientRect,
  ) {
    const actualWindow: Window = this.context.target.defaultView;
    let wouldCollide;

    if (this.rtl) {
      const itemLeftMargin = parseFloat(actualWindow.getComputedStyle($item).marginLeft) || 0;
      wouldCollide =
        itemBoundingRect.left - overflowItemBoundingRect.width - itemLeftMargin < containerBoundingRect.left;

      // console.log('Collision [RTL]', {
      //   wouldCollide,
      //   'itemBoundingRect.left': itemBoundingRect.left,
      //   'overflowItemBoundingRect.width': overflowItemBoundingRect.width,
      //   itemRightMargin: itemLeftMargin,
      //   sum: itemBoundingRect.left - overflowItemBoundingRect.width - itemLeftMargin,
      //   'overflowContainerBoundingRect.left': containerBoundingRect.left,
      // })
    } else {
      const itemRightMargin = parseFloat(actualWindow.getComputedStyle($item).marginRight) || 0;
      wouldCollide =
        itemBoundingRect.right + overflowItemBoundingRect.width + itemRightMargin > containerBoundingRect.right;

      // console.log('Collision', {
      //   wouldCollide,
      //   'itemBoundingRect.right': itemBoundingRect.right,
      //   'overflowItemBoundingRect.width': overflowItemBoundingRect.width,
      //   itemRightMargin,
      //   sum: itemBoundingRect.right + overflowItemBoundingRect.width + itemRightMargin,
      //   'overflowContainerBoundingRect.right': containerBoundingRect.right,
      // })
    }

    return wouldCollide;
  }

  /**
   * Positions overflowItem next to lastVisible item
   * TODO: consider overflowItem margin
   */
  setOverflowPosition(
    $overflowItem: HTMLElement,
    $lastVisibleItem: HTMLElement | undefined,
    lastVisibleItemRect: ClientRect | undefined,
    containerBoundingRect: ClientRect,
    absolutePositioningOffset: PositionOffset,
  ) {
    const actualWindow: Window = this.context.target.defaultView;

    if ($lastVisibleItem) {
      if (this.rtl) {
        const lastVisibleItemMarginLeft = parseFloat(actualWindow.getComputedStyle($lastVisibleItem).marginLeft) || 0;

        $overflowItem.style.right = `${containerBoundingRect.right -
          lastVisibleItemRect.left +
          lastVisibleItemMarginLeft +
          absolutePositioningOffset.horizontal}px`;
      } else {
        const lastVisibleItemRightMargin = parseFloat(actualWindow.getComputedStyle($lastVisibleItem).marginRight) || 0;

        $overflowItem.style.left = `${lastVisibleItemRect.right -
          containerBoundingRect.left +
          lastVisibleItemRightMargin +
          absolutePositioningOffset.horizontal}px`;
      }
    } else {
      // there is no last visible item -> position the overflow as the first item
      this.lastVisibleItemIndex = -1;
      if (this.rtl) {
        $overflowItem.style.right = `${absolutePositioningOffset.horizontal}px`;
      } else {
        $overflowItem.style.left = `${absolutePositioningOffset.horizontal}px`;
      }
    }
  }

  hideOverflowItems = () => {
    const $overflowContainer = this.overflowContainerRef.current;
    const $overflowItem = this.overflowItemRef.current;
    const $offsetMeasure = this.offsetMeasureRef.current;
    if (!$overflowContainer || !$overflowItem || !$offsetMeasure) {
      return;
    }

    // workaround: when resizing window with popup opened the container contents scroll for some reason
    if (this.rtl) {
      $overflowContainer.scrollTo(Number.MAX_SAFE_INTEGER, 0);
    } else {
      $overflowContainer.scrollTo(0, 0);
    }

    const $items = $overflowContainer.children;

    const overflowContainerBoundingRect = $overflowContainer.getBoundingClientRect();
    const overflowItemBoundingRect = $overflowItem.getBoundingClientRect();
    const offsetMeasureBoundingRect = $offsetMeasure.getBoundingClientRect();

    // Absolute positioning offset
    // Overflow menu is absolutely positioned relative to root slot
    // If there is padding set on the root slot boundingClientRect computations use inner content box,
    // but absolute position is relative to root slot's PADDING box.
    // We compute absolute positioning offset
    // By measuring position of an offsetMeasure element absolutely positioned to 0,0.
    // TODO: replace by getComputedStyle('padding')
    const absolutePositioningOffset: PositionOffset = {
      horizontal: this.rtl
        ? offsetMeasureBoundingRect.right - overflowContainerBoundingRect.right
        : overflowContainerBoundingRect.left - offsetMeasureBoundingRect.left,
      vertical: overflowContainerBoundingRect.top - offsetMeasureBoundingRect.top,
    };

    let isOverflowing = false;
    let $lastVisibleItem;
    let lastVisibleItemRect;

    // check all items from the last one back
    _.forEachRight($items, ($item: HTMLElement, i: number) => {
      if ($item === $overflowItem) {
        return true;
      }

      const itemBoundingRect = $item.getBoundingClientRect();

      // if the item is out of the crop rectangle, hide it
      if (this.isItemOverflowing(itemBoundingRect, overflowContainerBoundingRect)) {
        isOverflowing = true;
        // console.log('Overflow', i, {
        //   item: [itemBoundingRect.left, itemBoundingRect.right],
        //   crop: [
        //     overflowContainerBoundingRect.left,
        //     overflowContainerBoundingRect.right,
        //     overflowContainerBoundingRect.width,
        //   ],
        //   container: $overflowContainer,
        // })
        this.hide($item);
        return true;
      }

      // if there is an overflow, check collision of remaining items with eventual overflow position
      if (
        isOverflowing &&
        !$lastVisibleItem &&
        this.wouldItemCollide($item, itemBoundingRect, overflowItemBoundingRect, overflowContainerBoundingRect)
      ) {
        this.hide($item);
        return true;
      }

      // Remember the last visible item
      if (!$lastVisibleItem) {
        $lastVisibleItem = $item;
        lastVisibleItemRect = itemBoundingRect;
        this.lastVisibleItemIndex = i;
      }

      return this.show($item); // exit the loop when first visible item is found
    });

    // if there is an overflow,  position and show overflow item, otherwise hide it
    if (isOverflowing || this.props.overflowOpen) {
      $overflowItem.style.position = 'absolute';
      this.setOverflowPosition(
        $overflowItem,
        $lastVisibleItem,
        lastVisibleItemRect,
        overflowContainerBoundingRect,
        absolutePositioningOffset,
      );
      this.show($overflowItem);
    } else {
      this.lastVisibleItemIndex = this.props.items.length - 1;
      this.hide($overflowItem);
    }

    _.invoke(this.props, 'onOverflow', this.lastVisibleItemIndex + 1);
  };

  getOverflowItems = () => {
    // console.log('getOverflowItems()', this.props.items.slice(this.lastVisibleItemIndex + 1))
    return this.props.getOverflowItems
      ? this.props.getOverflowItems(this.lastVisibleItemIndex + 1)
      : this.props.items.slice(this.lastVisibleItemIndex + 1);
  };

  getVisibleItems = () => {
    // console.log('allItems()', this.props.items)
    const end = this.props.overflowOpen ? this.lastVisibleItemIndex + 1 : this.props.items.length;
    // console.log('getVisibleItems()', this.props.items.slice(0, end))
    return this.props.items.slice(0, end);
  };

  componentDidMount() {
    this.afterComponentRendered();
  }

  componentDidUpdate() {
    this.afterComponentRendered();
  }

  componentWillUnmount() {
    if (this.animationFrameId !== undefined) {
      this.context.target.defaultView.cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = undefined;
    }
  }

  afterComponentRendered() {
    const actualWindow: Window = this.context.target.defaultView;

    if (this.animationFrameId !== undefined) {
      actualWindow.cancelAnimationFrame(this.animationFrameId);
    }

    // Heads up! There are cases (like opening a portal and rendering the Toolbar there immediately) when rAF is necessary
    this.animationFrameId = actualWindow.requestAnimationFrame(() => {
      this.hideOverflowItems();
    });
  }

  handleWindowResize = _.debounce((e: UIEvent) => {
    this.hideOverflowItems();

    if (this.props.overflowOpen) {
      _.invoke(this.props, 'onOverflowOpenChange', e, {
        ...this.props,
        overflowOpen: false,
      });
    }
  }, 16);

  renderOverflowItem(overflowItem) {
    return (
      <Ref innerRef={this.overflowItemRef}>
        {ToolbarItem.create(overflowItem, {
          defaultProps: () => ({
            // TODO: ups
            icon: <MoreIcon {...{ outline: true }} />,
          }),
          overrideProps: {
            menu: this.props.overflowOpen ? this.getOverflowItems() : [],
            menuOpen: this.props.overflowOpen,
            onMenuOpenChange: (e, { menuOpen }) => {
              _.invoke(this.props, 'onOverflowOpenChange', e, {
                ...this.props,
                overflowOpen: menuOpen,
              });
            },
          },
        })}
      </Ref>
    );
  }

  renderComponent({ accessibility, ElementType, classes, styles, unhandledProps, rtl }): React.ReactNode {
    this.rtl = rtl;
    const { children, items, overflow, overflowItem, variables } = this.props;

    if (!overflow) {
      return (
        <Ref innerRef={this.containerRef}>
          <ElementType className={classes.root} {...accessibility.attributes.root} {...unhandledProps}>
            <ToolbarVariablesProvider value={variables}>
              {childrenExist(children) ? children : this.renderItems(items)}
            </ToolbarVariablesProvider>
          </ElementType>
        </Ref>
      );
    }

    return (
      <>
        <Ref innerRef={this.containerRef}>
          <ElementType className={classes.root} {...accessibility.attributes.root} {...unhandledProps}>
            <div className={classes.overflowContainer} ref={this.overflowContainerRef}>
              <ToolbarVariablesProvider value={variables}>
                {childrenExist(children) ? children : this.renderItems(this.getVisibleItems())}
                {this.renderOverflowItem(overflowItem)}
              </ToolbarVariablesProvider>
            </div>
            <div className={classes.offsetMeasure} ref={this.offsetMeasureRef} />
          </ElementType>
        </Ref>
        <EventListener listener={this.handleWindowResize} target={this.context.target.defaultView} type="resize" />
      </>
    );
  }
}

Toolbar.create = createShorthandFactory({ Component: Toolbar, mappedProp: 'content' });

/**
 * A Toolbar is a container for grouping a set of controls, often action controls (e.g. buttons) or input controls (e.g. checkboxes).
 *
 * @accessibility
 *  * Implements [ARIA Toolbar](https://www.w3.org/TR/wai-aria-practices-1.1/#toolbar) design pattern.
 * @accessibilityIssues
 * [Issue 988424: VoiceOver narrates selected for button in toolbar](https://bugs.chromium.org/p/chromium/issues/detail?id=988424)
 */
export default withSafeTypeForAs<typeof Toolbar, ToolbarProps>(Toolbar);
