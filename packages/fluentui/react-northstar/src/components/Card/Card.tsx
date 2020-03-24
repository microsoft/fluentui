import * as React from 'react';
import {
  WithAsProp,
  withSafeTypeForAs,
  ComponentEventHandler,
  FluentComponentStaticProps,
  ProviderContextPrepared,
} from '../../types';
import { Accessibility, cardBehavior, CardBehaviorProps } from '@fluentui/accessibility';
import { UIComponentProps, ChildrenComponentProps, commonPropTypes, createShorthandFactory } from '../../utils';
import { useTelemetry, useStyles, getElementType, useUnhandledProps, useAccessibility } from '@fluentui/react-bindings';
import * as PropTypes from 'prop-types';
import * as _ from 'lodash';
// @ts-ignore
import { ThemeContext } from 'react-fela';
import CardHeader from './CardHeader';
import CardBody from './CardBody';
import CardPreview from './CardPreview';
import CardFooter from './CardFooter';
import CardTopControls from './CardTopControls';
import CardColumn from './CardColumn';

export interface CardProps extends UIComponentProps, ChildrenComponentProps {
  /**
   * Accessibility behavior if overridden by the user.
   */
  accessibility?: Accessibility<CardBehaviorProps>;

  /**
   * Called on click.
   *
   * @param event - React's original SyntheticEvent.
   * @param data - All props.
   */
  onClick?: ComponentEventHandler<CardProps>;

  /** A card can be compact, without any padding inside. */
  compact?: boolean;

  /** A card will used horizontal layout. */
  horizontal?: boolean;

  /** Centers content in a card. */
  centered?: boolean;
}

export type CardStylesProps = Pick<CardProps, 'compact' | 'horizontal' | 'centered'>;

export interface CardSlotClassNames {
  header: string;
  body: string;
  footer: string;
  preview: string;
  topControls: string;
}

const Card: React.FC<WithAsProp<CardProps>> &
  FluentComponentStaticProps<CardProps> & {
    Header: typeof CardHeader;
    Body: typeof CardBody;
    Footer: typeof CardFooter;
    Preview: typeof CardPreview;
    TopControls: typeof CardPreview;
    Column: typeof CardColumn;
    slotClassNames: CardSlotClassNames;
  } = props => {
  const context: ProviderContextPrepared = React.useContext(ThemeContext);
  const { setStart, setEnd } = useTelemetry(Card.displayName, context.telemetry);
  setStart();

  const { className, design, styles, variables, children, compact, horizontal, centered } = props;
  const ElementType = getElementType(props);
  const unhandledProps = useUnhandledProps(Card.handledProps, props);
  const getA11yProps = useAccessibility(props.accessibility, {
    debugName: Card.displayName,
    actionHandlers: {
      performClick: e => {
        handleClick(e);
      },
    },
    rtl: context.rtl,
  });

  const { classes } = useStyles<CardStylesProps>(Card.displayName, {
    className: Card.className,
    mapPropsToStyles: () => ({
      centered,
      horizontal,
      compact,
    }),
    mapPropsToInlineStyles: () => ({
      className,
      design,
      styles,
      variables,
    }),
    rtl: context.rtl,
  });

  const handleClick = (e: React.MouseEvent | React.KeyboardEvent) => {
    _.invoke(props, 'onClick', e, props);
  };

  const element = (
    <ElementType
      {...getA11yProps('root', {
        className: classes.root,
        onClick: handleClick,
        ...unhandledProps,
      })}
    >
      {children}
    </ElementType>
  );
  setEnd();
  return element;
};

Card.displayName = 'Card';
Card.className = 'ui-card';

Card.slotClassNames = {
  header: `${Card.className}__header`,
  body: `${Card.className}__body`,
  footer: `${Card.className}__footer`,
  preview: `${Card.className}__preview`,
  topControls: `${Card.className}__top-controls`,
};

Card.propTypes = {
  ...commonPropTypes.createCommon(),
  onClick: PropTypes.func,
  compact: PropTypes.bool,
  horizontal: PropTypes.bool,
  centered: PropTypes.bool,
};

Card.defaultProps = {
  accessibility: cardBehavior,
};

Card.handledProps = Object.keys(Card.propTypes) as any;
Card.Header = CardHeader;
Card.Body = CardBody;
Card.Footer = CardFooter;
Card.Preview = CardPreview;
Card.TopControls = CardTopControls;
Card.Column = CardColumn;

Card.create = createShorthandFactory({ Component: Card });

/**
 * A Card is used to display data in sematically grouped way.
 */
export default withSafeTypeForAs<typeof Card, CardProps, 'div'>(Card);
