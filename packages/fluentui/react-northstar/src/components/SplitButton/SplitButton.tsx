import { Accessibility, splitButtonBehavior } from '@fluentui/accessibility';
import * as customPropTypes from '@fluentui/react-proptypes';
import * as PropTypes from 'prop-types';
import * as React from 'react';
import * as _ from 'lodash';
import { ALIGNMENTS, POSITIONS } from '../../utils/positioner';
import { WithAsProp, withSafeTypeForAs, ComponentEventHandler, ShorthandValue, ShorthandCollection } from '../../types';
import {
  UIComponentProps,
  ChildrenComponentProps,
  ContentComponentProps,
  createShorthand,
  isFromKeyboard,
  commonPropTypes,
  AutoControlledComponent,
  RenderResultConfig,
  ShorthandFactory,
  SizeValue,
} from '../../utils';
import SplitButtonToggle, { SplitButtonToggleProps } from './SplitButtonToggle';
import Button, { ButtonProps } from '../Button/Button';
import MenuButton, { MenuButtonProps } from '../MenuButton/MenuButton';
import { MenuProps } from '../Menu/Menu';
import { MenuItemProps } from '../Menu/MenuItem';
import { PopupProps } from '../Popup/Popup';
import { Ref } from '@fluentui/react-component-ref';
import { PositioningProps } from '../../utils/positioner/types';

export interface SplitButtonProps
  extends UIComponentProps,
    ChildrenComponentProps,
    ContentComponentProps,
    PositioningProps {
  /**
   * Accessibility behavior if overridden by the user.
   */
  accessibility?: Accessibility;

  /** Shorthand for the main button. */
  button?: ShorthandValue<ButtonProps>;

  /** Initial value for 'open'. */
  defaultOpen?: boolean;

  /** A split button can be disabled. */
  disabled?: boolean;

  /** Shorthand for the menu. */
  menu?: ShorthandValue<MenuProps> | ShorthandCollection<MenuItemProps>;

  /**
   * Called after user's click on the main button.
   *
   * @param event - React's original SyntheticEvent.
   * @param data - All props.
   */
  onMainButtonClick?: ComponentEventHandler<ButtonProps>;

  /**
   * Called after user's click on a menu item.
   *
   * @param event - React's original SyntheticEvent.
   * @param data - All props.
   */
  onMenuItemClick?: ComponentEventHandler<MenuItemProps>;

  /**
   * Event for request to change 'open' value.
   * @param event - React's original SyntheticEvent.
   * @param data - All props and proposed value.
   */
  onOpenChange?: ComponentEventHandler<SplitButtonProps>;

  /** Defines whether menu is displayed. */
  open?: boolean;

  /** A split button can be formatted to show different levels of emphasis. */
  primary?: boolean;

  /** A split button can be formatted to show different levels of emphasis. */
  secondary?: boolean;

  /** A split button can be sized */
  size?: SizeValue;

  /** Shorthand for the toggle button. */
  toggleButton?: ShorthandValue<SplitButtonToggleProps>;
}

export interface SplitButtonState {
  isFromKeyboard: boolean;
  open: boolean;
}

export const splitButtonClassName = 'ui-splitbutton';

class SplitButton extends AutoControlledComponent<WithAsProp<SplitButtonProps>, SplitButtonState> {
  static create: ShorthandFactory<SplitButton>;

  static displayName = 'SplitButton';

  static Toggle = SplitButtonToggle;

  static deprecated_className = splitButtonClassName;

