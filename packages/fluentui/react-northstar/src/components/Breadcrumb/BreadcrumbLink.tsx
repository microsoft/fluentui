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

import { Accessibility } from '@fluentui/accessibility';
import { useBreadcrumbContext, BreadcrumbSizeValues } from './breadcrumbContext';

export interface BreadcrumbLinkProps
  extends UIComponentProps<BreadcrumbLinkProps>,
    ContentComponentProps,
    ChildrenComponentProps {
  /** Accessibility behavior if overridden by the user. */
  accessibility?: Accessibility<never>;
}

export type BreadcrumbLinkStylesProps = { size: BreadcrumbSizeValues };

export const breadcrumbLinkClassName = 'ui-breadcrumb__link';

/**
 * An BreadcrumbLink represents a anchor to be used inside the Breadcrumb
 */
export const BreadcrumbLink = compose<'a', BreadcrumbLinkProps, BreadcrumbLinkStylesProps, {}, {}>(
  (props, ref, composeOptions) => {
    const context = useFluentContext();
    const { setStart, setEnd } = useTelemetry(composeOptions.displayName, context.telemetry);
    setStart();
    const { accessibility, children, content, className, design, styles, variables } = props;
    const { size } = useBreadcrumbContext();

    const getA11yProps = useAccessibility(accessibility, {
      debugName: composeOptions.displayName,
      rtl: context.rtl,
    });

    const { classes } = useStyles<BreadcrumbLinkStylesProps>(composeOptions.displayName, {
      className: composeOptions.className,
      composeOptions,
      mapPropsToStyles: () => ({
        size,
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
    className: breadcrumbLinkClassName,
    displayName: 'BreadcrumbLink',
    handledProps: ['accessibility', 'as', 'children', 'className', 'content', 'design', 'styles', 'variables'],
  },
);

BreadcrumbLink.defaultProps = {
  as: 'a',
};

BreadcrumbLink.propTypes = commonPropTypes.createCommon();
