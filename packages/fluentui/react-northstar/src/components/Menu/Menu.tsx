import { Accessibility, menuBehavior, MenuBehaviorProps } from '@fluentui/accessibility';
import {
  getElementType,
  mergeVariablesOverrides,
  useAccessibility,
  useFluentContext,
  useAutoControlled,
  useStyles,
  useTelemetry,
  useUnhandledProps,
  ShorthandConfig,
  ForwardRefWithAs,
} from '@fluentui/react-bindings';

import * as customPropTypes from '@fluentui/react-proptypes';
import * as _ from 'lodash';
import * as PropTypes from 'prop-types';
import * as React from 'react';

import { ShorthandCollection, ShorthandValue, ComponentEventHandler, FluentComponentStaticProps } from '../../types';
import {
  childrenExist,
  createShorthand,
  createShorthandFactory,
  UIComponentProps,
  ChildrenComponentProps,
  commonPropTypes,
  getKindProp,
  rtlTextContainer,
  ShorthandFactory,
} from '../../utils';
import { MenuItem, MenuItemProps } from './MenuItem';
import { MenuDivider, MenuDividerProps } from './MenuDivider';
import { MenuItemIcon } from './MenuItemIcon';
import { MenuItemContent } from './MenuItemContent';
import { MenuItemIndicator, MenuItemIndicatorProps } from './MenuItemIndicator';
import { MenuItemWrapper } from './MenuItemWrapper';
import { MenuContextProvider, MenuContextValue } from './menuContext';
import { Ref } from '@fluentui/react-component-ref';

export type MenuShorthandKinds = {
  divider: MenuDividerProps;
  item: MenuItemProps;
};

export interface MenuProps extends UIComponentProps, ChildrenComponentProps {
  /**
   * Accessibility behavior if overridden by the user.
   * @available menuAsToolbarBehavior, tabListBehavior, tabBehavior
   */
  accessibility?: Accessibility<MenuBehaviorProps>;

  /** Index of the currently active item. */
  activeIndex?: number | string;

  /** Initial activeIndex value. */
  defaultActiveIndex?: number | string;

  /** A vertical menu may take the size of its container. */
  fluid?: boolean;

  /** A menu may have just icons. */
  iconOnly?: boolean;

  /** Shorthand array of props for Menu. */
  items?: ShorthandCollection<MenuItemProps, MenuShorthandKinds>;

  /**
   * Called when a panel title is clicked.
   *
   * @param event - React's original SyntheticEvent.
   * @param data - All item props.
   */
  onItemClick?: ComponentEventHandler<MenuItemProps>;

  /**
   * Called when the active index of the Menu changes.
   * @param event - React's original SyntheticEvent.
   * @param data - All props, with `activeIndex` reflecting the new state.
   */
  onActiveIndexChange?: ComponentEventHandler<MenuProps>;

  /** A menu can adjust its appearance to de-emphasize its contents. */
  pills?: boolean;

  /**
   * A menu can point to show its relationship to nearby content.
   * For vertical menu, it can point to the start of the item or to the end.
   */
  pointing?: boolean | 'start' | 'end';

  /** The menu can have primary type. */
  primary?: boolean;

  /** The menu can have secondary type. */
  secondary?: boolean;

  /** Menu items can by highlighted using underline. */
  underlined?: boolean;

  /** A vertical menu displays elements vertically. */
  vertical?: boolean;

  /** Indicates whether the menu is submenu. */
  submenu?: boolean;

  /** Shorthand for the submenu indicator. */
  indicator?: ShorthandValue<MenuItemIndicatorProps>;
}

export const menuClassName = 'ui-menu';

export type MenuStylesProps = Pick<
  MenuProps,
  'iconOnly' | 'fluid' | 'pointing' | 'pills' | 'primary' | 'underlined' | 'vertical' | 'submenu' | 'secondary'
>;

function useActualProps<P>(props: P) {
  const actualProps = React.useRef<P>(props);

  React.useEffect(() => {
    actualProps.current = props;
  });

  return actualProps;
}

function useSlotProps<SlotProps, SlotName extends keyof SlotProps>(
  slotName: SlotName,
  slotsProps: SlotProps,
): SlotProps[SlotName] {
  const slotProps = slotsProps[slotName];

  return React.useMemo(
    () => slotProps,
    // `slotProps` has a stable order of keys so an amount of dependencies will not change between renders
    // eslint-disable-next-line react-hooks/exhaustive-deps
    _.values(slotProps),
  );
}

