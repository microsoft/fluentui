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
  ShorthandConfig,
  ComponentWithAs,
} from '@fluentui/react-bindings';
import {
  commonPropTypes,
  UIComponentProps,
  ContentComponentProps,
  ChildrenComponentProps,
  ShorthandFactory,
  createShorthandFactory,
} from '../../utils';
import { Accessibility, breadcrumbBehavior, BreadcrumbBehaviorProps } from '@fluentui/accessibility';
import { BreadcrumbItem } from './BreadcrumbItem';
import { BreadcrumbDivider } from './BreadcrumbDivider';

export interface BreadcrumbProps
  extends UIComponentProps<BreadcrumbProps>,
    ContentComponentProps,
    ChildrenComponentProps {
  /** Accessibility behavior if overridden by the user. */
  accessibility?: Accessibility<BreadcrumbBehaviorProps>;
}

export type BreadcrumbStylesProps = never;

export const breadcrumbClassName = 'ui-breadcrumb';

/**
 * Breadcrumb is a a component that indicates the path of the current page
 * This component is currently UNSTABLE!
 *
 * @accessibility
 * Implements [ARIA Breadcrumb](https://www.w3.org/TR/wai-aria-practices-1.1/#breadcrumb) design pattern.
 * Refers to [this ARIA discussion](https://github.com/w3c/aria-practices/issues/635), and uses arrow key to navigate between each breadcrumb item.
 *
 * @accessibilityIssues
 * [Under NVDA Browse mode - Breadcrumb is not navigable](https://github.com/w3c/aria-practices/issues/635 )
 */
export const Breadcrumb = compose<'nav', BreadcrumbProps, BreadcrumbStylesProps, {}, {}>(
  (props, ref, composeOptions) => {
    const context = useFluentContext();
    const { setStart, setEnd } = useTelemetry(composeOptions.displayName, context.telemetry);
    setStart();
    const { accessibility, children, content, className, design, styles, variables } = props;

    const getA11yProps = useAccessibility(accessibility, {
      debugName: composeOptions.displayName,
      rtl: context.rtl,
    });

    const { classes } = useStyles<BreadcrumbStylesProps>(composeOptions.displayName, {
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
        {...getA11yProps('root', {
          className: classes.root,
          ref,
          ...unhandledProps,
        })}
      >
        <div role="list">{childrenExist(children) ? children : content}</div>
      </ElementType>
    );

    setEnd();

    return result;
  },
  {
    className: breadcrumbClassName,
    displayName: 'Breadcrumb',
    handledProps: ['accessibility', 'as', 'children', 'className', 'content', 'design', 'styles', 'variables'],
  },
) as ComponentWithAs<'nav', BreadcrumbProps> & {
  create: ShorthandFactory<BreadcrumbProps>;
  shorthandConfig: ShorthandConfig<BreadcrumbProps>;

  Item: typeof BreadcrumbItem;
  Divider: typeof BreadcrumbDivider;
};

Breadcrumb.defaultProps = {
  as: 'nav',
  accessibility: breadcrumbBehavior,
};

Breadcrumb.propTypes = commonPropTypes.createCommon();

Breadcrumb.Item = BreadcrumbItem;
Breadcrumb.Divider = BreadcrumbDivider;

Breadcrumb.create = createShorthandFactory({
  Component: Breadcrumb,
});
