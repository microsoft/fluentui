import * as React from 'react';
import { useStyles } from '@fluentui/react-bindings';
import { mergeProps } from '@fluentui/react-compose/lib/next';
import * as customPropTypes from '@fluentui/react-proptypes';
import { commonPropTypes, SizeValue } from '../../utils';
import { /* Box, */ BoxProps } from '../Box/Box';
import { useFluentContext } from '../../../../react-bindings/src';

interface ButtonContentOwnProps {
  size?: SizeValue;
}

export interface ButtonContentProps extends BoxProps, ButtonContentOwnProps {}
export type ButtonContentStylesProps = Pick<ButtonContentProps, 'size'>;

export const buttonContentClassName = 'ui-button__content';

/**
 * A ButtonContent allows a user to have a dedicated component that can be targeted from the theme.
 */
export const ButtonContent = (props: ButtonContentProps) => {
  const context = useFluentContext();

  const { classes, styles } = useStyles<ButtonContentStylesProps>('ButtonContent', {
    className: ButtonContent.className,
    mapPropsToStyles: () => ({
      size: props.size,
    }),
    mapPropsToInlineStyles: () => ({
      className: props.className,
      design: props.design,
      styles: props.styles,
      variables: props.variables,
    }),
    rtl: context.rtl,
    composeOptions: {
      mapPropsToStylesPropsChain: [props => ({ size: props.size })],
      displayNames: [ButtonContent.displayName],
      className: ButtonContent.className,
      displayName: ButtonContent.displayName,
    },
    unstable_props: props,
  });

  const mergedProps = mergeProps({}, props, {
    children: props.content,
    className: classes.root,
    styles: styles.root,
  });

  return <span {...mergedProps} />;
};

ButtonContent.className = buttonContentClassName;
ButtonContent.displayName = 'ButtonContent';
ButtonContent.mapPropsToStylesProps = props => ({ size: props.size });
ButtonContent.defaultProps = {
  as: 'span',
};
ButtonContent.propTypes = {
  ...commonPropTypes.createCommon(),
  size: customPropTypes.size,
};
