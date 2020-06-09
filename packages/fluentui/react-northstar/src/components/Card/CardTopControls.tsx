import { Accessibility } from '@fluentui/accessibility';
import { getElementType, useUnhandledProps, useAccessibility, useStyles, useTelemetry } from '@fluentui/react-bindings';
import * as React from 'react';
// @ts-ignore
import { ThemeContext } from 'react-fela';
import { FluentComponentStaticProps, ProviderContextPrepared, WithAsProp, withSafeTypeForAs } from '../../types';
import { ChildrenComponentProps, commonPropTypes, createShorthandFactory, UIComponentProps } from '../../utils';

export interface CardTopControlsProps extends UIComponentProps, ChildrenComponentProps {
  /**
   * Accessibility behavior if overridden by the user.
   */
  accessibility?: Accessibility<never>;
}

export type CardTopControlsStylesProps = never;
export const cardTopControlsClassName = 'ui-card__topcontrols';

const CardTopControls: React.FC<WithAsProp<CardTopControlsProps>> &
  FluentComponentStaticProps<CardTopControlsProps> = props => {
  const context: ProviderContextPrepared = React.useContext(ThemeContext);
  const { setStart, setEnd } = useTelemetry(CardTopControls.displayName, context.telemetry);
  setStart();

  const { className, design, styles, variables, children } = props;
  const ElementType = getElementType(props);
  const unhandledProps = useUnhandledProps(CardTopControls.handledProps, props);
  const getA11yProps = useAccessibility(props.accessibility, {
    debugName: CardTopControls.displayName,
    rtl: context.rtl,
  });

  const { classes } = useStyles<CardTopControlsStylesProps>(CardTopControls.displayName, {
    className: cardTopControlsClassName,
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

CardTopControls.displayName = 'CardTopControls';

CardTopControls.propTypes = {
  ...commonPropTypes.createCommon(),
};

CardTopControls.handledProps = Object.keys(CardTopControls.propTypes) as any;

CardTopControls.create = createShorthandFactory({ Component: CardTopControls });

/**
 * A CardTopControls is used to render control elements in the top of a Card component.
 */
export default withSafeTypeForAs<typeof CardTopControls, CardTopControlsProps, 'div'>(CardTopControls);
