import { Ref } from '@fluentui/react-component-ref';
import * as customPropTypes from '@fluentui/react-proptypes';
import * as React from 'react';
import * as PropTypes from 'prop-types';
import * as _ from 'lodash';
import { CloseIcon } from '@fluentui/react-icons-northstar';

import { getCode, keyboardKey } from '@fluentui/keyboard-key';
import {
  ComponentEventHandler,
  ShorthandValue,
  WithAsProp,
  ComponentKeyboardEventHandler,
  withSafeTypeForAs,
  FluentComponentStaticProps,
  ProviderContextPrepared,
} from '../../types';
import { UIComponentProps } from '../../utils/commonPropInterfaces';
import { createShorthandFactory, commonPropTypes } from '../../utils';
import Image, { ImageProps } from '../Image/Image';
import Box, { BoxProps } from '../Box/Box';
import { useUnhandledProps, useStyles, useTelemetry, getElementType } from '@fluentui/react-bindings';
// @ts-ignore
import { ThemeContext } from 'react-fela';

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

export type DropdownSelectedItemStylesProps = { hasImage: boolean };

const DropdownSelectedItem: React.FC<WithAsProp<DropdownSelectedItemProps>> &
  FluentComponentStaticProps<DropdownSelectedItemProps> = props => {
  const context: ProviderContextPrepared = React.useContext(ThemeContext);
  const { setStart, setEnd } = useTelemetry(DropdownSelectedItem.displayName, context.telemetry);
  setStart();

  const { active, header, icon, image, className, design, styles, variables } = props;

  const itemRef = React.useRef<HTMLElement>();
  const ElementType = getElementType(props);
  const unhandledProps = useUnhandledProps(DropdownSelectedItem.handledProps, props);

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
    _.invoke(props, 'onClick', e, props);
  };

  const handleKeyDown = (e: React.SyntheticEvent) => {
    _.invoke(props, 'onKeyDown', e, props);
  };

  const handleIconOverrides = iconProps => ({
    ...iconProps,
    onClick: (e: React.SyntheticEvent, iconProps: BoxProps) => {
      e.stopPropagation();
      _.invoke(props, 'onRemove', e, iconProps);
      _.invoke(props, 'onClick', e, iconProps);
    },
    onKeyDown: (e: React.KeyboardEvent, iconProps: BoxProps) => {
      e.stopPropagation();
      if (getCode(e) === keyboardKey.Enter) {
        _.invoke(props, 'onRemove', e, iconProps);
      }
      _.invoke(props, 'onKeyDown', e, iconProps);
    },
  });

  const headerElement = Box.create(header, {
    defaultProps: () => ({
      as: 'span',
      className: dropdownSelectedItemSlotClassNames.header,
      styles: resolvedStyles.header,
    }),
  });

  const iconElement = Box.create(icon, {
    defaultProps: () => ({
      'aria-label': `Remove ${header} from selection.`, // TODO: Extract this in a behaviour.
      className: dropdownSelectedItemSlotClassNames.icon,
      styles: resolvedStyles.icon,
    }),
    overrideProps: handleIconOverrides,
  });

  const imageElement = Image.create(image, {
    defaultProps: () => ({
      avatar: true,
      className: dropdownSelectedItemSlotClassNames.image,
      styles: resolvedStyles.image,
    }),
  });

  const element = (
    <Ref innerRef={itemRef}>
      <ElementType
        className={classes.root}
        tabIndex={active ? 0 : -1}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        {...unhandledProps}
      >
        {imageElement}
        {headerElement}
        {iconElement}
      </ElementType>
    </Ref>
  );

  setEnd();
  return element;
};

DropdownSelectedItem.displayName = 'DropdownSelectedItem';

DropdownSelectedItem.propTypes = {
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

DropdownSelectedItem.handledProps = Object.keys(DropdownSelectedItem.propTypes) as any;

DropdownSelectedItem.defaultProps = {
  as: 'span',
  // TODO: fix me
  icon: <CloseIcon />,
};

DropdownSelectedItem.create = createShorthandFactory({
  Component: DropdownSelectedItem,
  mappedProp: 'header',
});

/**
 * A DropdownSelectedItem represents a selected item of 'multiple-selection' Dropdown.
 */
export default withSafeTypeForAs<typeof DropdownSelectedItem, DropdownSelectedItemProps>(DropdownSelectedItem);
