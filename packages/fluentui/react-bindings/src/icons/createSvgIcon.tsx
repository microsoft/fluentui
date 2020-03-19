import * as React from 'react';
// @ts-ignore
import { ThemeContext } from 'react-fela';

import { StylesContextValue } from '../styles/types';
import useStyles from '../hooks/useStyles';
import getUnhandledProps from '../utils/getUnhandledProps';
import { SvgIconCreateFnParams, SvgIconProps } from './types';

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

type ValueOf<TFirst, TSecond, TKey extends keyof (TFirst & TSecond)> = TKey extends keyof TFirst
  ? TFirst[TKey]
  : TKey extends keyof TSecond
  ? TSecond[TKey]
  : {};

type Extended<TFirst, TSecond> = { [K in keyof (TFirst & TSecond)]: ValueOf<TFirst, TSecond, K> };

const createSvgIcon = <TProps extends SvgIconProps>({
  svg,
  displayName,
  handledProps = SvgIconHandledProps,
}: SvgIconCreateFnParams) => {
  function Component(props: Extended<TProps, JSX.IntrinsicElements['span']>): JSX.Element {
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
  }

  Component.displayName = displayName;
  Component.handledProps = handledProps;

  return Component;
};

export default createSvgIcon;
