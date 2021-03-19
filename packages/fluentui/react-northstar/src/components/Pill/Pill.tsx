import * as customPropTypes from '@fluentui/react-proptypes';
import * as _ from 'lodash';
import * as PropTypes from 'prop-types';
import * as React from 'react';

import {
  UIComponentProps,
  ContentComponentProps,
  commonPropTypes,
  createShorthandFactory,
  SizeValue,
  createShorthand,
} from '../../utils';
import { ComponentEventHandler, ShorthandValue, FluentComponentStaticProps } from '../../types';
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

export interface PillProps extends UIComponentProps, ContentComponentProps<ShorthandValue<BoxProps>> {
  /**
   * A Pill can be sized.
   */
  size?: Extract<SizeValue, 'smaller' | 'small' | 'medium'>;

  /**
   * A Pill can be rounded
   */
  rounded?: boolean;

  /**
   * A Pill can be filled, inverted or outline
   */
  appearance?: 'filled' | 'inverted' | 'outline';

  /**
   * Media slot
   */
  media?: ShorthandValue<BoxProps>;

  /**
   * Details that will appear as second line
   */
  details?: ShorthandValue<BoxProps>;

  /** A Pill can be disabled. */
  disabled?: boolean;

  /** A Pill can be selected. */
  selected?: boolean;

  /** A callback to be called when Pill is clicked */
  onClick?: ComponentEventHandler<PillProps>;
}

export type PillStylesProps = Required<Pick<PillProps, 'appearance' | 'size' | 'rounded'>>;

export const pillClassName = 'ui-pill';

/**
 * Pills should be used when representing an input, as a way to filter content, or to represent an attribute.
 */
export const Pill: ComponentWithAs<'span', PillProps> & FluentComponentStaticProps<PillProps> = props => {
  const context = useFluentContext();
  const { setStart, setEnd } = useTelemetry(Pill.displayName, context.telemetry);
  setStart();

  const { className, design, styles, variables, appearance, size, rounded, children } = props;

  const ElementType = getElementType(props);
  const unhandledProps = useUnhandledProps(Pill.handledProps, props);

  const getA11yProps = useAccessibility(props.accessibility, {
    debugName: Pill.displayName,
    mapPropsToBehavior: () => ({}),
    rtl: context.rtl,
  });

  const { classes } = useStyles<PillStylesProps>(Pill.displayName, {
    className: pillClassName,
    mapPropsToStyles: () => ({
      appearance,
      size,
      rounded,
    }),
    mapPropsToInlineStyles: () => ({
      className,
      design,
      styles,
      variables,
    }),
    rtl: context.rtl,
  });

  const handleClick = (e: React.SyntheticEvent, props: PillProps) => {
    _.invoke(props, 'onClick', e, props);
  };

  const handleFocus = (e: React.SyntheticEvent) => {
    _.invoke(props, 'onFocus', e, props);
  };

  const element = getA11yProps.unstable_wrapWithFocusZone(
    <ElementType
      {...getA11yProps('root', {
        className: classes.root,
        onFocus: handleFocus,
        onClick: handleClick,
        ...unhandledProps,
      })}
    >
      {createShorthand(
        PillContent,
        {},
        {
          defaultProps: () => ({
            children,
            size,
          }),
        },
      )}
    </ElementType>,
  );

  setEnd();

  return element;
};

Pill.defaultProps = {
  as: 'span',
};

Pill.propTypes = {
  ...commonPropTypes.createCommon({
    content: false,
  }),
  size: PropTypes.oneOf(['small', 'smaller', 'medium']),
  rounded: PropTypes.bool,
  appearance: PropTypes.oneOf(['filled', 'inverted', 'outline']),
  media: customPropTypes.itemShorthand,
  selected: PropTypes.bool,
  details: customPropTypes.itemShorthand,
  disabled: PropTypes.bool,
};

Pill.displayName = 'Pill';

Pill.handledProps = Object.keys(Pill.propTypes) as any;

Pill.create = createShorthandFactory({
  Component: Pill,
});
