import { Accessibility } from '@fluentui/accessibility';
import {
  ComponentWithAs,
  getElementType,
  useUnhandledProps,
  useAccessibility,
  useFluentContext,
  useStyles,
  useTelemetry,
} from '@fluentui/react-bindings';
import * as customPropTypes from '@fluentui/react-proptypes';
import * as _ from 'lodash';
import * as PropTypes from 'prop-types';
import * as React from 'react';

import {
  childrenExist,
  createShorthandFactory,
  UIComponentProps,
  ChildrenComponentProps,
  ContentComponentProps,
  commonPropTypes,
  ColorComponentProps,
  rtlTextContainer,
} from '../../utils';

import { Image, ImageProps } from '../Image/Image';
import { Box, BoxProps } from '../Box/Box';

import { ShorthandValue, FluentComponentStaticProps } from '../../types';
import { labelClassName } from '../Label/Label';

export interface AvatarLabelProps
  extends UIComponentProps,
    ChildrenComponentProps,
    ContentComponentProps<ShorthandValue<BoxProps>>,
    ColorComponentProps {
  /**
   * Accessibility behavior if overridden by the user.
   */
  accessibility?: Accessibility<never>;

  /** A AvatarLabel can be circular. */
  circular?: boolean;

  /** A AvatarLabel can take up the width of its container. */
  fluid?: boolean;

  /** A AvatarLabel can have an icon. */
  icon?: ShorthandValue<BoxProps>;

  /** A AvatarLabel can position its Icon at the start or end of the layout. */
  iconPosition?: 'start' | 'end';

  /** A AvatarLabel can contain an image. */
  image?: ShorthandValue<ImageProps>;

  /** A AvatarLabel can position its image at the start or end of the layout. */
  imagePosition?: 'start' | 'end';
}

export type AvatarLabelStylesProps = Pick<AvatarLabelProps, 'circular' | 'color' | 'imagePosition' | 'iconPosition'> & {
  hasImage: boolean;
  hasIcon: boolean;
  hasActionableIcon: boolean;
};
export const avatarlabelClassName = labelClassName;

/**
 * A AvatarLabel allows user to classify content.
 */
export const AvatarLabel: ComponentWithAs<'span', AvatarLabelProps> & FluentComponentStaticProps = props => {
  const context = useFluentContext();
  const { setStart, setEnd } = useTelemetry(AvatarLabel.displayName, context.telemetry);
  setStart();

  const {
    accessibility,
    children,
    className,
    circular,
    color,
    content,
    icon,
    iconPosition,
    design,
    styles,
    variables,
    image,
    imagePosition,
  } = props;

  const getA11Props = useAccessibility(accessibility, {
    debugName: AvatarLabel.displayName,
    rtl: context.rtl,
  });
  const { classes, styles: resolvedStyles } = useStyles<AvatarLabelStylesProps>(AvatarLabel.displayName, {
    className: avatarlabelClassName,
    mapPropsToStyles: () => ({
      hasActionableIcon: _.has(icon, 'onClick'),
      hasImage: !!image,
      hasIcon: !!icon,
      circular,
      color,
      imagePosition,
      iconPosition,
    }),
    mapPropsToInlineStyles: () => ({ className, design, styles, variables }),
    rtl: context.rtl,
  });

  const ElementType = getElementType(props);
  const unhandledProps = useUnhandledProps(AvatarLabel.handledProps, props);

  if (childrenExist(children)) {
    const element = (
      <ElementType
        {...getA11Props('root', {
          className: classes.root,
          ...rtlTextContainer.getAttributes({ forElements: [children] }),
          ...unhandledProps,
        })}
      >
        {children}
      </ElementType>
    );
    setEnd();

    return element;
  }

  const imageElement = Image.create(image, {
    defaultProps: () => ({
      styles: resolvedStyles.image,
    }),
  });
  const iconElement = Box.create(icon, {
    defaultProps: () => ({
      styles: resolvedStyles.icon,
    }),
  });
  const contentElement = Box.create(content, {
    defaultProps: () => ({
      styles: resolvedStyles.content,
    }),
  });

  const startImage = imagePosition === 'start' && imageElement;
  const startIcon = iconPosition === 'start' && iconElement;
  const endIcon = iconPosition === 'end' && iconElement;
  const endImage = imagePosition === 'end' && imageElement;

  const element = (
    <ElementType
      {...getA11Props('root', {
        className: classes.root,
        ...unhandledProps,
      })}
    >
      {startImage}
      {startIcon}
      {contentElement}
      {endIcon}
      {endImage}
    </ElementType>
  );
  setEnd();

  return element;
};

AvatarLabel.displayName = 'AvatarLabel';

AvatarLabel.propTypes = {
  ...commonPropTypes.createCommon({ color: true, content: 'shorthand' }),
  circular: PropTypes.bool,
  icon: customPropTypes.shorthandAllowingChildren,
  iconPosition: PropTypes.oneOf(['start', 'end']),
  image: customPropTypes.itemShorthandWithoutJSX,
  imagePosition: PropTypes.oneOf(['start', 'end']),
  fluid: PropTypes.bool,
};
AvatarLabel.handledProps = Object.keys(AvatarLabel.propTypes) as any;

AvatarLabel.defaultProps = {
  as: 'span',
  imagePosition: 'start',
  iconPosition: 'end',
};

AvatarLabel.create = createShorthandFactory({ Component: AvatarLabel, mappedProp: 'content' });