  static propTypes = {
    ...commonPropTypes.createCommon({
      content: false,
    }),
    button: customPropTypes.itemShorthand,
    defaultOpen: PropTypes.bool,
    menu: PropTypes.oneOfType([
      customPropTypes.itemShorthand,
      PropTypes.arrayOf(customPropTypes.itemShorthandWithoutJSX),
    ]),
    onMainButtonClick: PropTypes.func,
    onMenuItemClick: PropTypes.func,
    onOpenChange: PropTypes.func,
    open: PropTypes.bool,
    size: customPropTypes.size,
    primary: customPropTypes.every([customPropTypes.disallow(['secondary']), PropTypes.bool]),
    secondary: customPropTypes.every([customPropTypes.disallow(['primary']), PropTypes.bool]),
    toggleButton: customPropTypes.itemShorthand,
    position: PropTypes.oneOf(POSITIONS),
    align: PropTypes.oneOf(ALIGNMENTS),
    flipBoundary: PropTypes.oneOfType([
      PropTypes.object as PropTypes.Requireable<Element>,
      PropTypes.oneOf<'scrollParent' | 'window' | 'viewport'>(['scrollParent', 'window', 'viewport']),
    ]),
    overflowBoundary: PropTypes.oneOfType([
      PropTypes.object as PropTypes.Requireable<Element>,
      PropTypes.oneOf<'scrollParent' | 'window' | 'viewport'>(['scrollParent', 'window', 'viewport']),
    ]),
    positionFixed: PropTypes.bool,
    offset: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.arrayOf(PropTypes.number) as PropTypes.Requireable<[number, number]>,
    ]),
    unstable_pinned: PropTypes.bool,
  };

  static defaultProps = {
    accessibility: splitButtonBehavior,
    toggleButton: {},
    position: 'below',
    align: 'start',
  };

  static autoControlledProps = ['open'];

  targetRef = React.createRef<HTMLDivElement>();

  getInitialAutoControlledState(): SplitButtonState {
    return {
      isFromKeyboard: false,
      open: false,
    };
  }

  handleMenuButtonOverrides = (predefinedProps: MenuButtonProps) => ({
    onMenuItemClick: (e: React.SyntheticEvent, menuItemProps: MenuItemProps) => {
      this.setState({ open: false });
      _.invoke(this.props, 'onOpenChange', e, { ...this.props, open: false });

      _.invoke(predefinedProps, 'onMenuItemClick', e, menuItemProps);
      _.invoke(this.props, 'onMenuItemClick', e, menuItemProps);
    },
    onOpenChange: (e: React.SyntheticEvent, popupProps: PopupProps) => {
      e.stopPropagation();
      this.setState({ open: popupProps.open });
      _.invoke(this.props, 'onOpenChange', e, { ...this.props, open: popupProps.open });
    },
  });

  handleMenuButtonTriggerOverrides = (predefinedProps: ButtonProps) => ({
    onClick: (e: React.SyntheticEvent, buttonProps: ButtonProps) => {
      _.invoke(predefinedProps, 'onClick', e, buttonProps);
      _.invoke(this.props, 'onMainButtonClick', e, buttonProps);
    },
    onFocus: (e: React.SyntheticEvent, buttonProps: ButtonProps) => {
      _.invoke(predefinedProps, 'onFocus', e, buttonProps);
      this.setState({ isFromKeyboard: isFromKeyboard() });
    },
  });

  renderComponent({
    ElementType,
    classes,
    accessibility,
    styles,
    unhandledProps,
  }: RenderResultConfig<MenuButtonProps>): React.ReactNode {
    const {
      button,
      disabled,
      menu,
      primary,
      secondary,
      toggleButton,
      size,
      position,
      align,
      flipBoundary,
      overflowBoundary,
      positionFixed,
      offset,
      unstable_pinned,
    } = this.props;
    const trigger = createShorthand(Button, button, {
      defaultProps: () => ({
        styles: styles.menuButton,
        primary,
        secondary,
        disabled,
      }),
      overrideProps: this.handleMenuButtonTriggerOverrides,
    });

    return (
      <Ref innerRef={this.targetRef}>
        <ElementType className={classes.root} {...accessibility.attributes.root} {...unhandledProps}>
          {MenuButton.create(
            {},
            {
              defaultProps: () => ({
                accessibility: accessibility.childBehaviors ? accessibility.childBehaviors.menuButton : undefined,
                menu,
                // Opening is handled manually.
                on: [],
                open: this.state.open,
                trigger,
                target: this.targetRef.current,
                position,
                align,
                flipBoundary,
                overflowBoundary,
                positionFixed,
                offset,
                unstable_pinned,
              }),
              overrideProps: this.handleMenuButtonOverrides,
            },
          )}

          {SplitButtonToggle.create(toggleButton, {
            defaultProps: () => ({
              disabled,
              primary,
              secondary,
              size,
              ...accessibility.attributes.toggleButton,
            }),
            overrideProps: (predefinedProps: ButtonProps) => ({
              onClick: (e: React.SyntheticEvent, buttonProps: ButtonProps) => {
                _.invoke(predefinedProps, 'onClick', e, buttonProps);

                this.setState(state => {
                  const open = !state.open;
                  _.invoke(this.props, 'onOpenChange', e, { ...this.props, open });
                  return { open };
                });
              },
            }),
          })}
        </ElementType>
      </Ref>
    );
  }
}

/**
 * A SplitButton enables users to take one of several related actions, one being dominant and rest being displayed in a menu.
 */
export default withSafeTypeForAs<typeof SplitButton, SplitButtonProps>(SplitButton);
