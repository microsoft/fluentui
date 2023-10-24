import {
  Accessibility,
  dropdownSelectedItemBehavior,
  DropdownSelectedItemBehaviorProps,
  getCode,
  keyboardKey,
} from '@fluentui/accessibility';
import { Ref } from '@fluentui/react-component-ref';
import * as customPropTypes from '@fluentui/react-proptypes';
import * as React from 'react';
import * as PropTypes from 'prop-types';
import * as _ from 'lodash';
import { CloseIcon } from '@fluentui/react-icons-northstar';
import {
  ComponentEventHandler,
  ShorthandValue,
  ComponentKeyboardEventHandler,
  FluentComponentStaticProps,
} from '../../types';
import { UIComponentProps } from '../../utils/commonPropInterfaces';
import { createShorthandFactory, commonPropTypes } from '../../utils';
import { Image, ImageProps } from '../Image/Image';
import { Box, BoxProps } from '../Box/Box';
import {
  useUnhandledProps,
  useStyles,
  useFluentContext,
  useTelemetry,
  getElementType,
  useAccessibility,
  ForwardRefWithAs,
} from '@fluentui/react-bindings';

export interface DropdownSelectedItemSlotClassNames {
  header: string;
  icon: string;
  image: string;
}

export interface DropdownSelectedItemProps extends UIComponentProps<DropdownSelectedItemProps> {
  /**
   * Accessibility behavior if overridden by the user.
   */
  accessibility?: Accessibility<DropdownSelectedItemBehaviorProps>;

  /** A selected item can be active. */
  active?: boolean;

  /** Header of the selected item. */
  header?: ShorthandValue<BoxProps>;

  /** Icon of the selected item. */
  icon?: ShorthandValue<BoxProps>;

  /** Image of the selected item. */
  image?: ShorthandValue<ImageProps>;

  /** A dropdown selected item can show that it cannot be interacted with. */
  disabled?: boolean;

  /**
   * Called on selected item click.
   *
   * @param event - React's original SyntheticEvent.
   * @param data - All props and proposed value.
   */
  onClick?: ComponentEventHandler<DropdownSelectedItemProps>;

  /**
   * Called on selected item key down.
   *
   * @param event - React's original SyntheticEvent.
   * @param data - All props and proposed value.
   */
  onKeyDown?: ComponentKeyboardEventHandler<DropdownSelectedItemProps>;

  /**
   * Called when item is removed from the selection list.
   *
   * @param event - React's original SyntheticEvent.
   * @param data - All props and proposed value.
   */
  onRemove?: ComponentEventHandler<DropdownSelectedItemProps>;
}

export const dropdownSelectedItemClassName = 'ui-dropdown__selecteditem';
export const dropdownSelectedItemSlotClassNames: DropdownSelectedItemSlotClassNames = {
  header: `${dropdownSelectedItemClassName}__header`,
  icon: `${dropdownSelectedItemClassName}__icon`,
  image: `${dropdownSelectedItemClassName}__image`,
};

export type DropdownSelectedItemStylesProps = { hasImage: boolean };

/**
 * A DropdownSelectedItem represents a selected item of 'multiple-selection' Dropdown.
 */
