import { Accessibility } from '@fluentui/accessibility';
import {
  getElementType,
  useUnhandledProps,
  useAccessibility,
  useFluentContext,
  useStyles,
  useTelemetry,
  ForwardRefWithAs,
} from '@fluentui/react-bindings';
import * as PropTypes from 'prop-types';
import * as React from 'react';

import { FluentComponentStaticProps } from '../../types';
import { ChildrenComponentProps, commonPropTypes, createShorthandFactory, UIComponentProps } from '../../utils';

export interface CardHeaderProps extends UIComponentProps, ChildrenComponentProps {
  /**
   * Accessibility behavior if overridden by the user.
   */
  accessibility?: Accessibility<never>;

  /** A footer can be fitted, without any space above or below it. */
  fitted?: boolean;
}

export type CardHeaderStylesProps = Pick<CardHeaderProps, 'fitted'>;
export const cardHeaderClassName = 'ui-card__header';

/**
 * A CardHeader is used to display data in Card header.
 */
export const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>((props, ref) => {
  const context = useFluentContext();
  const { setStart, setEnd } = useTelemetry(CardHeader.displayName, context.telemetry);
  setStart();

  const { className, design, styles, variables, children, fitted } = props;
  const ElementType = getElementType(props);
  const unhandledProps = useUnhandledProps(CardHeader.handledProps, props);
  const getA11yProps = useAccessibility(props.accessibility, {
    debugName: CardHeader.displayName,
    rtl: context.rtl,
  });

  const { classes } = useStyles<CardHeaderStylesProps>(CardHeader.displayName, {
    className: cardHeaderClassName,
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
}) as unknown as ForwardRefWithAs<'div', HTMLDivElement, CardHeaderProps> & FluentComponentStaticProps<CardHeaderProps>;

CardHeader.displayName = 'CardHeader';

CardHeader.propTypes = {
  ...commonPropTypes.createCommon(),
  fitted: PropTypes.bool,
};

CardHeader.handledProps = Object.keys(CardHeader.propTypes) as any;

CardHeader.create = createShorthandFactory({ Component: CardHeader });
