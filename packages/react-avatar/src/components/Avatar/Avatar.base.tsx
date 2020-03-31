import * as React from 'react';
import { Accessibility } from '@fluentui/accessibility';
import { getElementType, useUnhandledProps, useAccessibility, useStyles, useTelemetry } from '@fluentui/react-bindings';
import * as customPropTypes from '@fluentui/react-proptypes';
import * as PropTypes from 'prop-types';
import cx from 'classnames';
// @ts-ignore
import { ThemeContext } from 'react-fela';

import {
  FluentComponentStaticProps,
  Image,
  ImageProps,
  Label,
  LabelProps,
  ProviderContextPrepared,
  ShorthandValue,
  SizeValue,
  UIComponentProps,
  WithAsProp,
  commonPropTypes,
  createShorthandFactory,
  withSafeTypeForAs,
} from '@fluentui/react-northstar';

import { Status, StatusProps } from '../Status/Status';

export interface AvatarProps extends UIComponentProps {
  /**
   * Accessibility behavior if overridden by the user.
   */
  accessibility?: Accessibility<never>;

  /** Shorthand for the image. */
  image?: ShorthandValue<ImageProps>;

  /** Shorthand for the label. */
  label?: ShorthandValue<LabelProps>;

  /** The name used for displaying the initials of the avatar if the image is not provided. */
  name?: string;

  /** The avatar can have a square shape. */
  square?: boolean;

  /** Size multiplier. */
  size?: SizeValue;

  /** Shorthand for the status of the user. */
  status?: ShorthandValue<StatusProps>;

  /** Custom method for generating the initials from the name property, which is shown if no image is provided. */
  getInitials?: (name: string) => string;

  classes?: { [key: string]: string };
}

export type AvatarStylesProps = Pick<AvatarProps, 'size' | 'square'>;

export const AvatarBase: React.FC<WithAsProp<AvatarProps>> & FluentComponentStaticProps<AvatarProps> = props => {
  const context: ProviderContextPrepared = React.useContext(ThemeContext);
  const { setStart, setEnd } = useTelemetry(AvatarBase.displayName, context.telemetry);
  setStart();

  const {
    accessibility,
    className,
    classes,
    design,
    getInitials,
    label,
    image,
    name,
    square,
    size,
    status,
    // styles,
    variables,
  } = props;

  const getA11Props = useAccessibility(accessibility, {
    debugName: AvatarBase.displayName,
    rtl: context.rtl,
  });

  const { classes: finalClasses, styles: resolvedStyles } = useStyles(AvatarBase.displayName, {
    className: AvatarBase.className,
    mapPropsToStyles: () => ({ size, square }),
    mapPropsToInlineStyles: () => ({
      className,
      classes,
      design,
      // styles,
      variables,
    }),
  });

  const ElementType = getElementType(props);
  const unhandledProps = useUnhandledProps(AvatarBase.handledProps, props);

  const result = (
    <ElementType
      {...getA11Props('root', {
        className: cx(
          className,
          classes.root,
          size === 'smallest' && classes.sizeSmallest,
          size === 'smaller' && classes.sizeSmaller,
          size === 'small' && classes.sizeSmall,
          size === 'large' && classes.sizeLarge,
          size === 'larger' && classes.sizeLarger,
          size === 'largest' && classes.sizeLargest,
          square && classes.square,
        ),
        ...unhandledProps,
      })}
    >
      {Image.create(image, {
        defaultProps: () =>
          getA11Props('image', {
            className: classes.image,
            fluid: true,
            avatar: !square,
            title: name,
            // styles: resolvedStyles.image,
          }),
      })}
      {!image &&
        Label.create(label || {}, {
          defaultProps: () =>
            getA11Props('label', {
              className: classes.label,
              content: getInitials && getInitials(name!),
              circular: !square,
              title: name,
              styles: resolvedStyles.label,
            }),
        })}
      {Status.create(status, {
        defaultProps: () =>
          getA11Props('status', {
            className: classes.status,
            size,
            // styles: resolvedStyles.status,
          }),
      })}
    </ElementType>
  );

  setEnd();

  return result;
};

AvatarBase.className = 'ui-avatar';
AvatarBase.displayName = 'Avatar';

AvatarBase.defaultProps = {
  size: 'medium',
  getInitials(name: string) {
    if (!name) {
      return '';
    }

    const reducedName = name
      .replace(/\s*\(.*?\)\s*/g, ' ')
      .replace(/\s*{.*?}\s*/g, ' ')
      .replace(/\s*\[.*?]\s*/g, ' ');

    const initials = reducedName
      .split(' ')
      .filter(item => item !== '')
      .map(item => item.charAt(0))
      .reduce((accumulator, currentValue) => accumulator + currentValue);

    if (initials.length > 2) {
      return initials.charAt(0) + initials.charAt(initials.length - 1);
    }
    return initials;
  },
};

AvatarBase.propTypes = {
  ...commonPropTypes.createCommon({
    children: false,
    content: false,
  }),
  name: PropTypes.string,
  image: customPropTypes.itemShorthandWithoutJSX,
  label: customPropTypes.itemShorthand,
  square: PropTypes.bool,
  size: customPropTypes.size,
  status: customPropTypes.itemShorthand,
  getInitials: PropTypes.func,
  classes: PropTypes.object,
};

AvatarBase.handledProps = Object.keys(AvatarBase.propTypes) as any;

AvatarBase.create = createShorthandFactory({ Component: AvatarBase, mappedProp: 'name' });

/**
 * An Avatar is a graphical representation of a user.
 */
//export default withSafeTypeForAs<typeof AvatarBase, AvatarProps>(AvatarBase);
