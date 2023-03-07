import { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles';
import { DatepickerVariables } from '../../../teams/components/Datepicker/datepickerVariables';
import { DatepickerCalendarGridRowStylesProps } from '../../../../components/Datepicker/DatepickerCalendarGridRow';
import { datepickerCalendarCellButtonClassName } from '../../../../components/Datepicker/DatepickerCalendarCellButton';

export const datepickerCalendarGridRowStyles: ComponentSlotStylesPrepared<
  DatepickerCalendarGridRowStylesProps,
  DatepickerVariables
> = {
  root: ({ props: p, variables: v }): ICSSInJSStyle => {
    return {
      ...(p.isRowSelectionActive && {
        [`:hover .${datepickerCalendarCellButtonClassName}`]: {
          outline: '2px solid CanvasText',
          outlineOffset: '-2px',
        },
      }),
    };
  },
};
