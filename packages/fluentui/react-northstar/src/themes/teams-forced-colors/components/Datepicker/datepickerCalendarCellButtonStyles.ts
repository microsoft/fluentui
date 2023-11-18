import { ComponentSlotStylesPrepared } from '@fluentui/styles';
import { DatepickerCalendarCellStylesProps } from '../../../../components/Datepicker/DatepickerCalendarCell';
import { DatepickerVariables } from '../../../teams/components/Datepicker/datepickerVariables';

export const datepickerCalendarCellButtonStyles: ComponentSlotStylesPrepared<
  DatepickerCalendarCellStylesProps,
  DatepickerVariables
> = {
  root: ({ props: p, variables: v }) => ({
    ...(p.selected && {
      outline: '2px solid CanvasText',
      outlineOffset: '-2px',
      ':focus': {
        outlineStyle: 'solid',
      },
    }),

    ...(p.today && {
      borderRadius: '50%',
      outline: '2px solid CanvasText',
      outlineOffset: '-2px',
      ':focus': {
        outlineStyle: 'solid',
      },
    }),

    ...(p.today &&
      p.selected && {
        outlineColor: 'CanvasText',
      }),

    ...(p.disabled && {
      color: 'GrayText',
    }),
  }),
};
