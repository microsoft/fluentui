import { useStyles } from '@fluentui/react-bindings';
import { ButtonProps } from './Button';
import { UseComponentStyles } from './types';

export const useButtonStyles = ({ props, displayName = 'Button', rtl }: UseComponentStyles<ButtonProps>) => {
  return useStyles(displayName, {
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
      design: props.design,
      styles: props.styles,
      variables: props.variables,
    }),
    rtl,
  });
};
