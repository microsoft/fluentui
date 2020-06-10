import * as React from 'react';
// @ts-ignore
import { ThemeContext } from 'react-fela';
import {
  createShorthandFactory,
  UIComponentProps,
  ChildrenComponentProps,
  ContentComponentProps,
  commonPropTypes,
  childrenExist,
} from '../../utils';

import { WithAsProp, withSafeTypeForAs, FluentComponentStaticProps, ProviderContextPrepared } from '../../types';
import { useTelemetry, getElementType, useUnhandledProps, useAccessibility, useStyles } from '@fluentui/react-bindings';
import { Accessibility } from '@fluentui/accessibility';

export interface DialogFooterProps extends UIComponentProps, ChildrenComponentProps, ContentComponentProps {
  /**
   * Accessibility behavior if overridden by the user.
   */
  accessibility?: Accessibility<never>;
}
export const dialogFooterClassName = 'ui-dialog__footer';

export type DialogFooterStylesProps = never;

const DialogFooter: React.FC<WithAsProp<DialogFooterProps>> & FluentComponentStaticProps<DialogFooterProps> = props => {
  const context: ProviderContextPrepared = React.useContext(ThemeContext);
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
    <ElementType {...getA11yProps('root', { className: classes.root, ...unhandledProps })}>
      {childrenExist(children) ? children : content}
    </ElementType>
  );
  setEnd();
  return element;
};

DialogFooter.displayName = 'DialogFooter';

DialogFooter.propTypes = {
  ...commonPropTypes.createCommon(),
};

DialogFooter.handledProps = Object.keys(DialogFooter.propTypes) as any;

DialogFooter.create = createShorthandFactory({ Component: DialogFooter, mappedProp: 'content' });

/**
 * A DialogFooter represents footer content in Dialog, usually shows dialog actions.
 */
export default withSafeTypeForAs<typeof DialogFooter, DialogFooterProps>(DialogFooter);
