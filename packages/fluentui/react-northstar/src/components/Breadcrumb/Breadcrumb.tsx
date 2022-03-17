import * as React from 'react';
import * as PropTypes from 'prop-types';
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
import { BreadcrumbLink } from './BreadcrumbLink';
import { BreadcrumbContext, BreadcrumbSizeValues } from './breadcrumbContext';
import { Ref } from '@fluentui/react-component-ref';

export interface BreadcrumbProps
  extends UIComponentProps<BreadcrumbProps>,
    ContentComponentProps,
    ChildrenComponentProps {
  /** Accessibility behavior if overridden by the user. */
  accessibility?: Accessibility<BreadcrumbBehaviorProps>;

  /** Breadcrumb can be sized */
  size?: BreadcrumbSizeValues;
}

export type BreadcrumbStylesProps = Required<Pick<BreadcrumbProps, 'size'>>;

export const breadcrumbClassName = 'ui-breadcrumb';

/**
 * Breadcrumb is a component that indicates the path of the current page
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
    const { accessibility, children, content, className, design, styles, variables, size } = props;

    const contextValue = React.useMemo(() => ({ size }), [size]);
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
        size,
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
          ...unhandledProps,
        })}
      >
        <BreadcrumbContext.Provider value={contextValue}>
          <div
            {...getA11yProps('container', {
              className: classes.container,
            })}
          >
            {childrenExist(children) ? children : content}
          </div>
        </BreadcrumbContext.Provider>
      </ElementType>,
    );
    const wrappedElement = ref ? <Ref innerRef={ref}>{result}</Ref> : result;

    setEnd();

    return wrappedElement;
  },
  {
    className: breadcrumbClassName,
    displayName: 'Breadcrumb',
    handledProps: ['accessibility', 'as', 'children', 'className', 'content', 'design', 'styles', 'variables', 'size'],
    mapPropsToStylesProps: ({ size }) => ({
      size,
    }),
  },
) as ComponentWithAs<'nav', BreadcrumbProps> & {
  create: ShorthandFactory<BreadcrumbProps>;
  shorthandConfig: ShorthandConfig<BreadcrumbProps>;

  Item: typeof BreadcrumbItem;
  Divider: typeof BreadcrumbDivider;
  Link: typeof BreadcrumbLink;
};

Breadcrumb.defaultProps = {
  as: 'nav',
  size: 'medium',
  accessibility: breadcrumbBehavior,
};

Breadcrumb.propTypes = {
  ...commonPropTypes.createCommon(),
  size: PropTypes.oneOf(['smaller', 'small', 'medium', 'large']),
};

Breadcrumb.Item = BreadcrumbItem;
Breadcrumb.Divider = BreadcrumbDivider;
Breadcrumb.Link = BreadcrumbLink;

Breadcrumb.create = createShorthandFactory({
  Component: Breadcrumb,
});
