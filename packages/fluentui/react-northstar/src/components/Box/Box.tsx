import {
  compose,
  ComponentWithAs,
  getElementType,
  useUnhandledProps,
  useAccessibility,
  useStyles,
  useTelemetry,
  useFluentContext,
} from '@fluentui/react-bindings';
import { Accessibility } from '@fluentui/accessibility';
import * as React from 'react';

import {
  childrenExist,
  createShorthandFactory,
  ContentComponentProps,
  ChildrenComponentProps,
  commonPropTypes,
  rtlTextContainer,
  UIComponentProps,
  ShorthandFactory,
} from '../../utils';

export interface BoxProps extends UIComponentProps<BoxProps>, ContentComponentProps, ChildrenComponentProps {
  /** Accessibility behavior if overridden by the user. */
  accessibility?: Accessibility<never>;
}
export type BoxStylesProps = {};

export const boxClassName = 'ui-box';

/**
 * A Box is a basic component, commonly used for slots in other Fluent UI components.
 * By default it just renders a `div`.
 */
export const Box = compose<'div', BoxProps, BoxStylesProps, {}, {}>(
  (props, ref, composeOptions) => {
    const context = useFluentContext();
    const { setStart, setEnd } = useTelemetry(composeOptions.displayName, context.telemetry);
    setStart();

    const { accessibility, className, design, styles, variables, children, content } = props;

    const getA11yProps = useAccessibility(accessibility, {
      debugName: composeOptions.displayName,
      rtl: context.rtl,
    });
    const { classes } = useStyles<BoxStylesProps>(composeOptions.displayName, {
      className: composeOptions.className,
      composeOptions,
      mapPropsToInlineStyles: () => ({
        className,
        design,
        styles,
        variables,
      }),
      rtl: context.rtl,
      unstable_props: props,
    });

    const unhandledProps = useUnhandledProps(composeOptions.handledProps, props);
    const ElementType = getElementType(props);

    const result = getA11yProps.unstable_wrapWithFocusZone(
      <ElementType
        {...getA11yProps('root', {
          ...rtlTextContainer.getAttributes({ forElements: [children, content] }),
          className: classes.root,
          ref,
          ...unhandledProps,
        })}
      >
        {childrenExist(children) ? children : content}
      </ElementType>,
    );

    setEnd();

    return result;
  },
  {
    className: boxClassName,
    displayName: 'Box',
    handledProps: ['accessibility', 'as', 'className', 'children', 'content', 'design', 'styles', 'variables'],
  },
) as ComponentWithAs<'div', BoxProps> & { create: ShorthandFactory<BoxProps> };

Box.propTypes = commonPropTypes.createCommon();
Box.create = createShorthandFactory({ Component: Box });
