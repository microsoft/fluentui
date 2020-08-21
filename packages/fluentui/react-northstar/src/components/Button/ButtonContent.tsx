import * as React from 'react';
import { useStyles, useFluentContext, ComponentWithAs } from '@fluentui/react-bindings';
import { mergeProps } from '@fluentui/react-compose';
import * as customPropTypes from '@fluentui/react-proptypes';
import { commonPropTypes, SizeValue } from '../../utils';
import { BoxProps } from '../Box/Box';

interface ButtonContentOwnProps {
  size?: SizeValue;
}

export interface ButtonContentProps extends BoxProps, ButtonContentOwnProps {}
export type ButtonContentStylesProps = Pick<ButtonContentProps, 'size'>;

export const buttonContentClassName = 'ui-button__content';

/**
 * A ButtonContent allows a user to have a dedicated component that can be targeted from the theme.
 */
export const ButtonContent = (React.forwardRef<HTMLElement, ButtonContentProps>((props: ButtonContentProps, ref) => {
  const context = useFluentContext();

  const { classes, styles } = useStyles<ButtonContentStylesProps>('ButtonContent', {
    className: buttonContentClassName,
    mapPropsToStyles: () => ({
      size: props.size,
    }),
    rtl: context.rtl,
    unstable_props: props,
  });

  const mergedProps = mergeProps({}, props, {
    children: props.content,
    className: classes.root,
    styles: styles.root,
  });

  return <span ref={ref} {...mergedProps} />;
}) as unknown) as ComponentWithAs<'span', ButtonContentProps> & {};

ButtonContent.displayName = 'ButtonContent';
ButtonContent.defaultProps = {
  as: 'span',
};
ButtonContent.propTypes = {
  ...commonPropTypes.createCommon(),
  size: customPropTypes.size,
};
