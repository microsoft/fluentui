import {
  ComponentWithAs,
  getElementType,
  getUnhandledProps,
  useStyles,
  useFluentContext,
  useTelemetry,
} from '@fluentui/react-bindings';
import {
  SvgIconProps,
  svgIconClassName,
  svgIconDisplayName,
  svgIconHandledProps,
  SvgIconChildrenFn,
} from '@fluentui/react-icons-northstar';
import { callable } from '@fluentui/styles';
import * as React from 'react';

export type SvgIconStylesProps = Required<
  Pick<SvgIconProps, 'bordered' | 'circular' | 'disabled' | 'outline' | 'rotate' | 'size' | 'xSpacing'>
>;

/**
 * An SvgIcon displays a pictogram with semantic meaning.
 */
export const SvgIcon: ComponentWithAs<'span', SvgIconProps & { children: SvgIconChildrenFn<SvgIconProps> }> & {
  handledProps: (keyof (SvgIconProps & { children: SvgIconChildrenFn<SvgIconProps> }))[];
} = props => {
  const context = useFluentContext();

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
