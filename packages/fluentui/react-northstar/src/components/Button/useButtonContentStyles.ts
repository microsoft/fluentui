import { useStyles } from '@fluentui/react-bindings';
import { UseComponentStyles } from './types';
import { ButtonContentProps } from './ButtonContent';

export const useButtonContentStyles = ({ props, rtl }: UseComponentStyles<ButtonContentProps>) => {
  return useStyles('ButtonContent', {
    mapPropsToStyles: () => ({
      size: props.size,
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
