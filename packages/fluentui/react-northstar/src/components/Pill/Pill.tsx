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
  useAutoControlled,
} from '@fluentui/react-bindings';
import { PillContent } from './PillContent';
import { PillActionProps, PillAction } from './PillAction';
import { usePillContext } from './pillContext';
import { PillImageProps, PillImage } from './PillImage';
import { PillIcon, PillIconProps } from './PillIcon';
import { CheckmarkCircleIcon, AcceptIcon } from '@fluentui/react-icons-northstar';

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
   * A PillAction shorthand for the action slot.
   */
  icon?: ShorthandValue<PillIconProps>;

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

  /**
   * A Pill can be selectable
   */
  selectable?: boolean;

  /**
   * A Pill state for selection
   */
  selected?: boolean;

  /**
   * A Pill can be selected by default
   */
  defaultSelected?: boolean;

  /**
   * A Pill can have custom selected indicator
   */
  selectedIndicator?: ShorthandValue<PillIconProps>;

  /**
   * Called after user change selected state
   * @param event - React's original SyntheticEvent.
   * @param data - All props.
   */
  onSelectionChange?: ComponentEventHandler<PillProps>;
}

export type PillStylesProps = Required<
  Pick<PillProps, 'appearance' | 'size' | 'rectangular' | 'disabled' | 'selectable' | 'selected'>
>;

export const pillClassName = 'ui-pill';

/**
 * THIS COMPONENT IS UNSTABLE
 * Pills should be used when representing an input, as a way to filter content, or to represent an attribute.
 */
export const Pill: ComponentWithAs<'span', PillProps> & FluentComponentStaticProps<PillProps> = props => {
  const context = useFluentContext();
  const { setStart, setEnd } = useTelemetry(Pill.displayName, context.telemetry);
  setStart();

  const parentProps = usePillContext();

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
    icon,
    selectable,
    selectedIndicator,
  } = props;

  const [selected, setSelected] = useAutoControlled({
    defaultValue: props.defaultSelected,
    value: props.selected,
    initialValue: false,
  });

  const ElementType = getElementType(props);
  const unhandledProps = useUnhandledProps(Pill.handledProps, props);

  const handleDismiss = e => {
    _.invoke(props, 'onDismiss', e, props);
  };

  const handleClick = e => {
    if (selectable) {
      setSelected(prevSelected => !prevSelected);
      _.invoke(props, 'onSelectionChange', e, { ...props, selected: !selected });
    }
    _.invoke(props, 'onClick', e, props);
  };

  const getA11yProps = useAccessibility(props.accessibility || parentProps.pillBehavior || pillBehavior, {
    debugName: Pill.displayName,
    actionHandlers: {
      performDismiss: handleDismiss,
      performClick: handleClick,
    },
    mapPropsToBehavior: () => ({
      actionable,
      selectable,
      selected,
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
      selectable,
      selected,
    }),
    mapPropsToInlineStyles: () => ({
      className,
      design,
      styles,
      variables,
    }),
    rtl: context.rtl,
  });

  const getSelectedIndicator: () => ShorthandValue<PillIconProps> = () => {
    if (!!selectedIndicator) {
      return selectedIndicator;
    }

    if (!!image) {
      return <CheckmarkCircleIcon />;
    }

    return <AcceptIcon />;
  };

  const element = getA11yProps.unstable_wrapWithFocusZone(
    <ElementType
      {...getA11yProps('root', {
        className: classes.root,
        ...(actionable && { onClick: handleClick }),
        ...unhandledProps,
      })}
    >
      {selectable &&
        selected &&
        createShorthand(PillIcon, getSelectedIndicator(), {
          defaultProps: () => ({ size, selectable, image }),
        })}
      {!selected &&
        createShorthand(PillImage, image, {
          defaultProps: () => ({ size }),
        })}
      {!selected &&
        createShorthand(PillIcon, icon, {
          defaultProps: () => ({ size }),
        })}
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
  selectedIndicator: customPropTypes.shorthandAllowingChildren,
  selectable: PropTypes.bool,
  selected: PropTypes.bool,
  defaultSelected: PropTypes.bool,
  image: customPropTypes.shorthandAllowingChildren,
};

Pill.displayName = 'Pill';

Pill.handledProps = Object.keys(Pill.propTypes) as any;
