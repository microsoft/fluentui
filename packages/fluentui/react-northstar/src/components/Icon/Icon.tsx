import { Accessibility, AccessibilityAttributes, IconBehaviorProps, iconBehavior } from '@fluentui/accessibility';
import * as customPropTypes from '@fluentui/react-proptypes';
import { getElementType, useUnhandledProps, useAccessibility, useStyles, useTelemetry } from '@fluentui/react-bindings';
import { callable } from '@fluentui/styles';
import * as PropTypes from 'prop-types';
import * as React from 'react';
// @ts-ignore
import { ThemeContext } from 'react-fela';

import { createShorthandFactory, UIComponentProps, commonPropTypes, ColorComponentProps, SizeValue } from '../../utils';
import { FluentComponentStaticProps, ProviderContextPrepared, WithAsProp, withSafeTypeForAs } from '../../types';

export type IconXSpacing = 'none' | 'before' | 'after' | 'both';

export interface IconProps extends UIComponentProps, ColorComponentProps {
  /** Alternative text. */
  alt?: string;
  'aria-label'?: AccessibilityAttributes['aria-label'];

  /** Accessibility behavior if overridden by the user. */
  accessibility?: Accessibility<IconBehaviorProps>;

  /** Icon can appear with rectangular border. */
  bordered?: boolean;

  /** Icon can appear as circular. */
  circular?: boolean;

  /** An icon can show it is currently unable to be interacted with. */
  disabled?: boolean;

  /** Name of the icon. */
  name: string;

  /** An icon can provide an outline variant. */
  outline?: boolean;

  /** An icon can be rotated by the degree specified as number. */
  rotate?: number;

  /** Size of the icon. */
  size?: SizeValue;

  /** Adds space to the before, after or on both sides of the icon, or removes the default space around the icon ('none' value) */
  xSpacing?: IconXSpacing;
}

export type IconStylesProps = Pick<
  IconProps,
  'bordered' | 'circular' | 'color' | 'disabled' | 'outline' | 'rotate' | 'size' | 'xSpacing'
> & { isFontIcon: boolean; isSvgIcon: boolean; name?: IconProps['name'] };

const Icon: React.FC<WithAsProp<IconProps>> & FluentComponentStaticProps = props => {
  const context: ProviderContextPrepared = React.useContext(ThemeContext);

  const { setStart, setEnd } = useTelemetry(Icon.displayName, context.telemetry);
  setStart();

  const {
    accessibility,
    alt,
    'aria-label': ariaLabel,
    bordered,
    circular,
    className,
    color,
    disabled,
    design,
    name,
    outline,
    rotate,
    size,
    styles,
    variables,
    xSpacing,
  } = props;

  const { icons = {} } = context.theme;
  const maybeIcon = icons[name];
  const isSvgIcon = maybeIcon && maybeIcon.isSvg;

  const getA11Props = useAccessibility(accessibility, {
    debugName: Icon.displayName,
    mapPropsToBehavior: () => ({
      alt,
      'aria-label': ariaLabel,
    }),
    rtl: context.rtl,
  });
  const { classes } = useStyles<IconStylesProps>(Icon.displayName, {
    className: Icon.className,
    mapPropsToStyles: () => ({
      bordered,
      circular,
      color,
      disabled,
      // name is required only for font icons
      // one can compose the Icon component with FontIcon to handle this if necessary
      name: isSvgIcon ? undefined : name,
      outline,
      rotate,
      size,
      xSpacing,
      isFontIcon: !isSvgIcon,
      isSvgIcon,
    }),
    mapPropsToInlineStyles: () => ({ className, design, styles, variables }),
    rtl: context.rtl,
  });

  const ElementType = getElementType(props);
  const unhandledProps = useUnhandledProps(Icon.handledProps, props);

  const element = (
    <ElementType {...getA11Props('root', { className: classes.root, ...unhandledProps })}>
      {isSvgIcon && callable(maybeIcon.icon)({ classes, rtl: context.rtl, props })}
    </ElementType>
  );
  setEnd();

  return element;
};

Icon.className = 'ui-icon';
Icon.displayName = 'Icon';
Icon.defaultProps = {
  as: 'span',
  accessibility: iconBehavior,
  size: 'medium',
  rotate: 0,
};

Icon.propTypes = {
  ...commonPropTypes.createCommon({
    children: false,
    content: false,
    color: true,
  }),
  bordered: PropTypes.bool,
  circular: PropTypes.bool,
  disabled: PropTypes.bool,
  name: PropTypes.string.isRequired,
  outline: PropTypes.bool,
  rotate: PropTypes.number,
  size: customPropTypes.size,
  xSpacing: PropTypes.oneOf(['none', 'before', 'after', 'both']),
};
Icon.handledProps = Object.keys(Icon.propTypes) as any;

Icon.create = createShorthandFactory({ Component: Icon, mappedProp: 'name', allowsJSX: false });

/**
 * An Icon displays a pictogram with semantic meaning.
 */
export default withSafeTypeForAs<typeof Icon, IconProps, 'span'>(Icon);
