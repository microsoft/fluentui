import * as React from 'react';
import {
  compose,
  useFluentContext,
  useAccessibilityBehavior,
  useAccessibilitySlotProps,
  useStyles,
  useUnhandledProps,
  getElementType,
  childrenExist,
} from '@fluentui/react-bindings';
import { commonPropTypes, UIComponentProps, ContentComponentProps, ChildrenComponentProps } from '../../utils';
import { Accessibility, breadcrumbDividerBehavior, BreadcrumbDividerBehaviorProps } from '@fluentui/accessibility';

export interface BreadcrumbDividerProps
  extends UIComponentProps<BreadcrumbDividerProps>,
    ContentComponentProps,
    ChildrenComponentProps {
  /** Accessibility behavior if overridden by the user. */
  accessibility?: Accessibility<BreadcrumbDividerBehaviorProps>;
}

export type BreadcrumbDividerStylesProps = never;

export const breadcrumbDividerClassName = 'ui-breadcrumb__divider';

/**
 * BreadcrumbDivider divides BreadcrumbItem components within Breadcrumb
 */
export const BreadcrumbDivider = compose<'span', BreadcrumbDividerProps, BreadcrumbDividerStylesProps, {}, {}>(
  (props, ref, composeOptions) => {
    const context = useFluentContext();

    const { accessibility, children, content, className, design, styles, variables } = props;

    const a11yBehavior = useAccessibilityBehavior(accessibility, {
      rtl: context.rtl,
    });

    const { classes } = useStyles<BreadcrumbDividerStylesProps>(composeOptions.displayName, {
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

    const result = (
      <ElementType
        {...useAccessibilitySlotProps(a11yBehavior, 'root', {
          className: classes.root,
          ref,
          ...unhandledProps,
        })}
      >
        {childrenExist(children) ? children : content}
      </ElementType>
    );

    return result;
  },
  {
    className: breadcrumbDividerClassName,
    displayName: 'BreadcrumbDivider',
    defaultProps: {
      as: 'span',
      children: '/',
      accessibility: breadcrumbDividerBehavior,
    },
    handledProps: ['accessibility', 'as', 'children', 'className', 'content', 'design', 'styles', 'variables'],
  },
);

BreadcrumbDivider.propTypes = commonPropTypes.createCommon();
