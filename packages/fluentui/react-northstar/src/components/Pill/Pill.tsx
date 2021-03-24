import * as PropTypes from 'prop-types';
import * as React from 'react';
import * as customPropTypes from '@fluentui/react-proptypes';
import { UIComponentProps, ContentComponentProps, commonPropTypes, SizeValue, createShorthand } from '../../utils';
import { ShorthandValue, FluentComponentStaticProps } from '../../types';
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
}

export type PillStylesProps = Required<Pick<PillProps, 'appearance' | 'size' | 'rectangular' | 'disabled'>>;

export const pillClassName = 'ui-pill';

/**
 * THIS COMPONENT IS STILL IN DEVELOPMENT AND IS NOT READY FOR PRODUCTION
 * Pills should be used when representing an input, as a way to filter content, or to represent an attribute.
 */
export const Pill: ComponentWithAs<'span', PillProps> & FluentComponentStaticProps<PillProps> = props => {
  const context = useFluentContext();
  const { setStart, setEnd } = useTelemetry(Pill.displayName, context.telemetry);
  setStart();

  const { className, design, styles, variables, appearance, size, rectangular, children, content, disabled } = props;

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
      {createShorthand(PillContent, content || {}, {
        defaultProps: () => ({
          children,
          size,
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
};

Pill.displayName = 'Pill';

Pill.handledProps = Object.keys(Pill.propTypes) as any;