export const DropdownSelectedItem = React.forwardRef<HTMLSpanElement, DropdownSelectedItemProps>((props, ref) => {
  const context = useFluentContext();
  const { setStart, setEnd } = useTelemetry(DropdownSelectedItem.displayName, context.telemetry);
  setStart();

  const { active, header, icon, image, className, design, styles, variables, disabled } = props;

  const itemRef = React.useRef<HTMLElement>();
  const ElementType = getElementType(props);
  const unhandledProps = useUnhandledProps(DropdownSelectedItem.handledProps, props);

  const getA11yProps = useAccessibility<DropdownSelectedItemBehaviorProps>(props.accessibility, {
    debugName: DropdownSelectedItem.displayName,
    mapPropsToBehavior: () => ({
      header: header as string,
      active,
    }),
    rtl: context.rtl,
  });

  React.useEffect(() => {
    if (active) {
      itemRef.current.focus();
    }
  }, [active]);

  const { classes, styles: resolvedStyles } = useStyles<DropdownSelectedItemStylesProps>(
    DropdownSelectedItem.displayName,
    {
      className: dropdownSelectedItemClassName,
      mapPropsToStyles: () => ({
        hasImage: !!image,
      }),
      mapPropsToInlineStyles: () => ({
        className,
        design,
        styles,
        variables,
      }),
      rtl: context.rtl,
    },
  );

  const handleClick = (e: React.SyntheticEvent) => {
    if (disabled) return;
    _.invoke(props, 'onClick', e, props);
  };

  const handleKeyDown = (e: React.SyntheticEvent) => {
    if (disabled) return;
    _.invoke(props, 'onKeyDown', e, props);
  };

  const handleIconOverrides = iconProps => ({
    ...iconProps,
    onClick: (e: React.SyntheticEvent, iconProps: BoxProps) => {
      if (disabled) return;
      e.stopPropagation();
      _.invoke(props, 'onRemove', e, iconProps);
      _.invoke(props, 'onClick', e, iconProps);
    },
    onKeyDown: (e: React.KeyboardEvent, iconProps: BoxProps) => {
      if (disabled) return;
      e.stopPropagation();
      if (getCode(e) === keyboardKey.Enter) {
        _.invoke(props, 'onRemove', e, iconProps);
      }
      _.invoke(props, 'onKeyDown', e, iconProps);
    },
  });

  const headerElement = Box.create(header, {
    defaultProps: () =>
      getA11yProps('header', {
        as: 'span',
        className: dropdownSelectedItemSlotClassNames.header,
        styles: resolvedStyles.header,
      }),
  });

  const iconElement = Box.create(icon, {
    defaultProps: () =>
      getA11yProps('icon', {
        className: dropdownSelectedItemSlotClassNames.icon,
        styles: resolvedStyles.icon,
      }),
    overrideProps: handleIconOverrides,
  });

  const imageElement = Image.create(image, {
    defaultProps: () =>
      getA11yProps('image', {
        avatar: true,
        className: dropdownSelectedItemSlotClassNames.image,
        styles: resolvedStyles.image,
      }),
  });

  const element = (
    <Ref innerRef={itemRef}>
      <ElementType
        {...getA11yProps('root', {
          className: classes.root,
          onClick: handleClick,
          onKeyDown: handleKeyDown,
          ref,
          ...unhandledProps,
        })}
      >
        {imageElement}
        {headerElement}
        {iconElement}
      </ElementType>
    </Ref>
  );

  setEnd();
  return element;
}) as unknown as ForwardRefWithAs<'span', HTMLSpanElement, DropdownSelectedItemProps> &
  FluentComponentStaticProps<DropdownSelectedItemProps>;

DropdownSelectedItem.displayName = 'DropdownSelectedItem';

DropdownSelectedItem.propTypes = {
  ...commonPropTypes.createCommon({
    children: false,
  }),
  active: PropTypes.bool,
  header: customPropTypes.itemShorthand,
  icon: customPropTypes.shorthandAllowingChildren,
  image: customPropTypes.itemShorthandWithoutJSX,
  onClick: PropTypes.func,
  onKeyDown: PropTypes.func,
  onRemove: PropTypes.func,
};

DropdownSelectedItem.handledProps = Object.keys(DropdownSelectedItem.propTypes) as any;

DropdownSelectedItem.defaultProps = {
  accessibility: dropdownSelectedItemBehavior,
  as: 'span',
  icon: <CloseIcon />,
};

DropdownSelectedItem.create = createShorthandFactory({
  Component: DropdownSelectedItem,
  mappedProp: 'header',
});
