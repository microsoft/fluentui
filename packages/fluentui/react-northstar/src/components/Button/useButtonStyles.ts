import { useStyles } from '@fluentui/react-bindings';
import { UseComponentStyles } from './types'
import { ButtonProps } from './Button';

export const useButtonStyles = ({ props, rtl }: UseComponentStyles<ButtonProps>) => {
  return useStyles('Button', {
    mapPropsToStyles: () => ({
      text: props.text,
      primary: props.primary,
      disabled: props.disabled,
      circular: props.circular,
      size: props.size,
      loading: props.loading,
      inverted: props.inverted,
      iconOnly: props.iconOnly,
      iconPosition: props.iconPosition,
      fluid: props.fluid,
      hasContent: !!props.content,
    }),
    mapPropsToInlineStyles: () => ({
      className: props.className,
      design: props.design,
      styles: props.styles,
      variables: props.variables,
    }),
    rtl,
  });
};
