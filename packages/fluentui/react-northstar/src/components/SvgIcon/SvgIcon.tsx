import { getElementType, getUnhandledProps, useStyles, useTelemetry } from '@fluentui/react-bindings';
import {
  SvgIconProps,
  svgIconClassName,
  svgIconDisplayName,
  svgIconHandledProps,
  SvgIconChildrenFn,
} from '@fluentui/react-icons-northstar';
import { callable } from '@fluentui/styles';
import * as React from 'react';
// @ts-ignore
import { ThemeContext } from 'react-fela';

import { ProviderContextPrepared, WithAsProp, withSafeTypeForAs } from '../../types';

export type SvgIconStylesProps = Required<
  Pick<SvgIconProps, 'bordered' | 'circular' | 'disabled' | 'outline' | 'rotate' | 'size' | 'xSpacing'>
>;

const SvgIcon: React.FC<WithAsProp<SvgIconProps & { children: SvgIconChildrenFn<SvgIconProps> }>> & {
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

  const { classes } = useStyles<SvgIconStylesProps>(SvgIcon.displayName, {
    className: svgIconClassName,
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
