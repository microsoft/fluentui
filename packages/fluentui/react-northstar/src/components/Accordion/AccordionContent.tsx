import { accordionContentBehavior, Accessibility, AccordionContentBehaviorProps } from '@fluentui/accessibility';
import * as PropTypes from 'prop-types';
import * as React from 'react';
import * as _ from 'lodash';

import {
  childrenExist,
  createShorthandFactory,
  UIComponentProps,
  ChildrenComponentProps,
  ContentComponentProps,
  commonPropTypes,
  rtlTextContainer,
} from '../../utils';
import { ComponentEventHandler, FluentComponentStaticProps } from '../../types';

import {
  ComponentWithAs,
  useTelemetry,
  useFluentContext,
  getElementType,
  useAccessibility,
  useUnhandledProps,
  useStyles,
} from '@fluentui/react-bindings';

export interface AccordionContentProps extends UIComponentProps, ChildrenComponentProps, ContentComponentProps {
  /**
   * Accessibility behavior if overridden by the user.
   */
  accessibility?: Accessibility<AccordionContentBehaviorProps>;

  /** Id of the title it belongs to. */
  accordionTitleId?: string;

  /** Whether or not the content is visible. */
  active?: boolean;

  /**
   * Called on click.
   *
   * @param event - React's original SyntheticEvent.
   * @param data - All props.
   */
  onClick?: ComponentEventHandler<AccordionContentProps>;
}

export const accordionContentClassName = 'ui-accordion__content';

export type AccordionContentStylesProps = Required<Pick<AccordionContentProps, 'active'>>;

/**
 * An AccordionContent displays content hosted in an Accordion.
 */
export const AccordionContent: ComponentWithAs<'dd', AccordionContentProps> &
  FluentComponentStaticProps<AccordionContentProps> = props => {
  const context = useFluentContext();
  const { setStart, setEnd } = useTelemetry(AccordionContent.displayName, context.telemetry);

  setStart();
  const { children, content, accordionTitleId, active, className, design, styles, variables } = props;
  const ElementType = getElementType(props);
  const unhandledProps = useUnhandledProps(AccordionContent.handledProps, props);

  const getA11yProps = useAccessibility(props.accessibility, {
    debugName: AccordionContent.displayName,
    mapPropsToBehavior: () => ({
      accordionTitleId,
    }),
    rtl: context.rtl,
  });
  const handleClick = (e: React.SyntheticEvent) => {
    _.invoke(props, 'onClick', e, props);
  };

  const { classes } = useStyles<AccordionContentStylesProps>(AccordionContent.displayName, {
    className: accordionContentClassName,
    mapPropsToStyles: () => ({
      active,
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
        onClick: handleClick,
        ...unhandledProps,
      })}
      {...rtlTextContainer.getAttributes({ forElements: [children, content] })}
    >
      {childrenExist(children) ? children : content}
    </ElementType>
  );

  setEnd();

  return element;
};

AccordionContent.displayName = 'AccordionContent';

AccordionContent.shorthandConfig = {
  mappedProp: 'content',
};

AccordionContent.propTypes = {
  ...commonPropTypes.createCommon(),
  accordionTitleId: PropTypes.string,
  active: PropTypes.bool,
  onClick: PropTypes.func,
};

AccordionContent.defaultProps = {
  accessibility: accordionContentBehavior,
  as: 'dd',
};

AccordionContent.handledProps = Object.keys(AccordionContent.propTypes) as any;

AccordionContent.create = createShorthandFactory({
  Component: AccordionContent,
  mappedProp: 'content',
});
