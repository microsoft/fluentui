import { Accessibility } from '@fluentui/accessibility';
import * as React from 'react';

import {
  childrenExist,
  createShorthandFactory,
  UIComponentProps,
  ChildrenComponentProps,
  ContentComponentProps,
  commonPropTypes,
  ColorComponentProps,
  rtlTextContainer,
} from '../../utils';

import { FluentComponentStaticProps } from '../../types';
import {
  useTelemetry,
  useFluentContext,
  getElementType,
  useUnhandledProps,
  useAccessibility,
  useStyles,
  ForwardRefWithAs,
} from '@fluentui/react-bindings';

export interface HeaderDescriptionProps
  extends UIComponentProps,
    ChildrenComponentProps,
    ContentComponentProps,
    ColorComponentProps {
  /**
   * Accessibility behavior if overridden by the user.
   */
  accessibility?: Accessibility<never>;
}

export const headerDescriptionClassName = 'ui-header__description';
export type HeaderDescriptionStylesProps = Pick<HeaderDescriptionProps, 'color'>;

/**
 * A HeaderDescription provides more detailed information about the Header.
 */
export const HeaderDescription = React.forwardRef<HTMLParagraphElement, HeaderDescriptionProps>((props, ref) => {
  const context = useFluentContext();
  const { setStart, setEnd } = useTelemetry(HeaderDescription.displayName, context.telemetry);
  setStart();
  const { children, content, color, className, design, styles, variables } = props;
  const ElementType = getElementType(props);
  const unhandledProps = useUnhandledProps(HeaderDescription.handledProps, props);

  const getA11yProps = useAccessibility<never>(props.accessibility, {
    debugName: HeaderDescription.displayName,
    rtl: context.rtl,
  });

  const { classes } = useStyles<HeaderDescriptionStylesProps>(HeaderDescription.displayName, {
    className: headerDescriptionClassName,
    mapPropsToStyles: () => ({
      color,
    }),
    mapPropsToInlineStyles: () => ({
      className,
      design,
      styles,
      variables,
    }),
    rtl: context.rtl,
  });

  const element = (
    <ElementType
      {...getA11yProps('root', {
        className: classes.root,
        ref,
        ...unhandledProps,
        ...rtlTextContainer.getAttributes({ forElements: [children, content] }),
      })}
    >
      {childrenExist(children) ? children : content}
    </ElementType>
  );
  setEnd();
  return element;
}) as unknown as ForwardRefWithAs<'p', HTMLParagraphElement, HeaderDescriptionProps> &
  FluentComponentStaticProps<HeaderDescriptionProps>;

HeaderDescription.displayName = 'HeaderDescription';

HeaderDescription.propTypes = {
  ...commonPropTypes.createCommon({ color: true }),
};

HeaderDescription.defaultProps = {
  as: 'p',
};

HeaderDescription.handledProps = Object.keys(HeaderDescription.propTypes) as any;

HeaderDescription.create = createShorthandFactory({
  Component: HeaderDescription,
  mappedProp: 'content',
});
