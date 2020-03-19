import * as React from 'react';
import { Extendable } from '@fluentui/styles';
// @ts-ignore
import { ThemeContext } from 'react-fela';

import { StylesContextValue } from '../styles/types';
import useStyles from '../hooks/useStyles';
import getUnhandledProps from '../utils/getUnhandledProps';
import { SvgIconCreateFnParams, SvgIconProps, withSafeTypeForSpan } from './types';

export const SvgIconClassName = 'ui-icon';
export const SvgIconDisplayName = 'SvgIcon';

export const SvgIconHandledProps: (keyof SvgIconProps)[] = [
  'alt',
  'aria-label',
  'bordered',
  'className',
  'circular',
  'children',
  'design',
  'disabled',
  'outline',
  'size',
  'rotate',
  'styles',
  'variables',
  'xSpacing',
];

const createSvgIcon = <TProps extends SvgIconProps>({
  svg,
  displayName,
  handledProps = SvgIconHandledProps,
}: SvgIconCreateFnParams) => {
  const Component: React.FC<TProps> & { handledProps: string[] } = (props: Extendable<SvgIconProps>) => {
    const context: StylesContextValue = React.useContext(ThemeContext);

    const {
      alt,
      'aria-label': ariaLabel,
      bordered,
      circular,
      className,
      design,
      disabled,
      outline,
      rotate = 0,
      size = 'medium',
      styles,
      variables,
      xSpacing,
    } = props;

    const { classes } = useStyles(SvgIconDisplayName, {
      className: SvgIconClassName,
      mapPropsToStyles: () => ({
        bordered,
        circular,
        disabled,
        outline,
        rotate,
        size,
        xSpacing,
      }),
      mapPropsToInlineStyles: () => ({ className, design, styles, variables }),
      rtl: context.rtl,
    });

    const unhandledProps = getUnhandledProps(handledProps, props);

    return (
      <span
        role="img"
        aria-hidden={alt || ariaLabel ? undefined : 'true'}
        aria-label={ariaLabel}
        className={classes.root}
        {...unhandledProps}
      >
        {svg({ classes, rtl: context.rtl, props })}
      </span>
    );
  };

  Component.displayName = displayName;
  Component.handledProps = handledProps;

  return withSafeTypeForSpan<typeof Component, TProps>(Component);
};

export default createSvgIcon;
