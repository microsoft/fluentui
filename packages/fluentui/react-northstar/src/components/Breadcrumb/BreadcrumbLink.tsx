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
import {
  commonPropTypes,
  UIComponentProps,
  ContentComponentProps,
  ChildrenComponentProps,
  SizeValue,
} from '../../utils';
import { useBreadcrumbContext } from './breadcrumbContext';
import { Accessibility, BreadcrumbLinkBehaviorProps, breadcrumbLinkBehavior } from '@fluentui/accessibility';

export interface BreadcrumbLinkProps
  extends UIComponentProps<BreadcrumbLinkProps>,
    ContentComponentProps,
    ChildrenComponentProps {
  /** Accessibility behavior if overridden by the user. */
  accessibility?: Accessibility<BreadcrumbLinkBehaviorProps>;

  /** The Breadcrumb Link can be disabled */
  disabled?: boolean;

  /** Indicates if the link is the last item of the breadccrumb indicatiing the current page */
  current?: boolean;
}

export type BreadcrumbLinkStylesProps = Required<Pick<BreadcrumbLinkProps, 'disabled' | 'current'>> & {
  size: SizeValue;
};

export const breadcrumbLinkClassName = 'ui-breadcrumb__link';

/**
 * An BreadcrumbLink represents a anchor to be used inside the Breadcrumb
 * This component is currently UNSTABLE!
 */
export const BreadcrumbLink = compose<'a', BreadcrumbLinkProps, BreadcrumbLinkStylesProps, {}, {}>(
  (props, ref, composeOptions) => {
    const context = useFluentContext();
    const { setStart, setEnd } = useTelemetry(composeOptions.displayName, context.telemetry);
    setStart();
    const { accessibility, children, content, className, design, styles, variables, disabled, current } = props;
    const { size } = useBreadcrumbContext();

    const getA11yProps = useAccessibility(accessibility, {
      mapPropsToBehavior: () => ({
        disabled,
        current,
      }),
      debugName: composeOptions.displayName,
      rtl: context.rtl,
    });

    const { classes } = useStyles<BreadcrumbLinkStylesProps>(composeOptions.displayName, {
      className: composeOptions.className,
      composeOptions,
      mapPropsToStyles: () => ({ size, disabled, current }),
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
    handledProps: [
      'accessibility',
      'as',
      'children',
      'className',
      'content',
      'design',
      'styles',
      'variables',
      'current',
    ],
  },
);

BreadcrumbLink.defaultProps = {
  accessibility: breadcrumbLinkBehavior,
  as: 'a',
};

BreadcrumbLink.propTypes = commonPropTypes.createCommon();
