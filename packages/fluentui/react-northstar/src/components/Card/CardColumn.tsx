import * as React from 'react';
import { FluentComponentStaticProps } from '../../types';
import { Accessibility } from '@fluentui/accessibility';
import { UIComponentProps, ChildrenComponentProps, commonPropTypes, createShorthandFactory } from '../../utils';
import {
  useTelemetry,
  useStyles,
  getElementType,
  useUnhandledProps,
  useAccessibility,
  useFluentContext,
  ForwardRefWithAs,
} from '@fluentui/react-bindings';

export interface CardColumnProps extends UIComponentProps, ChildrenComponentProps {
  /**
   * Accessibility behavior if overridden by the user.
   */
  accessibility?: Accessibility<never>;
}

export type CardColumnStylesProps = never;
export const cardColumnClassName = 'ui-card__column';

/**
 * A CardColumn is used to display content in card as column
 */
export const CardColumn = React.forwardRef<HTMLDivElement, CardColumnProps>((props, ref) => {
  const context = useFluentContext();
  const { setStart, setEnd } = useTelemetry(CardColumn.displayName, context.telemetry);
  setStart();

  const { className, design, styles, variables, children } = props;
  const ElementType = getElementType(props);
  const unhandledProps = useUnhandledProps(CardColumn.handledProps, props);
  const getA11yProps = useAccessibility(props.accessibility, {
    debugName: CardColumn.displayName,
    rtl: context.rtl,
  });

  const { classes } = useStyles<CardColumnStylesProps>(CardColumn.displayName, {
    className: cardColumnClassName,
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
}) as unknown as ForwardRefWithAs<'div', HTMLDivElement, CardColumnProps> & FluentComponentStaticProps<CardColumnProps>;

CardColumn.displayName = 'CardColumn';

CardColumn.propTypes = {
  ...commonPropTypes.createCommon(),
};

CardColumn.handledProps = Object.keys(CardColumn.propTypes) as any;

CardColumn.create = createShorthandFactory({ Component: CardColumn });
