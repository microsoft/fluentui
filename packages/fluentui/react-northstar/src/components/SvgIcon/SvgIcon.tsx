import {
  ComponentWithAs,
  getElementType,
  getUnhandledProps,
  useStyles,
  useFluentContext,
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
    rotate = 0,
    size = 'medium',
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

  const ElementType = getElementType(props, 'span');
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

  return element;
};

SvgIcon.displayName = svgIconDisplayName;
SvgIcon.handledProps = [...svgIconHandledProps, 'children'];
