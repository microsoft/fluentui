import * as React from 'react';

import {
  createShorthandFactory,
  UIComponentProps,
  ChildrenComponentProps,
  ContentComponentProps,
  commonPropTypes,
  childrenExist,
} from '../../utils';

import { FluentComponentStaticProps } from '../../types';
import {
  getElementType,
  useUnhandledProps,
  useFluentContext,
  useAccessibilityBehavior,
  useAccessibilitySlotProps,
  useStyles,
  ForwardRefWithAs,
} from '@fluentui/react-bindings';
import { Accessibility } from '@fluentui/accessibility';

export interface DialogFooterProps extends UIComponentProps, ChildrenComponentProps, ContentComponentProps {
  /**
   * Accessibility behavior if overridden by the user.
   */
  accessibility?: Accessibility<never>;
}
export const dialogFooterClassName = 'ui-dialog__footer';

export type DialogFooterStylesProps = never;

/**
 * A DialogFooter represents footer content in Dialog, usually shows dialog actions.
 */
export const DialogFooter = React.forwardRef<HTMLDivElement, DialogFooterProps>((props, ref) => {
  const context = useFluentContext();

  const { children, content, className, design, styles, variables, accessibility } = props;
  const ElementType = getElementType(props);
  const unhandledProps = useUnhandledProps(DialogFooter.handledProps, props);
  const a11yBehavior = useAccessibilityBehavior<never>(accessibility, {
    rtl: context.rtl,
  });
  const { classes } = useStyles<DialogFooterStylesProps>(DialogFooter.displayName, {
    className: dialogFooterClassName,
    mapPropsToInlineStyles: () => ({
      className,
      design,
      styles,
      variables,
    }),
    rtl: context.rtl,
  });
  const element = (
    <ElementType
      {...useAccessibilitySlotProps(a11yBehavior, 'root', { className: classes.root, ref, ...unhandledProps })}
    >
      {childrenExist(children) ? children : content}
    </ElementType>
  );

  return element;
}) as unknown as ForwardRefWithAs<'div', HTMLDivElement, DialogFooterProps> &
  FluentComponentStaticProps<DialogFooterProps>;

DialogFooter.displayName = 'DialogFooter';

DialogFooter.propTypes = {
  ...commonPropTypes.createCommon(),
};

DialogFooter.handledProps = Object.keys(DialogFooter.propTypes) as any;

DialogFooter.create = createShorthandFactory({ Component: DialogFooter, mappedProp: 'content' });
