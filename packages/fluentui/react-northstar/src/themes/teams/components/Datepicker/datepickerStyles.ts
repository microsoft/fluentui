import { ComponentSlotStylesPrepared } from '@fluentui/styles';
import { DatepickerStylesProps } from '../../../../components/Datepicker/Datepicker';
import { DatepickerVariables } from './datepickerVariables';
import { inputSlotClassNames } from '../../../../components/Input/Input';

export const datepickerStyles: ComponentSlotStylesPrepared<DatepickerStylesProps, DatepickerVariables> = {
  root: ({ props: p }) => ({
    ...(!p.allowManualInput && {
      [`& .${inputSlotClassNames.input}`]: {
        cursor: 'pointer',
      },
    }),
  }),
};
