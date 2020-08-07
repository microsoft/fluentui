import { Accessibility, AccessibilityAttributes, IconBehaviorProps, iconBehavior } from '@fluentui/accessibility';
import * as customPropTypes from '@fluentui/react-proptypes';
import { getElementType, getUnhandledProps, useAccessibility, useStyles, useTelemetry } from '@fluentui/react-bindings';
import { callable } from '@fluentui/styles';
import * as PropTypes from 'prop-types';
import * as React from 'react';
import * as _ from 'lodash';
// @ts-ignore
import { ThemeContext } from 'react-fela';

import {
  createShorthandFactory,
  UIComponentProps,
  commonPropTypes,
  ColorComponentProps,
  SizeValue,
  ShorthandFactory,
} from '../../utils';
import {
  FluentComponentStaticProps,
  ProviderContextPrepared,
  ShorthandValue,
  WithAsProp,
  withSafeTypeForAs,
} from '../../types';

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
  const unhandledProps = getUnhandledProps(Icon.handledProps, props);

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

/**
 * This augmented version of the create method for the Icon should help
 * with the migration path from the old to the new icons definition.
 */
const inconsistentIconNames: Record<string, string> = {
  AcceptIcon: 'icon-checkmark',
  ChevronDownMediumIcon: 'icon-menu-arrow-down',
  ChevronEndMediumIcon: 'icon-menu-arrow-end',
  CircleIcon: 'icon-circle',
  CloseIcon: 'icon-close',
  OneDriveIcon: 'onedrive',
  OneNoteColorIcon: 'onenote-color',
  OneNoteIcon: 'onenote',
  PauseIcon: 'icon-pause',
  PlayIcon: 'icon-play',
  PowerPointColorIcon: 'powerpoint-color',
  PowerPointIcon: 'powerpoint',
  TriangleDownIcon: 'icon-arrow-down',
  TriangleEndIcon: 'icon-arrow-end',
  TriangleUpIcon: 'icon-arrow-up',
};

function isFluentJSXIcon(value: ShorthandValue<IconProps>): value is React.ReactElement<IconProps, typeof Icon> {
  return (
    React.isValidElement(value) &&
    typeof value.type === 'function' &&
    (value.type as React.ComponentType).displayName?.indexOf('Icon') !== -1
  );
}

function toIconNameFromDisplayName(displayName: string) {
  return inconsistentIconNames[displayName]
    ? inconsistentIconNames[displayName]
    : _.kebabCase(displayName.replace('Icon', ''));
}

const iconOriginalShorthandFactory = createShorthandFactory({
  Component: Icon,
  mappedProp: 'name',
  allowsJSX: false,
});

const iconPatchedShorthandFactory: ShorthandFactory<IconProps> = (value, options) => {
  if (process.env.NODE_ENV === 'development') {
    if (typeof value === 'string') {
      console.warn(
        `Fluent UI: Deprecation notice, please use JSX icon as a value instead of a string, for example replace <Button icon="bell" /> with <Button icon={<BellIcon />} />.`,
      );
    }

    if (_.isPlainObject(value)) {
      if ((value as IconProps).name) {
        console.warn(
          `Fluent UI: Deprecation notice, please use JSX icon as a value instead of an object, for example replace <Button icon={{ name: 'bell', outline: true }} /> with <Button icon={<BellIcon outline />} />.`,
        );
      }
    }
  }

  if (isFluentJSXIcon(value)) {
    const iconName = toIconNameFromDisplayName(value.type.displayName);

    return iconOriginalShorthandFactory({ ...value.props, name: iconName }, options);
  }

  return iconOriginalShorthandFactory(value, options);
};

Icon.create = iconPatchedShorthandFactory;

/**
 * An Icon displays a pictogram with semantic meaning.
 */
export default withSafeTypeForAs<typeof Icon, IconProps, 'span'>(Icon);
