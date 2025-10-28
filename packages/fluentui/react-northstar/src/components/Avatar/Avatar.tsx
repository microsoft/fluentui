import { Accessibility } from '@fluentui/accessibility';
import {
  getElementType,
  useUnhandledProps,
  useAccessibilityBehavior,
  useAccessibilitySlotProps,
  useFluentContext,
  useStyles,
  mergeVariablesOverrides,
  ForwardRefWithAs,
} from '@fluentui/react-bindings';
import * as customPropTypes from '@fluentui/react-proptypes';
import * as PropTypes from 'prop-types';
import * as React from 'react';

import { ShorthandValue, FluentComponentStaticProps } from '../../types';
import { createShorthandFactory, UIComponentProps, commonPropTypes, SizeValue, createShorthand } from '../../utils';
import { AvatarStatusProps, AvatarStatus } from './AvatarStatus';
import { AvatarImage, AvatarImageProps } from './AvatarImage';
import { AvatarIcon, AvatarIconProps } from './AvatarIcon';
import { AvatarLabel, AvatarLabelProps } from './AvatarLabel';
import { getDefaultInitials } from './getDefaultInitials';

export interface AvatarProps extends UIComponentProps {
  /**
   * Accessibility behavior if overridden by the user.
   */
  accessibility?: Accessibility<never>;

  /** Avatar can contain icon. It will be rendered only if the image is not present. */
  icon?: ShorthandValue<AvatarIconProps>;

  /** Shorthand for the image. */
  image?: ShorthandValue<AvatarImageProps>;

  /** Shorthand for the label. */
  label?: ShorthandValue<AvatarLabelProps>;

  /** The name used for displaying the initials of the avatar if the image is not provided. */
  name?: string;

  /** The avatar can have a square shape. */
  square?: boolean;

  /** Size multiplier. */
  size?: AvatarSizeValue;

  /** Shorthand for the status of the user. */
  status?: ShorthandValue<AvatarStatusProps>;

  /** Custom method for generating the initials from the name property, which is shown if no image is provided. */
  getInitials?: (name: string) => string;
}

export type AvatarSizeValue = SizeValue | 'medium-large';
export type AvatarStylesProps = Pick<AvatarProps, 'size' | 'square'>;
export const avatarClassName = 'ui-avatar';

/**
 * An Avatar is a graphical representation of a user.
 */
export const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>((props, ref) => {
  const context = useFluentContext();

  const {
    accessibility,
    className,
    design,
    getInitials = getDefaultInitials,
    label,
    icon,
    image,
    name,
    square,
    size = 'medium',
    status,
    styles,
    variables,
  } = props;

  const a11yBehavior = useAccessibilityBehavior(accessibility, {
    rtl: context.rtl,
  });
  const { classes } = useStyles(Avatar.displayName, {
    className: avatarClassName,
    mapPropsToStyles: () => ({ size, square }),
    mapPropsToInlineStyles: () => ({
      className,
      design,
      styles,
      variables,
    }),
  });

  const ElementType = getElementType(props);
  const unhandledProps = useUnhandledProps(Avatar.handledProps, props);

  const imageElement = createShorthand(AvatarImage, image, {
    defaultProps: useAccessibilitySlotProps(a11yBehavior, 'image', {
      fluid: true,
      avatar: !square,
      title: name,
      size,
    }),
  });

  const iconElement = createShorthand(AvatarIcon, icon, {
    defaultProps: useAccessibilitySlotProps(a11yBehavior, 'icon', {
      title: name,
      size,
      square,
    }),
  });

  const labelElement = createShorthand(AvatarLabel, label || {}, {
    defaultProps: useAccessibilitySlotProps(a11yBehavior, 'label', {
      content: getInitials(name),
      circular: !square,
      title: name,
      size,
      square,
    }),
  });

  const hasGlyph = !!image || !!icon;

  const result = (
    <ElementType
      {...useAccessibilitySlotProps(a11yBehavior, 'root', { className: classes.root, ref, ...unhandledProps })}
    >
      {hasGlyph && (imageElement || iconElement)}
      {!hasGlyph && labelElement}
      {createShorthand(AvatarStatus, status as ShorthandValue<AvatarStatusProps & { as: 'span' }>, {
        defaultProps: useAccessibilitySlotProps(a11yBehavior, 'status', {
          size,
        }),
        overrideProps: (predefinedProps: AvatarStatusProps) => ({
          variables: mergeVariablesOverrides(variables, predefinedProps.variables),
        }),
      })}
    </ElementType>
  );

  return result;
}) as unknown as ForwardRefWithAs<'div', HTMLDivElement, AvatarProps> & FluentComponentStaticProps<AvatarProps>;

Avatar.displayName = 'Avatar';

Avatar.propTypes = {
  ...commonPropTypes.createCommon({
    children: false,
    content: false,
  }),
  name: PropTypes.string,
  icon: customPropTypes.shorthandAllowingChildren,
  image: customPropTypes.itemShorthandWithoutJSX,
  label: customPropTypes.itemShorthand,
  square: PropTypes.bool,
  size: customPropTypes.size,
  status: customPropTypes.itemShorthand,
  getInitials: PropTypes.func,
};

Avatar.handledProps = Object.keys(Avatar.propTypes) as any;

Avatar.create = createShorthandFactory({ Component: Avatar, mappedProp: 'name' });
