import { getElementType, useUnhandledProps, useAccessibility, useStyles, useTelemetry } from '@fluentui/react-bindings';
import { Accessibility } from '@fluentui/accessibility';
import * as React from 'react';
// @ts-ignore
import { ThemeContext } from 'react-fela';

import {
  childrenExist,
  createShorthandFactory,
  ContentComponentProps,
  ChildrenComponentProps,
  commonPropTypes,
  rtlTextContainer,
  UIComponentProps,
} from '../../utils';
import { ProviderContextPrepared, WithAsProp, withSafeTypeForAs, FluentComponentStaticProps } from '../../types';

export interface BoxProps extends UIComponentProps<BoxProps>, ContentComponentProps, ChildrenComponentProps {
  /** Accessibility behavior if overridden by the user. */
  accessibility?: Accessibility<never>;
}

export type BoxStylesProps = never;

const Box: React.FC<WithAsProp<BoxProps>> & FluentComponentStaticProps<BoxProps> = props => {
  const context: ProviderContextPrepared = React.useContext(ThemeContext);
  const { setStart, setEnd } = useTelemetry(Box.displayName, context.telemetry);
  setStart();

  const { accessibility, className, design, styles, variables, children, content } = props;

  const getA11Props = useAccessibility(accessibility, {
    debugName: Box.displayName,
    rtl: context.rtl,
  });

  const { classes } = useStyles<BoxStylesProps>(Box.displayName, {
    className: Box.className,
    mapPropsToInlineStyles: () => ({
      className,
      design,
      styles,
      variables,
    }),
    rtl: context.rtl,
  });

  const unhandledProps = useUnhandledProps(Box.handledProps, props);
  const ElementType = getElementType(props);

  const result = (
    <ElementType
      {...getA11Props('root', {
        ...rtlTextContainer.getAttributes({ forElements: [children, content] }),
        className: classes.root,
        ...unhandledProps,
      })}
    >
      {childrenExist(children) ? children : content}
    </ElementType>
  );

  setEnd();

  return result;
};

Box.className = 'ui-box';
Box.displayName = 'Box';

Box.propTypes = commonPropTypes.createCommon();
Box.handledProps = Object.keys(Box.propTypes) as any;

Box.create = createShorthandFactory({ Component: Box });

/**
 * A Box is a basic component, commonly used for slots in other Fluent UI components.
 * By default it just renders a `div`.
 */
export default withSafeTypeForAs<typeof Box, BoxProps>(Box);
