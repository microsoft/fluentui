import { Accessibility, splitButtonBehavior, SplitButtonBehaviorProps } from '@fluentui/accessibility';
import * as customPropTypes from '@fluentui/react-proptypes';
import * as PropTypes from 'prop-types';
import * as React from 'react';
import * as _ from 'lodash';
import { ALIGNMENTS, POSITIONS, AUTOSIZES } from '../../utils/positioner';
import { ComponentEventHandler, ShorthandValue, ShorthandCollection, FluentComponentStaticProps } from '../../types';
import {
  UIComponentProps,
  ChildrenComponentProps,
  ContentComponentProps,
  isFromKeyboard as checkIsFromKeyboard,
  commonPropTypes,
  SizeValue,
  createShorthand,
  createShorthandFactory,
} from '../../utils';
import { SplitButtonToggle, SplitButtonToggleProps } from './SplitButtonToggle';
import { Button, ButtonProps } from '../Button/Button';
import { MenuButton, MenuButtonProps } from '../MenuButton/MenuButton';
import { MenuProps } from '../Menu/Menu';
import { MenuItemProps } from '../Menu/MenuItem';
import { PopupProps } from '../Popup/Popup';
import { SplitButtonDivider } from './SplitButtonDivider';
import { Ref } from '@fluentui/react-component-ref';
import { PositioningProps, AutoSize } from '../../utils/positioner/types';

import {
  useTelemetry,
  useAutoControlled,
  useAccessibility,
  getElementType,
  useFluentContext,
  useUnhandledProps,
  useStyles,
  ForwardRefWithAs,
} from '@fluentui/react-bindings';

export interface SplitButtonProps
  extends UIComponentProps,
    ChildrenComponentProps,
    ContentComponentProps,
    PositioningProps {
  /**
   * Accessibility behavior if overridden by the user.
   */
  accessibility?: Accessibility<SplitButtonBehaviorProps>;

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

  /** A button can be elevated or flat. */
  flat?: boolean;

  /** Shorthand for the toggle button. */
  toggleButton?: ShorthandValue<SplitButtonToggleProps>;
}

export const splitButtonClassName = 'ui-splitbutton';

export type SplitButtonStylesProps = Required<Pick<SplitButtonProps, 'size'>> & {
  flat: boolean;
  isFromKeyboard: boolean;
};

/**
 * A SplitButton enables users to take one of several related actions, one being dominant and rest being displayed in a menu.
 */
