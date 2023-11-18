import { Accessibility } from '@fluentui/accessibility';
import {
  ForwardRefWithAs,
  getElementType,
  useUnhandledProps,
  useAccessibility,
  useStyles,
  useTelemetry,
  useFluentContext,
} from '@fluentui/react-bindings';
import * as PropTypes from 'prop-types';
import * as React from 'react';

import { FluentComponentStaticProps } from '../../types';
import { ChildrenComponentProps, commonPropTypes, createShorthandFactory, UIComponentProps } from '../../utils';

export interface CardPreviewProps extends UIComponentProps, ChildrenComponentProps {
  /**
   * Accessibility behavior if overridden by the user.
   */
  accessibility?: Accessibility<never>;

  /** If preview is in horizontal card. */
  horizontal?: boolean;

  /** A preview can be fitted, without any space above or below it. */
  fitted?: boolean;
}

export type CardPreviewStylesProps = Pick<CardPreviewProps, 'horizontal' | 'fitted'>;
export const cardPreviewClassName = 'ui-card__preview';

/**
 * A CardPreview is used to display data Card preview.
 */
export const CardPreview = React.forwardRef<HTMLDivElement, CardPreviewProps>((props, ref) => {
  const context = useFluentContext();
  const { setStart, setEnd } = useTelemetry(CardPreview.displayName, context.telemetry);
  setStart();

  const { className, design, styles, variables, children, horizontal, fitted } = props;
  const ElementType = getElementType(props);
  const unhandledProps = useUnhandledProps(CardPreview.handledProps, props);
  const getA11yProps = useAccessibility(props.accessibility, {
    debugName: CardPreview.displayName,
    rtl: context.rtl,
  });

  const { classes } = useStyles<CardPreviewStylesProps>(CardPreview.displayName, {
    className: cardPreviewClassName,
    mapPropsToStyles: () => ({ horizontal, fitted }),
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
}) as unknown as ForwardRefWithAs<'div', HTMLDivElement, CardPreviewProps> &
  FluentComponentStaticProps<CardPreviewProps>;

CardPreview.displayName = 'CardPreview';

CardPreview.propTypes = {
  ...commonPropTypes.createCommon(),
  horizontal: PropTypes.bool,
  fitted: PropTypes.bool,
};

CardPreview.handledProps = Object.keys(CardPreview.propTypes) as any;

CardPreview.create = createShorthandFactory({ Component: CardPreview });
