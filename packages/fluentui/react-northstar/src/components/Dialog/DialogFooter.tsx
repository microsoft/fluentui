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
  useTelemetry,
  getElementType,
  useUnhandledProps,
  useFluentContext,
  useAccessibility,
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
  const { setStart, setEnd } = useTelemetry(DialogFooter.displayName, context.telemetry);
  setStart();
  const { children, content, className, design, styles, variables, accessibility } = props;
  const ElementType = getElementType(props);
  const unhandledProps = useUnhandledProps(DialogFooter.handledProps, props);
  const getA11yProps = useAccessibility<never>(accessibility, {
    debugName: DialogFooter.displayName,
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
    <ElementType {...getA11yProps('root', { className: classes.root, ref, ...unhandledProps })}>
      {childrenExist(children) ? children : content}
    </ElementType>
  );
  setEnd();
  return element;
}) as unknown as ForwardRefWithAs<'div', HTMLDivElement, DialogFooterProps> &
  FluentComponentStaticProps<DialogFooterProps>;

DialogFooter.displayName = 'DialogFooter';

DialogFooter.propTypes = {
  ...commonPropTypes.createCommon(),
};

DialogFooter.handledProps = Object.keys(DialogFooter.propTypes) as any;

DialogFooter.create = createShorthandFactory({ Component: DialogFooter, mappedProp: 'content' });