export const SplitButton = React.forwardRef<HTMLDivElement, SplitButtonProps>((props, ref) => {
  const context = useFluentContext();
  const { setStart, setEnd } = useTelemetry(SplitButton.displayName, context.telemetry);
  setStart();

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
    flat,
    overflowBoundary,
    popperRef,
    positionFixed,
    offset,
    unstable_disableTether,
    unstable_pinned,
    autoSize,
    className,
    design,
    styles,
    accessibility,
    variables,
  } = props;

  const targetRef = React.useRef<HTMLDivElement>();
  const ElementType = getElementType(props);
  const unhandledProps = useUnhandledProps(SplitButton.handledProps, props);
  const [open, setOpen] = useAutoControlled({
    defaultValue: props.defaultOpen,
    value: props.open,
    initialValue: false,
  });

  const [isFromKeyboard, setIsFromKeyboard] = React.useState<boolean>(false);

  const getA11yProps = useAccessibility<SplitButtonBehaviorProps>(accessibility, {
    debugName: SplitButton.displayName,
    mapPropsToBehavior: () => ({
      open,
    }),
    rtl: context.rtl,
  });

  const { classes, styles: resolvedStyles } = useStyles<SplitButtonStylesProps>(SplitButton.displayName, {
    className: splitButtonClassName,
    mapPropsToStyles: () => ({
      isFromKeyboard,
      size,
      flat,
    }),
    mapPropsToInlineStyles: () => ({
      className,
      design,
      styles,
      variables,
    }),
    rtl: context.rtl,
  });

  const handleMenuButtonOverrides = (predefinedProps: MenuButtonProps) => ({
    onMenuItemClick: (e: React.SyntheticEvent, menuItemProps: MenuItemProps) => {
      setOpen(false);
      _.invoke(props, 'onOpenChange', e, { ...props, open: false });

      _.invoke(predefinedProps, 'onMenuItemClick', e, menuItemProps);
      _.invoke(props, 'onMenuItemClick', e, menuItemProps);
    },
    onOpenChange: (e: React.SyntheticEvent, popupProps: PopupProps) => {
      e.stopPropagation();
      setOpen(popupProps.open);
      _.invoke(props, 'onOpenChange', e, { ...props, open: popupProps.open });
    },
  });

  const handleMenuButtonTriggerOverrides = (predefinedProps: ButtonProps) => ({
    onClick: (e: React.SyntheticEvent, buttonProps: ButtonProps) => {
      _.invoke(predefinedProps, 'onClick', e, buttonProps);
      _.invoke(props, 'onMainButtonClick', e, buttonProps);
    },
    onFocus: (e: React.SyntheticEvent, buttonProps: ButtonProps) => {
      _.invoke(predefinedProps, 'onFocus', e, buttonProps);
      setIsFromKeyboard(checkIsFromKeyboard());
    },
  });

  const element = (
    <Ref innerRef={targetRef}>
      <ElementType
        {...getA11yProps('root', {
          className: classes.root,
          ref,
          ...unhandledProps,
        })}
      >
        {MenuButton.create(
          {},
          {
            defaultProps: () =>
              getA11yProps('menuButton', {
                menu,
                on: [],
                open,
                trigger: createShorthand(Button, button, {
                  defaultProps: () => ({
                    styles: resolvedStyles.menuButton,
                    primary,
                    secondary,
                    disabled,
                  }),
                  overrideProps: handleMenuButtonTriggerOverrides,
                }),
                target: targetRef.current,
                position,
                align,
                flipBoundary,
                overflowBoundary,
                popperRef,
                positionFixed,
                offset,
                unstable_disableTether,
                unstable_pinned,
                autoSize,
              }),
            overrideProps: handleMenuButtonOverrides,
          },
        )}

        {createShorthand(
          SplitButtonDivider,
          {},
          {
            defaultProps: () =>
              getA11yProps('divider', {
                primary,
              }),
          },
        )}
        {SplitButtonToggle.create(toggleButton, {
          defaultProps: () =>
            getA11yProps('toggleButton', {
              disabled,
              primary,
              secondary,
              size,
              flat,
            }),
          overrideProps: (predefinedProps: ButtonProps) => ({
            onClick: (e: React.SyntheticEvent, buttonProps: ButtonProps) => {
              _.invoke(predefinedProps, 'onClick', e, buttonProps);

              setOpen(isOpen => {
                const open = !isOpen;
                _.invoke(props, 'onOpenChange', e, { ...props, open });
                return open;
              });
            },
          }),
        })}
      </ElementType>
    </Ref>
  );

  setEnd();
  return element;
}) as unknown as ForwardRefWithAs<'div', HTMLDivElement, SplitButtonProps> &
  FluentComponentStaticProps<SplitButtonProps> & {
    Toggle: typeof SplitButtonToggle;
  };

SplitButton.displayName = 'SplitButton';

SplitButton.Toggle = SplitButtonToggle;

SplitButton.propTypes = {
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
  flat: PropTypes.bool,
  popperRef: customPropTypes.ref,
  primary: customPropTypes.every([customPropTypes.disallow(['secondary']), PropTypes.bool]),
  secondary: customPropTypes.every([customPropTypes.disallow(['primary']), PropTypes.bool]),
  toggleButton: customPropTypes.itemShorthand,
  position: PropTypes.oneOf(POSITIONS),
  align: PropTypes.oneOf(ALIGNMENTS),
  flipBoundary: PropTypes.oneOfType([
    PropTypes.object as PropTypes.Requireable<HTMLElement>,
    PropTypes.arrayOf(PropTypes.object) as PropTypes.Requireable<HTMLElement[]>,
    PropTypes.oneOf<'clippingParents' | 'window' | 'scrollParent'>(['clippingParents', 'window', 'scrollParent']),
  ]),
  overflowBoundary: PropTypes.oneOfType([
    PropTypes.object as PropTypes.Requireable<HTMLElement>,
    PropTypes.arrayOf(PropTypes.object) as PropTypes.Requireable<HTMLElement[]>,
    PropTypes.oneOf<'clippingParents' | 'window' | 'scrollParent'>(['clippingParents', 'window', 'scrollParent']),
  ]),
  positionFixed: PropTypes.bool,
  offset: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.arrayOf(PropTypes.number) as PropTypes.Requireable<[number, number]>,
  ]),
  unstable_disableTether: PropTypes.oneOf([true, false, 'all']),
  unstable_pinned: PropTypes.bool,
  autoSize: PropTypes.oneOf<AutoSize>(AUTOSIZES),
};

SplitButton.defaultProps = {
  accessibility: splitButtonBehavior,
  toggleButton: {},
  position: 'below',
  align: 'start',
};

SplitButton.handledProps = Object.keys(SplitButton.propTypes) as any;

SplitButton.create = createShorthandFactory({
  Component: SplitButton,
});