/**
 * A Menu is a component that offers a grouped list of choices to the user.
 *
 * @accessibility
 * Implements ARIA [Menu](https://www.w3.org/TR/wai-aria-practices-1.1/#menu), [Toolbar](https://www.w3.org/TR/wai-aria-practices-1.1/#toolbar) or [Tabs](https://www.w3.org/TR/wai-aria-practices-1.1/#tabpanel) design pattern, depending on the behavior used.
 * @accessibilityIssues
 * [JAWS - navigation instruction for menubar](https://github.com/FreedomScientific/VFO-standards-support/issues/203)
 * [JAWS - navigation instruction for menu with aria-orientation="horizontal"](https://github.com/FreedomScientific/VFO-standards-support/issues/204)
 * [JAWS [VC] doesn't narrate menu item, when it is open from menu button](https://github.com/FreedomScientific/VFO-standards-support/issues/324)
 * [JAWS [app mode] focus moves to second menu item, when it is open from menu button](https://github.com/FreedomScientific/VFO-standards-support/issues/325)
 * [Enter into a tablist JAWS narrates: To switch pages, press Control+PageDown](https://github.com/FreedomScientific/VFO-standards-support/issues/337)
 * 51114083 VoiceOver+Web narrate wrong position in menu / total count of menu items, when pseudo element ::after or ::before is used
 */
export const Menu = React.forwardRef<HTMLUListElement, MenuProps>((props, ref) => {
  const context = useFluentContext();
  const { setStart, setEnd } = useTelemetry(Menu.displayName, context.telemetry);
  setStart();
  const {
    iconOnly,
    items,
    pills,
    pointing,
    primary,
    underlined,
    vertical,
    submenu,
    children,
    variables,
    styles,
    fluid,
    className,
    design,
    secondary,
    accessibility,
  } = props;

  const ElementType = getElementType(props);

  const slotProps = {
    divider: {
      inSubmenu: props.submenu,
      pills: props.pills,
      pointing: props.pointing,
      primary: props.primary,
      secondary: props.secondary,
      vertical: props.vertical,
    },
    item: {
      iconOnly: props.iconOnly,
      indicator: props.indicator,
      inSubmenu: props.submenu,
      pills: props.pills,
      pointing: props.pointing,
      primary: props.primary,
      secondary: props.secondary,
      vertical: props.vertical,
      underlined: props.underlined,
    },
  };

  const itemProps = useSlotProps('item', slotProps);
  const dividerProps = useSlotProps('divider', slotProps);

  const unhandledProps = useUnhandledProps(Menu.handledProps, props);

  const getA11yProps = useAccessibility<MenuBehaviorProps>(props.accessibility, {
    debugName: Menu.displayName,
    mapPropsToBehavior: () => ({
      vertical,
    }),
    rtl: context.rtl,
  });

  const actualProps = useActualProps(props);

  const { classes } = useStyles<MenuStylesProps>(Menu.displayName, {
    className: menuClassName,
    mapPropsToStyles: () => ({
      iconOnly,
      fluid,
      pointing,
      pills,
      primary,
      underlined,
      vertical,
      secondary,
      submenu,
    }),
    mapPropsToInlineStyles: () => ({
      className,
      design,
      styles,
      variables,
    }),
    rtl: context.rtl,
    unstable_props: props,
  });

  const [activeIndex, setIndex] = useAutoControlled({
    defaultValue: props.defaultActiveIndex,
    value: props.activeIndex,
    initialValue: undefined,
  });

  const setActiveIndex = React.useCallback(
    (e: React.SyntheticEvent, activeIndex: number) => {
      _.invoke(actualProps.current, 'onActiveIndexChange', e, { ...actualProps.current, activeIndex });
      setIndex(activeIndex);
    },
    [actualProps, setIndex],
  );

  const handleClick = React.useCallback(
    (e, itemProps) => {
      const { index } = itemProps;
      setActiveIndex(e, index);
      _.invoke(actualProps.current, 'onItemClick', e, itemProps);
    },
    [actualProps, setActiveIndex],
  );

  const handleSelect = React.useCallback(
    (e, index) => {
      setActiveIndex(e, index);
    },
    [setActiveIndex],
  );

  const handleItemOverrides = (predefinedProps: MenuItemProps): MenuItemProps => ({
    onActiveChanged: (e, props) => {
      const { index, active } = props;
      if (active) {
        setActiveIndex(e, index);
      } else if (activeIndex === index) {
        setActiveIndex(e, null);
      }
      _.invoke(predefinedProps, 'onActiveChanged', e, props);
    },
    variables: mergeVariablesOverrides(variables, predefinedProps.variables),
  });

  const handleDividerOverrides = predefinedProps => ({
    variables: mergeVariablesOverrides(variables, predefinedProps.variables),
  });

  const renderItems = () => {
    const itemsCount = _.filter(items, item => getKindProp(item, 'item') !== 'divider').length;
    let itemPosition = 0;

    return _.map(items, (item, index) => {
      const kind = getKindProp(item, 'item');

      if (kind === 'divider') {
        return createShorthand(MenuDivider, item as ShorthandValue<MenuDividerProps>, {
          defaultProps: () => getA11yProps('divider', {}),
          overrideProps: handleDividerOverrides,
        });
      }

      itemPosition++;

      return createShorthand(MenuItem, item, {
        defaultProps: () =>
          getA11yProps('item', {
            index,
            itemPosition,
            itemsCount,
          }),
        overrideProps: handleItemOverrides,
      });
    });
  };

  const childBehaviors = accessibility && accessibility(props).childBehaviors;

  const childProps: MenuContextValue = {
    activeIndex: +activeIndex,
    onItemClick: handleClick,
    onItemSelect: handleSelect,
    vertical,
    variables,

    slotProps: {
      item: itemProps,
      divider: dividerProps,
    },

    behaviors: {
      item: childBehaviors?.item,
      divider: childBehaviors?.divider,
    },
  };

  const element = getA11yProps.unstable_wrapWithFocusZone(
    <ElementType
      {...getA11yProps('root', {
        className: classes.root,
        ...rtlTextContainer.getAttributes({ forElements: [children] }),
        ...unhandledProps,
      })}
    >
      <MenuContextProvider value={childProps}>{childrenExist(children) ? children : renderItems()}</MenuContextProvider>
    </ElementType>,
  );

  const wrappedElement = ref ? <Ref innerRef={ref}>{element}</Ref> : element;

  setEnd();

  return wrappedElement;
}) as unknown as ForwardRefWithAs<'ul', HTMLUListElement, MenuProps> &
  FluentComponentStaticProps<MenuProps> & {
    create: ShorthandFactory<MenuProps>;
    shorthandConfig: ShorthandConfig<MenuProps>;
    Item: typeof MenuItem;
    ItemContent: typeof MenuItemContent;
    ItemIcon: typeof MenuItemIcon;
    ItemIndicator: typeof MenuItemIndicator;
    ItemWrapper: typeof MenuItemWrapper;
    Divider: typeof MenuDivider;
  };

