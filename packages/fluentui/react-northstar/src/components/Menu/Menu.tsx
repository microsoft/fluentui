import { Accessibility, menuBehavior } from '@fluentui/accessibility';
import { ReactAccessibilityBehavior } from '@fluentui/react-bindings';
import * as customPropTypes from '@fluentui/react-proptypes';
import { ComponentVariablesObject, ComponentSlotStylesPrepared, mergeComponentVariables } from '@fluentui/styles';
import * as _ from 'lodash';
import * as PropTypes from 'prop-types';
import * as React from 'react';

import {
  AutoControlledComponent,
  childrenExist,
  createShorthandFactory,
  createShorthand,
  UIComponentProps,
  ChildrenComponentProps,
  commonPropTypes,
  getKindProp,
  rtlTextContainer,
  ShorthandFactory,
} from '../../utils';

import MenuItem, { MenuItemProps } from './MenuItem';
import { WithAsProp, ShorthandCollection, ShorthandValue, withSafeTypeForAs, ComponentEventHandler } from '../../types';
import MenuDivider from './MenuDivider';
import { BoxProps } from '../Box/Box';

export type MenuShorthandKinds = 'divider' | 'item';

export interface MenuProps extends UIComponentProps, ChildrenComponentProps {
  /**
   * Accessibility behavior if overridden by the user.
   * @available menuAsToolbarBehavior, tabListBehavior, tabBehavior
   */
  accessibility?: Accessibility;

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

export interface MenuState {
  activeIndex?: number | string;
}

export const menuClassName = 'ui-menu';

class Menu extends AutoControlledComponent<WithAsProp<MenuProps>, MenuState> {
  static displayName = 'Menu';

  static deprecated_className = menuClassName;

  static create: ShorthandFactory<MenuProps>;

  static propTypes = {
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
    pointing: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(['start', 'end'])]),
    primary: customPropTypes.every([customPropTypes.disallow(['secondary']), PropTypes.bool]),
    secondary: customPropTypes.every([customPropTypes.disallow(['primary']), PropTypes.bool]),
    underlined: PropTypes.bool,
    vertical: PropTypes.bool,
    submenu: PropTypes.bool,
    indicator: customPropTypes.shorthandAllowingChildren,
  };

  static defaultProps = {
    as: 'ul',
    accessibility: menuBehavior as Accessibility,
  };

  static autoControlledProps = ['activeIndex'];

  static Item = MenuItem;
  static Divider = MenuDivider;

  setActiveIndex = (e: React.SyntheticEvent, activeIndex: number) => {
    _.invoke(this.props, 'onActiveIndexChange', e, { ...this.props, activeIndex });
    this.setState({ activeIndex });
  };

  handleItemOverrides = variables => predefinedProps => ({
    onClick: (e, itemProps) => {
      const { index } = itemProps;

      this.setActiveIndex(e, index);

      _.invoke(this.props, 'onItemClick', e, itemProps);
      _.invoke(predefinedProps, 'onClick', e, itemProps);
    },
    onActiveChanged: (e, props) => {
      const { index, active } = props;
      if (active) {
        this.setActiveIndex(e, index);
      } else if (this.state.activeIndex === index) {
        this.setActiveIndex(e, null);
      }
      _.invoke(predefinedProps, 'onActiveChanged', e, props);
    },
    variables: mergeComponentVariables(variables, predefinedProps.variables),
  });

  handleDividerOverrides = variables => predefinedProps => ({
    variables: mergeComponentVariables(variables, predefinedProps.variables),
  });

  renderItems = (
    styles: ComponentSlotStylesPrepared,
    variables: ComponentVariablesObject,
    accessibility: ReactAccessibilityBehavior,
  ) => {
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
    } = this.props;
    const { activeIndex } = this.state;
    const itemsCount = _.filter(items, item => getKindProp(item, 'item') !== 'divider').length;
    let itemPosition = 0;

    const overrideItemProps = this.handleItemOverrides(variables);
    const overrideDividerProps = this.handleDividerOverrides(variables);

    return _.map(items, (item, index) => {
      const active = (typeof activeIndex === 'string' ? parseInt(activeIndex, 10) : activeIndex) === index;
      const kind = getKindProp(item, 'item');

      if (kind === 'divider') {
        return MenuDivider.create(item, {
          defaultProps: () => ({
            primary,
            secondary,
            vertical,
            styles: styles.divider,
            inSubmenu: submenu,
            accessibility: accessibility.childBehaviors ? accessibility.childBehaviors.divider : undefined,
          }),
          overrideProps: overrideDividerProps,
        });
      }

      itemPosition++;

      return createShorthand(MenuItem, item, {
        defaultProps: () => ({
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
          accessibility: accessibility.childBehaviors ? accessibility.childBehaviors.item : undefined,
        }),
        overrideProps: overrideItemProps,
      });
    });
  };

  renderComponent({ ElementType, classes, accessibility, styles, variables, unhandledProps }) {
    const { children } = this.props;
    return (
      <ElementType
        {...accessibility.attributes.root}
        {...rtlTextContainer.getAttributes({ forElements: [children] })}
        {...unhandledProps}
        className={classes.root}
      >
        {childrenExist(children) ? children : this.renderItems(styles, variables, accessibility)}
      </ElementType>
    );
  }
}

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
