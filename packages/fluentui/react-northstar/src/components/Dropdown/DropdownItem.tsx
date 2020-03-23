import * as customPropTypes from '@fluentui/react-proptypes';
import { indicatorBehavior } from '@fluentui/accessibility';
import * as React from 'react';
import * as PropTypes from 'prop-types';
import * as _ from 'lodash';
// @ts-ignore
import { ThemeContext } from 'react-fela';
import { getElementType, useUnhandledProps, useStyles, useTelemetry } from '@fluentui/react-bindings';
import cx from 'classnames';

import { createShorthandFactory, commonPropTypes } from '../../utils';
import {
  ShorthandValue,
  ComponentEventHandler,
  WithAsProp,
  withSafeTypeForAs,
  FluentComponentStaticProps,
  ProviderContextPrepared,
} from '../../types';
import { UIComponentProps } from '../../utils/commonPropInterfaces';
import Image, { ImageProps } from '../Image/Image';
import Box, { BoxProps } from '../Box/Box';

export interface DropdownItemSlotClassNames {
  content: string;
  header: string;
  image: string;
  checkableIndicator: string;
  main: string;
}

export interface DropdownItemProps extends UIComponentProps<DropdownItemProps> {
  /** A dropdown item can be active. */
  active?: boolean;

  /** Item's accessibility props. */
  accessibilityItemProps?: any;

  /** Item's content. */
  content?: ShorthandValue<BoxProps>;

  /** Item can show check indicator if selected. */
  checkable?: boolean;

  /** A slot for a checkable indicator. */
  checkableIndicator?: ShorthandValue<BoxProps>;

  /** Item's header. */
  header?: ShorthandValue<BoxProps>;

  /** Item's image. */
  image?: ShorthandValue<ImageProps>;

  /** Indicated whether the item has been set active by keyboard. */
  isFromKeyboard?: boolean;

  /**
   * Called on dropdown item click.
   *
   * @param event - React's original SyntheticEvent.
   * @param data - All props and proposed value.
   */
  onClick?: ComponentEventHandler<DropdownItemProps>;

  /** A dropdown item can be selected if single selection Dropdown is used. */
  selected?: boolean;
}

const DropdownItem: React.FC<WithAsProp<DropdownItemProps> & { index: number }> &
  FluentComponentStaticProps<DropdownItemProps> & {
    slotClassNames: DropdownItemSlotClassNames;
  } = props => {
  const context: ProviderContextPrepared = React.useContext(ThemeContext);
  const { setStart, setEnd } = useTelemetry(DropdownItem.displayName, context.telemetry);

  setStart();

  const {
    active,
    accessibilityItemProps,
    className,
    content,
    design,
    header,
    image,
    isFromKeyboard,
    styles,
    checkable,
    checkableIndicator,
    selected,
    variables,
  } = props;

  const { classes, styles: resolvedStyles } = useStyles(DropdownItem.displayName, {
    className: DropdownItem.className,
    mapPropsToStyles: () => ({
      active,
      isFromKeyboard,
      selected,
      hasContent: !!content,
      hasHeader: !!header,
    }),
    mapPropsToInlineStyles: () => ({ className, design, styles, variables }),
    rtl: context.rtl,
  });

  const ElementType = getElementType(props);
  const unhandledProps = useUnhandledProps(DropdownItem.handledProps, props);

  const handleClick = (e: React.MouseEvent | React.KeyboardEvent) => {
    _.invoke(props, 'onClick', e, props);
  };

  const contentElement = Box.create(content, {
    defaultProps: () => ({
      className: DropdownItem.slotClassNames.content,
      styles: resolvedStyles.content,
    }),
  });
  const headerElement = Box.create(header, {
    defaultProps: () => ({
      className: DropdownItem.slotClassNames.header,
      styles: resolvedStyles.header,
    }),
  });
  const endMediaElement =
    selected && checkable
      ? Box.create(checkableIndicator, {
          defaultProps: () => ({
            className: DropdownItem.slotClassNames.checkableIndicator,
            styles: resolvedStyles.checkableIndicator,
            accessibility: indicatorBehavior,
          }),
        })
      : null;
  const imageElement = Box.create(
    Image.create(image, {
      defaultProps: () => ({
        avatar: true,
        className: DropdownItem.slotClassNames.image,
        styles: resolvedStyles.image,
      }),
    }),
    {
      defaultProps: () => ({
        className: DropdownItem.slotClassNames.image,
        styles: resolvedStyles.media,
      }),
    },
  );

  const element = (
    <ElementType className={classes.root} onClick={handleClick} {...accessibilityItemProps} {...unhandledProps}>
      {imageElement}

      <div className={cx(DropdownItem.slotClassNames.main, classes.main)}>
        {headerElement}
        {contentElement}
      </div>

      {endMediaElement}
    </ElementType>
  );

  setEnd();

  return element;
};

DropdownItem.className = 'ui-dropdown__item';
DropdownItem.displayName = 'DropdownItem';

DropdownItem.defaultProps = {
  as: 'li',
  checkableIndicator: {},
};

DropdownItem.propTypes = {
  ...commonPropTypes.createCommon({
    accessibility: false,
    children: false,
    content: false,
  }),
  accessibilityItemProps: PropTypes.object,
  active: PropTypes.bool,
  content: customPropTypes.itemShorthand,
  checkable: PropTypes.bool,
  checkableIndicator: customPropTypes.shorthandAllowingChildren,
  header: customPropTypes.itemShorthand,
  image: customPropTypes.itemShorthandWithoutJSX,
  onClick: PropTypes.func,
  isFromKeyboard: PropTypes.bool,
  selected: PropTypes.bool,
};
DropdownItem.handledProps = Object.keys(DropdownItem.propTypes) as any;

DropdownItem.slotClassNames = {
  main: `${DropdownItem.className}__main`,
  content: `${DropdownItem.className}__content`,
  header: `${DropdownItem.className}__header`,
  image: `${DropdownItem.className}__image`,
  checkableIndicator: `${DropdownItem.className}__checkable-indicator`,
};

DropdownItem.create = createShorthandFactory({ Component: DropdownItem, mappedProp: 'header' });

/**
 * A DropdownItem represents an option of Dropdown list.
 * Displays an item with optional rich media metadata.
 */
export default withSafeTypeForAs<typeof DropdownItem, DropdownItemProps>(DropdownItem);
