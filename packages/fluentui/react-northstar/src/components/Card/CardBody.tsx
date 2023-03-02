import * as React from 'react';
import { FluentComponentStaticProps } from '../../types';
import { Accessibility } from '@fluentui/accessibility';
import { UIComponentProps, ChildrenComponentProps, commonPropTypes, createShorthandFactory } from '../../utils';
import {
  useTelemetry,
  useStyles,
  getElementType,
  useUnhandledProps,
  useFluentContext,
  useAccessibility,
  ForwardRefWithAs,
} from '@fluentui/react-bindings';
import * as PropTypes from 'prop-types';

export interface CardBodyProps extends UIComponentProps, ChildrenComponentProps {
  /**
   * Accessibility behavior if overridden by the user.
   */
  accessibility?: Accessibility<never>;

  /** A body can be fitted, without any space above or below it. */
  fitted?: boolean;
}

export type CardBodyStylesProps = Pick<CardBodyProps, 'fitted'>;
export const cardBodyClassName = 'ui-card__body';

/**
 * A CardBody is used to display data in Card body.
 */
export const CardBody = React.forwardRef<HTMLDivElement, CardBodyProps>((props, ref) => {
  const context = useFluentContext();
  const { setStart, setEnd } = useTelemetry(CardBody.displayName, context.telemetry);
  setStart();

  const { className, design, styles, variables, children, fitted } = props;
  const ElementType = getElementType(props);
  const unhandledProps = useUnhandledProps(CardBody.handledProps, props);
  const getA11yProps = useAccessibility(props.accessibility, {
    debugName: CardBody.displayName,
    rtl: context.rtl,
  });

  const { classes } = useStyles<CardBodyStylesProps>(CardBody.displayName, {
    className: cardBodyClassName,
    mapPropsToStyles: () => ({ fitted }),
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
      })}
    >
      {children}
    </ElementType>
  );
  setEnd();
  return element;
}) as unknown as ForwardRefWithAs<'div', HTMLDivElement, CardBodyProps> & FluentComponentStaticProps<CardBodyProps>;

CardBody.displayName = 'CardBody';

CardBody.propTypes = {
  ...commonPropTypes.createCommon(),
  fitted: PropTypes.bool,
};

CardBody.handledProps = Object.keys(CardBody.propTypes) as any;

CardBody.create = createShorthandFactory({ Component: CardBody });
