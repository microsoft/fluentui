import {
  getElementType,
  getUnhandledProps,
  useStyles,
  useTelemetry,
  SvgIconProps,
  svgIconClassName,
  svgIconDisplayName,
  svgIconHandledProps,
  SvgIconChildrenFn,
} from '@fluentui/react-bindings';
import { callable } from '@fluentui/styles';
import * as React from 'react';
// @ts-ignore
import { ThemeContext } from 'react-fela';

import { ProviderContextPrepared, WithAsProp, withSafeTypeForAs } from '../../types';

const SvgIcon: React.FC<WithAsProp<SvgIconProps & { children: SvgIconChildrenFn<SvgIconProps> }>> & {
  className: string;
  handledProps: (keyof (SvgIconProps & { children: SvgIconChildrenFn<SvgIconProps> }))[];
} = props => {
  const context: ProviderContextPrepared = React.useContext(ThemeContext);

  const { setStart, setEnd } = useTelemetry(SvgIcon.displayName, context.telemetry);
  setStart();

  const {
    alt,
    'aria-label': ariaLabel,
    bordered,
    circular,
    className,
    design,
    disabled,
    children,
    outline,
    rotate,
    size,
    styles,
    variables,
    xSpacing,
  } = props;

  const { classes } = useStyles(SvgIcon.displayName, {
    className: SvgIcon.className,
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

  const ElementType = getElementType(props);
  const unhandledProps = getUnhandledProps(SvgIcon.handledProps, props);

  const element = (
    <ElementType
      role="img"
      aria-hidden={alt || ariaLabel ? undefined : 'true'}
      aria-label={ariaLabel}
      className={classes.root}
      {...unhandledProps}
    >
      {callable(children)({ classes, rtl: context.rtl, props })}
    </ElementType>
  );
  setEnd();

  return element;
};

SvgIcon.className = svgIconClassName;
SvgIcon.displayName = svgIconDisplayName;
SvgIcon.handledProps = [...svgIconHandledProps, 'children'];
SvgIcon.defaultProps = {
  as: 'span',
  size: 'medium',
  rotate: 0,
};

/**
 * An SvgIcon displays a pictogram with semantic meaning.
 */
export default withSafeTypeForAs<typeof SvgIcon, SvgIconProps, 'span'>(SvgIcon);
