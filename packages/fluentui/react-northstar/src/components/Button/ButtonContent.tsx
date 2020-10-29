import * as cx from 'classnames';
import * as _ from 'lodash';
import * as React from 'react';
import * as customPropTypes from '@fluentui/react-proptypes';
import { useFluentContext, useTelemetry } from '@fluentui/react-bindings';
import { commonPropTypes, SizeValue } from '../../utils';
import { Box, BoxProps } from '../Box/Box';
import { useButtonContentStyles } from './useButtonContentStyles';

interface ButtonContentOwnProps {
  size?: SizeValue;
}

export interface ButtonContentProps extends BoxProps, ButtonContentOwnProps {}
export type ButtonContentStylesProps = ButtonContentOwnProps;

export const buttonContentClassName = 'ui-button__content';

/**
 * A ButtonContent allows a user to have a dedicated component that can be targeted from the theme.
 */
export const ButtonContent: React.FC = (props: ButtonContentProps) => {
  const context = useFluentContext();
  const { setStart, setEnd } = useTelemetry(ButtonContent.displayName, context.telemetry);
  setStart();

  const { classes, styles } = useButtonContentStyles({ props, rtl: context.rtl });

  const result = (
    <Box
      {...props}
      className={cx(buttonContentClassName, classes.root, props.className)}
      styles={_.merge(styles, props.styles)}
    />
  );
  setEnd();

  return result;
};

ButtonContent.defaultProps = {
  as: 'span',
};

ButtonContent.propTypes = {
  ...commonPropTypes.createCommon(),
  size: customPropTypes.size,
};
