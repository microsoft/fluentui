import { inputSlotClassNames } from '../../../../components/Input/Input';
import type { ComponentSlotStylesPrepared } from '@fluentui/styles';
import type { DatepickerStylesProps } from '../../../../components/Datepicker/Datepicker';
import type { DatepickerVariables } from './datepickerVariables';

export const datepickerStyles: ComponentSlotStylesPrepared<DatepickerStylesProps, DatepickerVariables> = {
  root: ({ props: p }) => ({
    ...(!p.allowManualInput && {
      [`& .${inputSlotClassNames.input}`]: {
        cursor: 'pointer',
      },
    }),
  }),
};
