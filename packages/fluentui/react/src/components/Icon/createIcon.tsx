import { getUnhandledProps, useStyles } from '@fluentui/react-bindings';
import { Extendable } from '@fluentui/styles';
import * as React from 'react';
// @ts-ignore
import { ThemeContext } from 'react-fela';

import { ProviderContextPrepared } from '../../types';
import { default as SvgIcon, SvgIconProps, SvgIconCreateFnParams } from './SvgIcon';

const createIcon = <TProps extends SvgIconProps>({ svg, displayName, handledProps }: SvgIconCreateFnParams) => {
  const Component: React.FC<TProps> & { handledProps: string[] } = (props: Extendable<SvgIconProps>) => {
    const context: ProviderContextPrepared = React.useContext(ThemeContext);

    const { alt, 'aria-label': ariaLabel, bordered, circular, className, disabled, outline, rotate = 0, size = 'medium', xSpacing } = props;

    const { classes } = useStyles(SvgIcon.displayName, {
      className: SvgIcon.className,
      mapPropsToStyles: () => ({
        bordered,
        circular,
        disabled,
        outline,
        rotate,
        size,
        xSpacing
      }),
      mapPropsToInlineStyles: () => ({ className }),
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

export default createIcon;
