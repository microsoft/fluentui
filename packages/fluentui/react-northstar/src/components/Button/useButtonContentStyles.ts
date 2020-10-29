import { useStyles } from '@fluentui/react-bindings';
import { ButtonContentProps } from './ButtonContent';

interface UseComponentStyles<P> {
  props: P;
  rtl: boolean;
}

export const useButtonContentStyles = ({ props, rtl }: UseComponentStyles<ButtonContentProps>) => {
  return useStyles('ButtonContent', {
    mapPropsToStyles: () => ({
      size: props.size,
    }),
    mapPropsToInlineStyles: () => ({
      design: props.design,
      styles: props.styles,
      variables: props.variables,
    }),
    rtl,
  });
};
