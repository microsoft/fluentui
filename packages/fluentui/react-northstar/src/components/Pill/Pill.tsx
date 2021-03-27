import * as PropTypes from 'prop-types';
import * as React from 'react';
import * as customPropTypes from '@fluentui/react-proptypes';
import * as _ from 'lodash';
import { Accessibility, pillBehavior, PillBehaviorProps } from '@fluentui/accessibility';
import { UIComponentProps, ContentComponentProps, commonPropTypes, SizeValue, createShorthand } from '../../utils';
import { ShorthandValue, FluentComponentStaticProps, ComponentEventHandler } from '../../types';
import { BoxProps } from '../Box/Box';

import {
  ComponentWithAs,
  useAccessibility,
  getElementType,
  useStyles,
  useTelemetry,
  useFluentContext,
  useUnhandledProps,
} from '@fluentui/react-bindings';
import { PillContent } from './PillContent';
import { PillActionProps, PillAction } from './PillAction';
import { PillImageProps, PillImage } from './PillImage';

export interface PillProps extends UIComponentProps, ContentComponentProps<ShorthandValue<BoxProps>> {
  /**
   * Accessibility behavior if overridden by the user.
   */
  accessibility?: Accessibility<PillBehaviorProps>;

  /**
   * A Pill can be sized.
   */
  size?: Extract<SizeValue, 'smaller' | 'small' | 'medium'>;

  /**
   * A Pill can be rectangular
   */
  rectangular?: boolean;

  /**
   * A Pill can be filled, inverted or outline
   */
  appearance?: 'filled' | 'inverted' | 'outline';

  /**
   * A Pill can be disbled
   */
  disabled?: boolean;

  /**
   * A Pill can be actionable
   */
  actionable?: boolean;

  /**
   * A PillAction shorthand for the action slot.
   */
  action?: ShorthandValue<PillActionProps>;

  /**
   * A PillImage shorthand for the image slot.
   */
  image?: ShorthandValue<PillImageProps>;

  /**
   * Called after user will dismiss the Pill.
   * @param event - React's original SyntheticEvent.
   * @param data - All props.
   */
  onDismiss?: ComponentEventHandler<PillProps>;
}

export type PillStylesProps = Required<Pick<PillProps, 'appearance' | 'size' | 'rectangular' | 'disabled'>>;

export const pillClassName = 'ui-pill';

/**
 * THIS COMPONENT IS UNSTABLE
 * Pills should be used when representing an input, as a way to filter content, or to represent an attribute.
 */
export const Pill: ComponentWithAs<'span', PillProps> & FluentComponentStaticProps<PillProps> = props => {
  const context = useFluentContext();
  const { setStart, setEnd } = useTelemetry(Pill.displayName, context.telemetry);
  setStart();

  const {
    className,
    design,
    styles,
    variables,
    appearance,
    size,
    rectangular,
    children,
    content,
    disabled,
    action,
    actionable,
    image,
  } = props;

  const ElementType = getElementType(props);
  const unhandledProps = useUnhandledProps(Pill.handledProps, props);

  const handleDismiss = e => {
    _.invoke(props, 'onDismiss', e, props);
  };

  const getA11yProps = useAccessibility(props.accessibility, {
    debugName: Pill.displayName,
    actionHandlers: {
      performDismiss: handleDismiss,
    },
    mapPropsToBehavior: () => ({
      actionable,
    }),
    rtl: context.rtl,
  });

  const { classes } = useStyles<PillStylesProps>(Pill.displayName, {
    className: pillClassName,
    mapPropsToStyles: () => ({
      appearance,
      size,
      rectangular,
      disabled,
    }),
    mapPropsToInlineStyles: () => ({
      className,
      design,
      styles,
      variables,
    }),
    rtl: context.rtl,
  });

  const element = getA11yProps.unstable_wrapWithFocusZone(
    <ElementType
      {...getA11yProps('root', {
        className: classes.root,
        ...unhandledProps,
      })}
    >
      {!!image && createShorthand(PillImage, image, {})}
      {createShorthand(PillContent, content || {}, {
        defaultProps: () => ({
          children,
          size,
          actionable,
        }),
      })}
      {actionable &&
        createShorthand(PillAction, action || {}, {
          overrideProps: (prevProps: PillActionProps & { onClick: (e: React.MouseEvent) => void }) => ({
            onClick: e => {
              _.invoke(prevProps, 'onClick', e);
              handleDismiss(e);
            },
          }),
        })}
    </ElementType>,
  );

  setEnd();

  return element;
};

Pill.defaultProps = {
  as: 'span',
  accessibility: pillBehavior,
};

Pill.propTypes = {
  ...commonPropTypes.createCommon(),
  content: customPropTypes.shorthandAllowingChildren,
  size: PropTypes.oneOf(['small', 'smaller', 'medium']),
  rectangular: PropTypes.bool,
  disabled: PropTypes.bool,
  appearance: PropTypes.oneOf(['filled', 'inverted', 'outline']),
  actionable: PropTypes.bool,
  action: customPropTypes.shorthandAllowingChildren,
  onDismiss: PropTypes.func,
};

Pill.displayName = 'Pill';

Pill.handledProps = Object.keys(Pill.propTypes) as any;
