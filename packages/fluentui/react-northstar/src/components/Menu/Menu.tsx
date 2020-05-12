import { Accessibility, menuBehavior, MenuBehaviorProps } from '@fluentui/accessibility';
import {
  useAccessibility,
  getElementType,
  useStyles,
  useTelemetry,
  useUnhandledProps,
  useAutoControlled,
} from '@fluentui/react-bindings';
// @ts-ignore
import { ThemeContext } from 'react-fela';
import * as customPropTypes from '@fluentui/react-proptypes';
import { mergeComponentVariables } from '@fluentui/styles';
import * as _ from 'lodash';
import * as PropTypes from 'prop-types';
import * as React from 'react';

import {
  childrenExist,
  createShorthandFactory,
  UIComponentProps,
  ChildrenComponentProps,
  commonPropTypes,
  getKindProp,
  rtlTextContainer,
} from '../../utils';

import MenuItem, { MenuItemProps } from './MenuItem';
import {
  WithAsProp,
  ShorthandCollection,
  ShorthandValue,
  withSafeTypeForAs,
  ComponentEventHandler,
  FluentComponentStaticProps,
  ProviderContextPrepared,
} from '../../types';
import MenuDivider from './MenuDivider';
import { BoxProps } from '../Box/Box';

export type MenuShorthandKinds = 'divider' | 'item';

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
  indicator?: ShorthandValue<BoxProps>;
}

export const menuClassName = 'ui-menu';

export type MenuStylesProps = Required<
  Pick<MenuProps, 'iconOnly' | 'fluid' | 'pointing' | 'pills' | 'primary' | 'underlined' | 'vertical' | 'submenu'>
>;

export const Menu: React.FC<WithAsProp<MenuProps>> &
  FluentComponentStaticProps<MenuProps> & {
    Item: typeof MenuItem;
    Divider: typeof MenuDivider;
  } = props => {
  const context: ProviderContextPrepared = React.useContext(ThemeContext);
  const { setStart, setEnd } = useTelemetry(Menu.displayName, context.telemetry);
  setStart();
  const {
    iconOnly,
    items,
    pills,
    pointing,
    primary,
    secondary,
    underlined,
    vertical,
    submenu,
    indicator,
    children,
    variables,
    styles,
    fluid,
    className,
    design,
  } = props;
  const ElementType = getElementType(props);
  const unhandledProps = useUnhandledProps(Menu.handledProps, props);

  const getA11yProps = useAccessibility<MenuBehaviorProps>(props.accessibility, {
    debugName: Menu.displayName,
    mapPropsToBehavior: () => ({
      vertical,
    }),
    rtl: context.rtl,
  });

  const { classes, styles: resolvedStyles } = useStyles<MenuStylesProps>(Menu.displayName, {
    className: menuClassName,
    mapPropsToStyles: () => ({
      iconOnly,
      fluid,
      pointing,
      pills,
      primary,
      underlined,
      vertical,
      submenu,
    }),
    mapPropsToInlineStyles: () => ({
      className,
      design,
      styles,
      variables,
    }),
    rtl: context.rtl,
  });

  const [activeIndex, setIndex] = useAutoControlled({
    defaultValue: props.defaultActiveIndex,
    value: props.activeIndex,
    initialValue: undefined,
  });

  const setActiveIndex = (e: React.SyntheticEvent, activeIndex: number) => {
    _.invoke(props, 'onActiveIndexChange', e, { ...props, activeIndex });
    setIndex(activeIndex);
  };

  const handleItemOverrides = variables => predefinedProps => ({
    onClick: (e, itemProps) => {
      const { index } = itemProps;

      setActiveIndex(e, index);

      _.invoke(props, 'onItemClick', e, itemProps);
      _.invoke(predefinedProps, 'onClick', e, itemProps);
    },
    onActiveChanged: (e, props) => {
      const { index, active } = props;
      if (active) {
        setActiveIndex(e, index);
      } else if (activeIndex === index) {
        setActiveIndex(e, null);
      }
      _.invoke(predefinedProps, 'onActiveChanged', e, props);
    },
    variables: mergeComponentVariables(variables, predefinedProps.variables),
  });

  const handleDividerOverrides = variables => predefinedProps => ({
    variables: mergeComponentVariables(variables, predefinedProps.variables),
  });

  const renderItems = () => {
    const itemsCount = _.filter(items, item => getKindProp(item, 'item') !== 'divider').length;
    let itemPosition = 0;

    const overrideItemProps = handleItemOverrides(variables);
    const overrideDividerProps = handleDividerOverrides(variables);

    return _.map(items, (item, index) => {
      const active = (typeof activeIndex === 'string' ? parseInt(activeIndex, 10) : activeIndex) === index;
      const kind = getKindProp(item, 'item');

      if (kind === 'divider') {
        return MenuDivider.create(item, {
          defaultProps: () =>
            getA11yProps('divider', {
              primary,
              secondary,
              vertical,
              styles: resolvedStyles.divider,
              inSubmenu: submenu,
            }),
          overrideProps: overrideDividerProps,
        });
      }

      itemPosition++;

      return MenuItem.create(item, {
        defaultProps: () =>
          getA11yProps('item', {
            iconOnly,
            pills,
            pointing,
            primary,
            secondary,
            underlined,
            vertical,
            index,
            itemPosition,
            itemsCount,
            active,
            inSubmenu: submenu,
            indicator,
          }),
        overrideProps: overrideItemProps,
      });
    });
  };

  const element = getA11yProps.unstable_wrapWithFocusZone(
    <ElementType
      {...getA11yProps('root', {
        className: classes.root,
        ...unhandledProps,
      })}
      {...rtlTextContainer.getAttributes({ forElements: [children] })}
    >
      {childrenExist(children) ? children : renderItems()}
    </ElementType>,
  );
  setEnd();
  return element;
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

Menu.defaultProps = {
  as: 'ul',
  accessibility: menuBehavior as Accessibility,
};

Menu.handledProps = Object.keys(Menu.propTypes) as any;

Menu.Item = MenuItem;
Menu.Divider = MenuDivider;

Menu.create = createShorthandFactory({ Component: Menu, mappedArrayProp: 'items' });

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
export default withSafeTypeForAs<typeof Menu, MenuProps, 'ul'>(Menu);
