import { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles';
import { FormLabelStylesProps } from '../../../../components/Form/FormLabel';

const formLabelStyles: ComponentSlotStylesPrepared<FormLabelStylesProps> = {
  root: (): ICSSInJSStyle => ({
    display: 'block',
  }),
};

export default formLabelStyles;
