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
import { Accessibility, breadcrumbItemBehavior, BreadcrumbItemBehaviorProps } from '@fluentui/accessibility';
import { useBreadcrumbContext, BreadcrumbSizeValues } from './breadcrumbContext';

export interface BreadcrumbItemProps
  extends UIComponentProps<BreadcrumbItemProps>,
    ContentComponentProps,
    ChildrenComponentProps {
  /** Accessibility behavior if overridden by the user. */
  accessibility?: Accessibility<BreadcrumbItemBehaviorProps>;

  /** The Breadcrumb Link can be disabled. */
  disabled?: boolean;

  /** Indicates if the link is the active. */
  active?: boolean;
}

export type BreadcrumbItemStylesProps = Required<Pick<BreadcrumbItemProps, 'active' | 'disabled'>> & {
  size: BreadcrumbSizeValues;
};

export const breadcrumbItemClassName = 'ui-breadcrumb__item';

/**
 * BreadcrumbItem an actionable item within a Breadcrumb
 */
export const BreadcrumbItem = compose<'div', BreadcrumbItemProps, BreadcrumbItemStylesProps, {}, {}>(
  (props, ref, composeOptions) => {
    const context = useFluentContext();

    const { accessibility, children, content, className, design, styles, variables, active, disabled } = props;
    const { size } = useBreadcrumbContext();

    const a11yBehavior = useAccessibilityBehavior(accessibility, {
      rtl: context.rtl,
    });

    const { classes } = useStyles<BreadcrumbItemStylesProps>(composeOptions.displayName, {
      className: composeOptions.className,
      composeOptions,
      mapPropsToStyles: () => ({
        size,
        active,
        disabled,
      }),
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
    className: breadcrumbItemClassName,
    displayName: 'BreadcrumbItem',
    defaultProps: {
      accessibility: breadcrumbItemBehavior,
    },
    handledProps: [
      'accessibility',
      'as',
      'children',
      'className',
      'content',
      'design',
      'styles',
      'variables',
      'active',
    ],
  },
);

BreadcrumbItem.propTypes = commonPropTypes.createCommon();
