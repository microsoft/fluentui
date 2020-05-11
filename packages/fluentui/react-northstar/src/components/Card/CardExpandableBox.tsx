import * as React from 'react';
import { WithAsProp, withSafeTypeForAs, FluentComponentStaticProps, ProviderContextPrepared } from '../../types';
import { Accessibility } from '@fluentui/accessibility';
import { UIComponentProps, ChildrenComponentProps, commonPropTypes, createShorthandFactory } from '../../utils';
import { useTelemetry, useStyles, getElementType, useUnhandledProps, useAccessibility } from '@fluentui/react-bindings';
// @ts-ignore
import { ThemeContext } from 'react-fela';

export interface CardExpandableBoxProps extends UIComponentProps, ChildrenComponentProps {
  /**
   * Accessibility behavior if overridden by the user.
   */
  accessibility?: Accessibility<never>;
}

export type CardExpandableBoxStylesProps = never;
export const cardExpandableBoxClassName = 'ui-card__expandablebox';

const CardExpandableBox: React.FC<WithAsProp<CardExpandableBoxProps>> &
  FluentComponentStaticProps<CardExpandableBoxProps> = props => {
  const context: ProviderContextPrepared = React.useContext(ThemeContext);
  const { setStart, setEnd } = useTelemetry(CardExpandableBox.displayName, context.telemetry);
  setStart();

  const { className, design, styles, variables, children } = props;
  const ElementType = getElementType(props);
  const unhandledProps = useUnhandledProps(CardExpandableBox.handledProps, props);
  const getA11yProps = useAccessibility(props.accessibility, {
    debugName: CardExpandableBox.displayName,
    rtl: context.rtl,
  });

  const { classes } = useStyles<CardExpandableBoxStylesProps>(CardExpandableBox.displayName, {
    className: cardExpandableBoxClassName,
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

CardExpandableBox.displayName = 'CardExpandableBox';

CardExpandableBox.propTypes = {
  ...commonPropTypes.createCommon(),
};

CardExpandableBox.handledProps = Object.keys(CardExpandableBox.propTypes) as any;

CardExpandableBox.create = createShorthandFactory({ Component: CardExpandableBox });

/**
 * A CardExpandableBox is used to display data in which is partially hidden and shown on focus/hover.
 */
export default withSafeTypeForAs<typeof CardExpandableBox, CardExpandableBoxProps, 'div'>(CardExpandableBox);