Menu.displayName = 'Menu';

Menu.propTypes = {
  ...commonPropTypes.createCommon({
    content: false,
  }),
  activeIndex: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  defaultActiveIndex: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  fluid: PropTypes.bool,
  iconOnly: PropTypes.bool,
  items: customPropTypes.collectionShorthandWithKindProp(['divider', 'item']),
  onItemClick: PropTypes.func,
  onActiveIndexChange: PropTypes.func,
  pills: PropTypes.bool,
  pointing: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf<'start' | 'end'>(['start', 'end'])]),
  primary: customPropTypes.every([customPropTypes.disallow(['secondary']), PropTypes.bool]),
  secondary: customPropTypes.every([customPropTypes.disallow(['primary']), PropTypes.bool]),
  underlined: PropTypes.bool,
  vertical: PropTypes.bool,
  submenu: PropTypes.bool,
  indicator: customPropTypes.shorthandAllowingChildren,
};

Menu.handledProps = Object.keys(Menu.propTypes) as any;

Menu.defaultProps = {
  as: 'ul',
  accessibility: menuBehavior,
};

Menu.Item = MenuItem;
Menu.ItemIcon = MenuItemIcon;
Menu.ItemContent = MenuItemContent;
Menu.ItemWrapper = MenuItemWrapper;
Menu.ItemIndicator = MenuItemIndicator;
Menu.Divider = MenuDivider;

Menu.create = createShorthandFactory({ Component: Menu, mappedArrayProp: 'items' });
Menu.shorthandConfig = { mappedArrayProp: 'items' };
