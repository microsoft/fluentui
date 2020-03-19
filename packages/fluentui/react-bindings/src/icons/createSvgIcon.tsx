import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Extendable } from '@fluentui/styles';
import * as customPropTypes from '@fluentui/react-proptypes';
// @ts-ignore
import { ThemeContext } from 'react-fela';

import { StylesContextValue } from '../styles/types';
import useStyles from '../hooks/useStyles';
import getUnhandledProps from '../utils/getUnhandledProps';
import { SvgIconCreateFnParams, SvgIconProps, SvgIconSizeValue, SvgIconXSpacing } from './types';

export const SvgIconClassName = 'ui-icon';
export const SvgIconDisplayName = 'SvgIcon';

// keep in sync with SvgIconProps
export const SvgIconPropTypes = {
  as: PropTypes.elementType,
  className: PropTypes.string,
  styles: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  variables: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  design: customPropTypes.design,

  children: PropTypes.func,
  bordered: PropTypes.bool,
  circular: PropTypes.bool,
  disabled: PropTypes.bool,
  outline: PropTypes.bool,
  rotate: PropTypes.number,
  size: PropTypes.oneOf<SvgIconSizeValue>(['smallest', 'smaller', 'small', 'medium', 'large', 'larger', 'largest']),
  xSpacing: PropTypes.oneOf<SvgIconXSpacing>(['none', 'before', 'after', 'both'])
};

export const SvgIconHandledProps = Object.keys(SvgIconPropTypes) as any;

const createSvgIcon = <TProps extends SvgIconProps>({ svg, displayName, handledProps = SvgIconHandledProps }: SvgIconCreateFnParams) => {
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
      xSpacing
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
        xSpacing
      }),
      mapPropsToInlineStyles: () => ({ className, design, styles, variables }),
      rtl: context.rtl
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

  return Component;
};

export default createSvgIcon;
