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
  SizeValue,
} from '../../utils';
import { Accessibility } from '@fluentui/accessibility';
import { BreadcrumbItem } from './BreadcrumbItem';
import { BreadcrumbDivider } from './BreadcrumbDivider';
import { BreadcrumbLink } from './BreadcrumbLink';

export interface BreadcrumbProps
  extends UIComponentProps<BreadcrumbProps>,
    ContentComponentProps,
    ChildrenComponentProps {
  /** Accessibility behavior if overridden by the user. */
  accessibility?: Accessibility<never>;

  /** Breadcrumb can be sized */
  size?: SizeValue;
}

export type BreadcrumbStylesProps = Required<Pick<BreadcrumbProps, 'size'>>;

export const breadcrumbClassName = 'ui-breadcrumb';

/**
 * Breadcrumb is a a component that indicates the path of the current page
 * This component is currently UNSTABLE!
 */
export const Breadcrumb = compose<'nav', BreadcrumbProps, BreadcrumbStylesProps, {}, {}>(
  (props, ref, composeOptions) => {
    const context = useFluentContext();
    const { setStart, setEnd } = useTelemetry(composeOptions.displayName, context.telemetry);
    setStart();
    const { accessibility, children, content, className, design, styles, variables, size } = props;

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
};

Breadcrumb.propTypes = commonPropTypes.createCommon();

Breadcrumb.Item = BreadcrumbItem;
Breadcrumb.Divider = BreadcrumbDivider;
Breadcrumb.Link = BreadcrumbLink;

Breadcrumb.create = createShorthandFactory({
  Component: Breadcrumb,
});
