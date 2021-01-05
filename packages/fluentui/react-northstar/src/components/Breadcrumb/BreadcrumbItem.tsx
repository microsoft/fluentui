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
    const { setStart, setEnd } = useTelemetry(composeOptions.displayName, context.telemetry);
    setStart();
    const { accessibility, children, content, className, design, styles, variables, active, disabled } = props;
    const { size } = useBreadcrumbContext();

    const getA11yProps = useAccessibility(accessibility, {
      debugName: composeOptions.displayName,
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
        {...getA11yProps('root', {
          className: classes.root,
          ref,
          ...unhandledProps,
        })}
      >
        {childrenExist(children) ? children : content}
      </ElementType>
    );

    setEnd();

    return result;
  },
  {
    className: breadcrumbItemClassName,
    displayName: 'BreadcrumbItem',
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

BreadcrumbItem.defaultProps = {
  accessibility: breadcrumbItemBehavior,
};

BreadcrumbItem.propTypes = commonPropTypes.createCommon();
