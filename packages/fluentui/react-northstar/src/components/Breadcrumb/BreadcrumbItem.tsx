import * as React from 'react';
import {
  compose,
  useFluentContext,
  useTelemetry,
  useAccessibility,
  useStyles,
  useUnhandledProps,
  getElementType,
  childrenExist,
} from '@fluentui/react-bindings';
import { commonPropTypes, UIComponentProps, ContentComponentProps, ChildrenComponentProps } from '../../utils';
import { Accessibility, breadcrumbItemBehavior } from '@fluentui/accessibility';

export interface BreadcrumbItemProps
  extends UIComponentProps<BreadcrumbItemProps>,
    ContentComponentProps,
    ChildrenComponentProps {
  /** Accessibility behavior if overridden by the user. */
  accessibility?: Accessibility<never>;
}

export type BreadcrumbItemStylesProps = never;

export const breadcrumbItemClassName = 'ui-breadcrumb__item';

/**
 * BreadcrumbItem an actionable item within a Breadcrumb
 * This component is currently UNSTABLE!
 */
export const BreadcrumbItem = compose<'div', BreadcrumbItemProps, BreadcrumbItemStylesProps, {}, {}>(
  (props, ref, composeOptions) => {
    const context = useFluentContext();
    const { setStart, setEnd } = useTelemetry(composeOptions.displayName, context.telemetry);
    setStart();
    const { accessibility, children, content, className, design, styles, variables } = props;

    const getA11yProps = useAccessibility(accessibility, {
      debugName: composeOptions.displayName,
      rtl: context.rtl,
    });

    const { classes } = useStyles<BreadcrumbItemStylesProps>(composeOptions.displayName, {
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
    className: breadcrumbItemClassName,
    displayName: 'BreadcrumbItem',
    overrideStyles: true,
    handledProps: ['accessibility', 'as', 'children', 'className', 'content', 'design', 'styles', 'variables'],
  },
);

BreadcrumbItem.defaultProps = {
  accessibility: breadcrumbItemBehavior,
};

BreadcrumbItem.propTypes = commonPropTypes.createCommon();
