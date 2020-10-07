import { Accessibility, cardBehavior, CardBehaviorProps } from '@fluentui/accessibility';
import {
  ComponentWithAs,
  getElementType,
  useAccessibility,
  useClasses,
  useFluentContext,
  useTelemetry,
  useUnhandledProps,
} from '@fluentui/react-bindings';
import { Ref } from '@fluentui/react-component-ref';
import * as CustomPropTypes from '@fluentui/react-proptypes';
import * as _ from 'lodash';
import * as PropTypes from 'prop-types';
import * as React from 'react';
import { ComponentEventHandler, FluentComponentStaticProps } from '../../types';
import { commonPropTypes, createShorthandFactory, SizeValue, UIComponentProps } from '../../utils';
import { CardBody } from './CardBody';
import { CardColumn } from './CardColumn';
import { CardFooter } from './CardFooter';
import { CardHeader } from './CardHeader';
import { CardPreview } from './CardPreview';
import { CardTopControls } from './CardTopControls';
import { CardExpandableBox } from './CardExpandableBox';

export interface CardProps extends UIComponentProps {
  /**
   * Accessibility behavior if overridden by the user.
   */
  accessibility?: Accessibility<CardBehaviorProps>;

  /** A primary content. */
  children?: React.ReactNode;

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

  /** A card can be sized. */
  size?: SizeValue;

  /** A card can take up the width and height of its container. */
  fluid?: boolean;

  /** A card can show that it cannot be interacted with. */
  disabled?: boolean;

  /** A card can be hiding part of the content and expand on hover/focus. */
  expandable?: boolean;

  /** A card can have elevation styles. */
  elevated?: boolean;

  /** A card can have inverted background styles. */
  inverted?: boolean;

  /** A card can have quiet styles. */
  quiet?: boolean;

  /** A card can show that it is currently selected or not. */
  selected?: boolean;
}

export type CardStylesProps = Pick<
  CardProps,
  | 'compact'
  | 'horizontal'
  | 'centered'
  | 'size'
  | 'fluid'
  | 'disabled'
  | 'expandable'
  | 'elevated'
  | 'inverted'
  | 'quiet'
  | 'selected'
> & {
  actionable: boolean;
};

export const cardClassName = 'ui-card';

/**
 * A Card is used to display data in sematically grouped way.
 * * @accessibility
 * By default adds `group` role ([more information available in aria documentation](https://www.w3.org/TR/wai-aria-1.1/#group)), thus it's necessary to provide `aria-roledescription` for correct widget description. [More information available in aria documentation.](https://www.w3.org/TR/wai-aria-1.1/#aria-roledescription-property)
 * When card is actionable (i.e. has `onClick` property), use [cardFocusableBehavior](/components/card/accessibility#card-focusable). [More information available in aria documentation.](https://www.w3.org/TR/wai-aria-practices/#gridNav_focus)
 * When card contains actionable elements, use [cardChildrenFocusableBehavior](/components/card/accessibility#card-children-focusable).
 *
 */
export const Card: ComponentWithAs<'div', CardProps> &
  FluentComponentStaticProps<CardProps> & {
    Header: typeof CardHeader;
    Body: typeof CardBody;
    Footer: typeof CardFooter;
    Preview: typeof CardPreview;
    TopControls: typeof CardPreview;
    Column: typeof CardColumn;
    ExpandableBox: typeof CardExpandableBox;
  } = props => {
  const context = useFluentContext();
  const { setStart, setEnd } = useTelemetry(Card.displayName, context.telemetry);
  setStart();
  const cardRef = React.useRef<HTMLElement>();

  const {
    className,
    design,
    styles,
    variables,
    children,
    compact,
    horizontal,
    centered,
    size,
    fluid,
    onClick,
    disabled,
    expandable,
    elevated,
    inverted,
    quiet,
    selected,
  } = props;
  const ElementType = getElementType(props);
  const unhandledProps = useUnhandledProps(Card.handledProps, props);
  const getA11yProps = useAccessibility(props.accessibility, {
    debugName: Card.displayName,
    actionHandlers: {
      performClick: e => {
        // prevent Spacebar from scrolling
        e.preventDefault();
        handleClick(e);
      },
      focusCard: e => {
        cardRef.current.focus();
      },
    },
    mapPropsToBehavior: () => ({
      disabled,
    }),
    rtl: context.rtl,
  });

  const classes = useClasses<CardStylesProps>(Card.displayName, {
    className: cardClassName,
    mapPropsToStyles: () => ({
      centered,
      horizontal,
      compact,
      size,
      fluid,
      actionable: !!onClick,
      disabled,
      expandable,
      elevated,
      inverted,
      quiet,
      selected,
    }),
    mapPropsToInlineStyles: () => ({
      className,
      design,
      styles,
      variables,
    }),
  });

  const handleClick = (e: React.MouseEvent | React.KeyboardEvent) => {
    if (disabled) {
      e.preventDefault();
      return;
    }

    _.invoke(props, 'onClick', e, props);
  };

  const element = (
    <Ref innerRef={cardRef}>
      {getA11yProps.unstable_wrapWithFocusZone(
        <ElementType
          {...getA11yProps('root', {
            className: classes,
            onClick: handleClick,
            ...unhandledProps,
          })}
        >
          {children}
        </ElementType>,
      )}
    </Ref>
  );
  setEnd();
  return element;
};

Card.displayName = 'Card';

Card.propTypes = {
  ...commonPropTypes.createCommon(),
  onClick: PropTypes.func,
  compact: PropTypes.bool,
  horizontal: PropTypes.bool,
  centered: PropTypes.bool,
  size: CustomPropTypes.size,
  fluid: PropTypes.bool,
  expandable: PropTypes.bool,
  disabled: PropTypes.bool,
  elevated: PropTypes.bool,
  quiet: PropTypes.bool,
  inverted: PropTypes.bool,
  selected: PropTypes.bool,
};

Card.defaultProps = {
  accessibility: cardBehavior,
  size: 'medium',
};

Card.handledProps = Object.keys(Card.propTypes) as any;
Card.Header = CardHeader;
Card.Body = CardBody;
Card.Footer = CardFooter;
Card.Preview = CardPreview;
Card.TopControls = CardTopControls;
Card.Column = CardColumn;
Card.ExpandableBox = CardExpandableBox;

Card.create = createShorthandFactory({ Component: Card });
