import { Ref } from '@fluentui/react-component-ref';
import * as customPropTypes from '@fluentui/react-proptypes';
import * as React from 'react';
import * as PropTypes from 'prop-types';
import * as _ from 'lodash';
import { CloseIcon } from '@fluentui/react-icons-northstar';

import keyboardKey from 'keyboard-key';
import {
  ComponentEventHandler,
  ShorthandValue,
  WithAsProp,
  ComponentKeyboardEventHandler,
  withSafeTypeForAs,
} from '../../types';
import { UIComponentProps } from '../../utils/commonPropInterfaces';
import {
  createShorthandFactory,
  UIComponent,
  RenderResultConfig,
  commonPropTypes,
  ShorthandFactory,
} from '../../utils';
import Image, { ImageProps } from '../Image/Image';
import Label from '../Label/Label';
import Box, { BoxProps } from '../Box/Box';

export interface DropdownSelectedItemSlotClassNames {
  header: string;
  icon: string;
  image: string;
}

export interface DropdownSelectedItemProps extends UIComponentProps<DropdownSelectedItemProps> {
  /** A selected item can be active. */
  active?: boolean;

  /** Header of the selected item. */
  header?: ShorthandValue<BoxProps>;

  /** Icon of the selected item. */
  icon?: ShorthandValue<BoxProps>;

  /** Image of the selected item. */
  image?: ShorthandValue<ImageProps>;

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

class DropdownSelectedItem extends UIComponent<WithAsProp<DropdownSelectedItemProps>, any> {
  itemRef = React.createRef<HTMLElement>();

  static displayName = 'DropdownSelectedItem';
  static create: ShorthandFactory<DropdownSelectedItemProps>;
  static deprecated_className = dropdownSelectedItemClassName;

  static propTypes = {
    ...commonPropTypes.createCommon({
      accessibility: false,
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

  static defaultProps = {
    // TODO: fix me
    icon: <CloseIcon />,
  };

  componentDidUpdate(prevProps: DropdownSelectedItemProps) {
    if (!prevProps.active && this.props.active) {
      this.itemRef.current.focus();
    }
  }

  handleClick = (e: React.SyntheticEvent) => {
    _.invoke(this.props, 'onClick', e, this.props);
  };

  handleKeyDown = (e: React.SyntheticEvent) => {
    _.invoke(this.props, 'onKeyDown', e, this.props);
  };

  handleIconOverrides = props => (predefinedProps: BoxProps) => ({
    ...props,
    onClick: (e: React.SyntheticEvent, iconProps: BoxProps) => {
      e.stopPropagation();
      _.invoke(this.props, 'onRemove', e, this.props);
      _.invoke(predefinedProps, 'onClick', e, iconProps);
    },
    onKeyDown: (e: React.SyntheticEvent, iconProps: BoxProps) => {
      e.stopPropagation();
      if (keyboardKey.getCode(e) === keyboardKey.Enter) {
        _.invoke(this.props, 'onRemove', e, this.props);
      }
      _.invoke(predefinedProps, 'onKeyDown', e, iconProps);
    },
  });

  renderComponent({ unhandledProps, classes, styles }: RenderResultConfig<DropdownSelectedItemProps>) {
    const { active, header, icon, image } = this.props;

    const contentElement = Box.create(header, {
      defaultProps: () => ({
        as: 'span',
        className: dropdownSelectedItemSlotClassNames.header,
        styles: styles.header,
      }),
    });
    const iconProps = _.isNil(icon)
      ? icon
      : {
          name: null,
          children: (ComponentType, props) =>
            Box.create(icon, {
              defaultProps: () => ({
                'aria-label': `Remove ${header} from selection.`, // TODO: Extract this in a behaviour.
                className: dropdownSelectedItemSlotClassNames.icon,
                styles: styles.icon,
              }),
              overrideProps: this.handleIconOverrides(props),
            }),
        };
    const imageProps = _.isNil(image)
      ? image
      : {
          children: (ComponentType, props) =>
            Image.create(image, {
              defaultProps: () => ({
                avatar: true,
                className: dropdownSelectedItemSlotClassNames.image,
                styles: styles.image,
              }),
              overrideProps: props,
            }),
        };

    return (
      <Ref innerRef={this.itemRef}>
        <Label
          className={classes.root}
          tabIndex={active ? 0 : -1}
          styles={styles.root}
          circular
          onClick={this.handleClick}
          onKeyDown={this.handleKeyDown}
          content={contentElement}
          icon={iconProps}
          image={imageProps}
          {...unhandledProps}
        />
      </Ref>
    );
  }
}

DropdownSelectedItem.create = createShorthandFactory({
  Component: DropdownSelectedItem,
  mappedProp: 'header',
});

/**
 * A DropdownSelectedItem represents a selected item of 'multiple-selection' Dropdown.
 */
export default withSafeTypeForAs<typeof DropdownSelectedItem, DropdownSelectedItemProps>(DropdownSelectedItem);
