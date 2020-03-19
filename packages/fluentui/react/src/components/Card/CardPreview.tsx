import { Accessibility, cardPreviewBehavior, CardPreviewBehaviorProps } from '@fluentui/accessibility';
import { getElementType, getUnhandledProps, useAccessibility, useStyles, useTelemetry } from '@fluentui/react-bindings';
import * as _ from 'lodash';
import * as PropTypes from 'prop-types';
import * as React from 'react';
// @ts-ignore
import { ThemeContext } from 'react-fela';
import { FluentComponentStaticProps, ProviderContextPrepared, WithAsProp, withSafeTypeForAs } from '../../types';
import { ChildrenComponentProps, commonPropTypes, createShorthandFactory, UIComponentProps } from '../../utils';

export interface CardPreviewProps extends UIComponentProps, ChildrenComponentProps {
  /**
   * Accessibility behavior if overridden by the user.
   * */
  accessibility?: Accessibility<CardPreviewBehaviorProps>;

  /**
   *
   * If preview is in horizontal card
   */

  horizontal?: boolean;

  /**
   * A preview can be fitted, without any space above or below it.
   */
  fitted?: boolean;
}

export type CardPreviewStylesProps = Pick<CardPreviewProps, 'horizontal' | 'fitted'>;

const CardPreview: React.FC<WithAsProp<CardPreviewProps>> & FluentComponentStaticProps<CardPreviewProps> = props => {
  const context: ProviderContextPrepared = React.useContext(ThemeContext);
  const { setStart, setEnd } = useTelemetry(CardPreview.displayName, context.telemetry);
  setStart();

  const { className, design, styles, variables, children, horizontal, fitted } = props;
  const ElementType = getElementType(props);
  const unhandledProps = getUnhandledProps(CardPreview.handledProps, props);
  const getA11yProps = useAccessibility(props.accessibility, {
    debugName: CardPreview.displayName,
    rtl: context.rtl
  });

  const { classes } = useStyles<CardPreviewStylesProps>(CardPreview.displayName, {
    className: CardPreview.className,
    mapPropsToStyles: () => ({ horizontal, fitted }),
    mapPropsToInlineStyles: () => ({
      className,
      design,
      styles,
      variables
    }),
    rtl: context.rtl
  });

  const handleClick = (e: React.MouseEvent | React.KeyboardEvent) => {
    _.invoke(props, 'onClick', e, props);
  };

  const element = (
    <ElementType
      {...getA11yProps('root', {
        className: classes.root,
        onClick: handleClick,
        ...unhandledProps
      })}
    >
      {children}
    </ElementType>
  );
  setEnd();
  return element;
};

CardPreview.displayName = 'CardPreview';
CardPreview.className = 'ui-card__preview';

CardPreview.propTypes = {
  ...commonPropTypes.createCommon(),
  horizontal: PropTypes.bool,
  fitted: PropTypes.bool
};

CardPreview.defaultProps = {
  accessibility: cardPreviewBehavior
};

CardPreview.handledProps = Object.keys(CardPreview.propTypes) as any;

CardPreview.create = createShorthandFactory({ Component: CardPreview });

/**
 * A Card is used to display data in sematically grouped way
 */
export default withSafeTypeForAs<typeof CardPreview, CardPreviewProps, 'div'>(CardPreview);
