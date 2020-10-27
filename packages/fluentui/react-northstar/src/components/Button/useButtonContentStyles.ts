import { useStyles } from '@fluentui/react-bindings';
import { ButtonContentProps } from './ButtonContent';
import { UseComponentStyles } from 'src/components/Button/types';

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
