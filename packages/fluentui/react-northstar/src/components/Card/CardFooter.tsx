import { Accessibility } from '@fluentui/accessibility';
import { getElementType, useUnhandledProps, useAccessibility, useStyles, useTelemetry } from '@fluentui/react-bindings';
import * as PropTypes from 'prop-types';
import * as React from 'react';
// @ts-ignore
import { ThemeContext } from 'react-fela';
import { FluentComponentStaticProps, ProviderContextPrepared, WithAsProp, withSafeTypeForAs } from '../../types';
import { ChildrenComponentProps, commonPropTypes, createShorthandFactory, UIComponentProps } from '../../utils';

export interface CardFooterProps extends UIComponentProps, ChildrenComponentProps {
  /**
   * Accessibility behavior if overridden by the user.
   */
  accessibility?: Accessibility<never>;

  /** A footer can be fitted, without any space above or below it. */
  fitted?: boolean;
}

export type CardFooterStylesProps = Pick<CardFooterProps, 'fitted'>;
export const cardFooterClassName = 'ui-card__footer';

const CardFooter: React.FC<WithAsProp<CardFooterProps>> & FluentComponentStaticProps<CardFooterProps> = props => {
  const context: ProviderContextPrepared = React.useContext(ThemeContext);
  const { setStart, setEnd } = useTelemetry(CardFooter.displayName, context.telemetry);
  setStart();

  const { className, design, styles, variables, children, fitted } = props;
  const ElementType = getElementType(props);
  const unhandledProps = useUnhandledProps(CardFooter.handledProps, props);
  const getA11yProps = useAccessibility(props.accessibility, {
    debugName: CardFooter.displayName,
    rtl: context.rtl,
  });

  const { classes } = useStyles<CardFooterStylesProps>(CardFooter.displayName, {
    className: cardFooterClassName,
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
        ...unhandledProps,
      })}
    >
      {children}
    </ElementType>
  );
  setEnd();
  return element;
};

CardFooter.displayName = 'CardFooter';

CardFooter.propTypes = {
  ...commonPropTypes.createCommon(),
  fitted: PropTypes.bool,
};

CardFooter.handledProps = Object.keys(CardFooter.propTypes) as any;

CardFooter.create = createShorthandFactory({ Component: CardFooter });

/**
 * A CardFooter is used to display data in Card component footer
 */
export default withSafeTypeForAs<typeof CardFooter, CardFooterProps, 'div'>(CardFooter);
