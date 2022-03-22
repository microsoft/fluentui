import { ComponentSlotStylesPrepared } from '@fluentui/styles';
import { CheckboxStylesProps } from '../../../../components/Checkbox/Checkbox';
import { CheckboxVariables } from '../../../teams/components/Checkbox/checkboxVariables';

export const checkboxStyles: ComponentSlotStylesPrepared<CheckboxStylesProps, CheckboxVariables> = {
  toggle: () => ({
    ':before': {
      border: '0.1rem solid transparent',
    },
  }),
};
